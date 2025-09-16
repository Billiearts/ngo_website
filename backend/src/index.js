require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const prisma = new PrismaClient();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());
app.use(bodyParser.json());

// ------------------ API Routes ------------------

// Volunteer signup
app.post('/api/volunteer', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

  const volunteer = await prisma.volunteer.create({
    data: { name, email, phone, message }
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Volunteer Signup",
    text: `Volunteer: ${name}, Email: ${email}, Phone: ${phone}, Message: ${message}`
  });

  res.json({ success: true, id: volunteer.id });
});

// Newsletter signup
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  await prisma.subscriber.upsert({
    where: { email },
    update: {},
    create: { email }
  });

  res.json({ success: true });
});

// Stripe donation checkout
app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;
  const unitAmount = Math.round((Number(amount) || 10) * 100);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Donation to ReadForward' },
        unit_amount: unitAmount
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: `${process.env.BASE_URL || 'http://localhost:4242'}/success.html`,
    cancel_url: `${process.env.BASE_URL || 'http://localhost:4242'}/contact.html`
  });

  await prisma.donation.create({
    data: { stripeSession: session.id, amount: unitAmount, status: 'pending' }
  });

  res.json({ url: session.url });
});

// Stripe webhook
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await prisma.donation.updateMany({
      where: { stripeSession: session.id },
      data: { status: 'completed', donorEmail: session.customer_details?.email || null }
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: session.customer_details.email,
      subject: "Thank you for your donation!",
      text: "We appreciate your support in building libraries and promoting reading."
    });
  }

  res.json({ received: true });
});

// ------------------ Start Server ------------------
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
