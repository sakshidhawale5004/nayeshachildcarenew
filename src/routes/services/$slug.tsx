import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { SiteLayout } from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { getService, services } from '@/lib/services';

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => { const service = getService(params.slug); if (!service) throw notFound(); return service; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? 'Therapies'} for Children | Nayesha Childcare` },
    { name: 'description', content: loaderData ? `${loaderData.intro} Learn about our child-centered approach at Nayesha Childcare.` : 'Explore child-centered therapy at Nayesha Childcare.' },
    { property: 'og:title', content: `${loaderData?.title ?? 'Therapies'} for Children | Nayesha Childcare` },
    { property: 'og:description', content: loaderData?.short ?? 'Thoughtful support for every child.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ServicePage,
});

function ServicePage() {
  const service = Route.useLoaderData();
  const index = services.findIndex(item => item.slug === service.slug);
  const next = services[(index + 1) % services.length] ?? service;
  return <SiteLayout>
    <section className={`detail-hero ${service.color}`}><div className="container-wide">
      <Link to="/" className="back-link"><ArrowLeft size={17}/> All therapies</Link>
      <div className="detail-hero-grid"><div className="detail-hero-copy"><span className="eyebrow"><Sparkles size={15}/> THERAPY {service.number} / 05</span><h1>{service.title}</h1><p>{service.short}</p><a href="#about" className="detail-explore">Explore this therapy <ArrowRight size={18}/></a></div><div className="detail-hero-image"><img src={service.detailImage} width={1024} height={768} alt={`Child participating in ${service.title.toLowerCase()}`} /><span className="image-spark">✳</span></div></div>
    </div></section>
    <section id="about" className="detail-intro"><div className="container-wide detail-intro-grid"><div><span className="eyebrow"><span className="eyebrow-dot"/> ABOUT THE THERAPY</span><h2>Small moments.<br/><em>Meaningful growth.</em></h2></div><p>{service.intro}</p></div></section>
    <section className="detail-focus"><div className="container-wide"><div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-dot"/> HOW WE HELP</span><h2>What we can <em>work on.</em></h2></div><p>Support is shaped around your child—not a one-size-fits-all checklist.</p></div><div className="focus-grid">{service.focus.map((item, i) => <div className="focus-item" key={item}><span className="focus-count">0{i+1}</span><Check size={23}/><h3>{item}</h3></div>)}</div></div></section>
    <section className={`detail-play ${service.color}`}><div className="container-wide detail-play-grid"><div><span className="eyebrow"><span className="eyebrow-dot"/> WHAT SESSIONS FEEL LIKE</span><h2>Learning happens<br/><em>when play begins.</em></h2><p>{service.approach}</p><p>{service.parentNote}</p></div><div className="activities-panel"><span className="activities-title">IN THE PLAY SPACE</span>{service.activities.map((activity, i) => <div key={activity} className="activity-row"><span>0{i+1}</span><strong>{activity}</strong><span>✳</span></div>)}</div></div></section>
    <section className="detail-next"><div className="container-wide"><span className="eyebrow">KEEP EXPLORING</span><Link to="/services/$slug" params={{slug: next.slug}} className="next-link"><span>{next.title}</span><ArrowUpRight size={38}/></Link><Button variant="brand" asChild><Link to="/contact">Request an appointment <ArrowUpRight size={16}/></Link></Button></div></section>
  </SiteLayout>;
}
