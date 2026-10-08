import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { services } from '@/lib/services';
import { Button } from '@/components/ui/button';

export function AppointmentForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    
    // Honeypot check
    if (values.get('website')) return;
    
    setSending(true);
    setError('');
    
    try {
      const payload = {
        parent_name: String(values.get('parent_name') ?? ''),
        email: String(values.get('email') ?? ''),
        phone: String(values.get('phone') ?? ''),
        therapy: String(values.get('therapy') ?? ''),
        message: String(values.get('message') ?? ''),
      };

      const response = await fetch('/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setSent(true);
      form.reset();
    } catch {
      setError('We could not send your request. Please try again.');
    } finally { 
      setSending(false); 
    }
  }

  if (sent) return <div className="appointment-confirmation" role="status"><CheckCircle2 size={36}/><h3>Thank you for reaching out.</h3><p>Your request has been received. The Nayesha team will follow up using the details you shared.</p><Button variant="outlineBrand" onClick={() => setSent(false)}>Send another request</Button></div>;

  return <form className="appointment-form" onSubmit={onSubmit}>
    <div className="form-row"><label>Parent or caregiver name <input name="parent_name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name" /></label><label>Phone number <input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={25} pattern="[+()0-9\s-]{7,25}" placeholder="Your phone number" /></label></div>
    <div className="form-row"><label>Email address <input name="email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com" /></label><label>Therapy <select name="therapy" required defaultValue=""><option value="" disabled>Choose a therapy</option>{services.map(service => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select></label></div>
    <label>Anything you'd like us to know? <textarea name="message" maxLength={1000} rows={4} placeholder="Tell us a little about what you're looking for (optional)" /></label>
    <div className="form-honeypot" aria-hidden="true"><label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <Button variant="brand" size="xl" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Request a callback'} <ArrowUpRight size={18}/></Button>
    <p className="form-note">We’ll use your details only to respond to your request. Please avoid sharing sensitive medical information here.</p>
  </form>;
}