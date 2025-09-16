document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// i18n simple switch (load locales from /locales/*.json if present)
const langSwitch = document.getElementById('lang-switch');
if(langSwitch){
  langSwitch.addEventListener('change', (e) => {
    const lang = e.target.value;
    // In production, fetch translations and re-render text nodes with data-i18n attributes
    // Placeholder: store selection
    localStorage.setItem('site_lang', lang);
    alert('Language switched to '+lang+' — refresh the page for full translation.');
  });
}

// Newsletter
const newsletterForm = document.getElementById('newsletter-form');
if(newsletterForm){
  newsletterForm.addEventListener('submit', async e =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const msg = document.getElementById('newsletter-msg');
    msg.textContent = 'Sending...';
    try{
      const res = await fetch('http://localhost:4242/api/newsletter', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({email}) });
      const data = await res.json();
      msg.textContent = data.success ? 'Subscribed! Thank you.' : (data.error||'Something went wrong');
    }catch(err){msg.textContent='Failed to subscribe.'}
  })
}

// Volunteer
const volunteerForm = document.getElementById('volunteer-form');
if(volunteerForm){
  volunteerForm.addEventListener('submit', async e =>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('emailv').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const msg = document.getElementById('vol-msg');
    msg.textContent = 'Sending...';
    try{
      const res = await fetch('http://localhost:4242/api/volunteer', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({name,email,phone,message}) });
      const data = await res.json();
      msg.textContent = data.success ? 'Thanks! We will contact you soon.' : (data.error||'Failed to send');
      volunteerForm.reset();
    }catch(err){msg.textContent='Failed to send.'}
  })
}

// Donate (Stripe Checkout)
const donateBtn = document.getElementById('donate-btn');
if(donateBtn){
  donateBtn.addEventListener('click', async ()=> {
    const amount = Math.max(1, Number(document.getElementById('donation-amount').value || 10));
    donateBtn.disabled = true; donateBtn.textContent='Processing...';
    try{
      const res = await fetch('http://localhost:4242/create-checkout-session', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({amount}) });
      const data = await res.json();
      if(data.url){ window.location = data.url; } else { document.getElementById('donation-msg').textContent = data.error || 'Payment failed'; donateBtn.disabled=false; donateBtn.textContent='Donate'; }
    }catch(err){document.getElementById('donation-msg').textContent='Error creating payment.'; donateBtn.disabled=false; donateBtn.textContent='Donate'}
  })
}


