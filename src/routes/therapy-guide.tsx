import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/SiteLayout';
import { TherapyGuide } from '@/components/TherapyGuide';

export const Route = createFileRoute('/therapy-guide')({
  head: () => ({ meta: [
    { title: 'Explore Therapy Options | Nayesha Child Development Center' },
    { name: 'description', content: 'Share what matters to your child and explore possible therapy options at Nayesha Child Development Center, with a short non-diagnostic summary for your conversation with us.' },
    { property: 'og:title', content: 'Explore Therapy Options | Nayesha Child Development Center' },
    { property: 'og:description', content: 'A gentle way to explore children’s therapy options and prepare for a conversation with Nayesha Child Development Center.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: TherapyGuidePage,
});

function TherapyGuidePage() {
  return <SiteLayout><section className="guide-page"><div className="container-wide guide-layout"><div className="guide-intro"><span className="eyebrow"><span className="eyebrow-dot"/> A GENTLER FIRST STEP</span><h1>Every child’s path<br/>begins <em>differently.</em></h1><p>Tell us a little about what you’ve noticed. We’ll help you explore which of our therapies might be worth talking about.</p><div className="guide-shapes" aria-hidden="true"><span>✳</span><span>●</span><span>✦</span></div></div><TherapyGuide /></div></section></SiteLayout>;
}