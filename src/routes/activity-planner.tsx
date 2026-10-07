import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/SiteLayout';
import { ActivityPlanner } from '@/components/ActivityPlanner';

export const Route = createFileRoute('/activity-planner')({
  head: () => ({ meta: [
    { title: 'Play-Based Activity Planner | Nayesha Childcare' },
    { name: 'description', content: 'Explore tailored play-based activity ideas for children’s therapy sessions at Nayesha Childcare.' },
    { property: 'og:title', content: 'Play-Based Activity Planner | Nayesha Childcare' },
    { property: 'og:description', content: 'Create play-based activity ideas for upcoming children’s therapy sessions.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: PlannerPage,
});

function PlannerPage() {
  return <SiteLayout><section className="planner-page"><div className="container-wide"><div className="planner-intro"><span className="eyebrow"><span className="eyebrow-dot"/> FOR THERAPISTS</span><h1>Make room for <em>play.</em></h1><p>Turn session goals into fresh, playful activity ideas. Choose a therapy, describe the goals and see where play could take the session.</p></div><ActivityPlanner /></div></section></SiteLayout>;
}