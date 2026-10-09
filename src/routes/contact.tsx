import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/SiteLayout';
import { AppointmentForm } from '@/components/AppointmentForm';

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [
    { title: 'Request an Appointment | Nayesha Child Development Center' },
    { name: 'description', content: 'Ask Nayesha Child Development Center to follow up about occupational therapy, speech therapy, special education, behavioral therapy or counselling for your child.' },
    { property: 'og:title', content: 'Request an Appointment | Nayesha Child Development Center' },
    { property: 'og:description', content: 'Choose a therapy and request a callback from the Nayesha Child Development Center team.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  return <SiteLayout><section className="contact-page"><div className="container-wide contact-layout"><div className="contact-intro"><span className="eyebrow"><span className="eyebrow-dot"/> GET IN TOUCH</span><h1>Let's take the<br/><em>next step together.</em></h1><p>Tell us how to reach you and which therapy you're interested in. Our team will follow up with you.</p>
  
  <div className="mt-8 space-y-4">
    <div>
      <h3 className="font-semibold text-lg text-gray-900">Email</h3>
      <a href="mailto:purnimakandekar@gmail.com" className="text-brand-primary hover:underline">purnimakandekar@gmail.com</a>
    </div>
    <div>
      <h3 className="font-semibold text-lg text-gray-900">Phone</h3>
      <a href="tel:9867479667" className="text-brand-primary hover:underline">9867479667</a>
    </div>
    <div>
      <h3 className="font-semibold text-lg text-gray-900">Location</h3>
      <p className="text-gray-700">NAYESHA CHILD DEVELOPMENT CENTER<br />SHOP NO.6, HIGHLIFE RESIDENCY, PLOT NO.24<br />SECTOR - 22, KAMOTHE.<br />OPP. KIDZONIA PRE-SCHOOL</p>
    </div>
  </div>

  <div className="contact-play" aria-hidden="true"><span>✳</span><span>●</span><span>✦</span></div></div><div className="contact-form-area"><h2>Request a callback</h2><AppointmentForm /></div></div></section></SiteLayout>;
}