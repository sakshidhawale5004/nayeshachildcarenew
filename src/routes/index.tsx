import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, ArrowDown, Sparkles, Heart, Hand, MessageCircle, BookOpen, Users, Smile, WandSparkles } from 'lucide-react';
import { SiteLayout } from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/services';
import hero from '@/assets/hero-playroom-bright.jpg';
import playSpace from '@/assets/play-space.jpg';

const icons = [Hand, MessageCircle, BookOpen, Users, Heart];

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Nayesha Child Development Center | A brighter path for every child' },
    { name: 'description', content: 'Child-centered occupational therapy, speech therapy, special education, behavioral therapy and counselling at Nayesha Child Development Center.' },
    { property: 'og:title', content: 'Nayesha Child Development Center | A brighter path for every child' },
    { property: 'og:description', content: 'Play-led, child-centered therapy and learning support for every little step.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Home,
});

function Home() {
  return <SiteLayout>
    <section className="home-hero">
      <img src={hero} width={1536} height={1024} alt="Child balancing on colorful sensory stepping stones with a therapist in a bright play space" className="hero-image" />
      <div className="hero-wash" />
      <div className="hero-content container-wide">
        <div className="hero-copy"><span className="eyebrow hero-eyebrow"><Sparkles size={16}/> WHERE PLAY BECOMES POSSIBILITY</span>
          <h1><em>Nayesha<br/>Child Development<br/>Center.</em></h1>
          <p>Every child has their own wonderful way of growing. We're here to make the journey playful, personal and full of possibility.</p>
          <div className="hero-actions"><Button variant="brand" size="xl" asChild><a href="#therapies">Explore our therapies <ArrowUpRight size={19}/></a></Button><Button variant="outlineBrand" size="xl" asChild><Link to="/therapy-guide"><WandSparkles size={18}/> Find a starting point</Link></Button></div>
          <div className="hero-care-note"><span className="hero-care-mark" aria-hidden="true">✳</span><span>Play-led care for<br/>every little milestone.</span></div>
        </div>
      </div>
      <a className="hero-scroll" href="#therapies" aria-label="Scroll to therapies"><ArrowDown size={17}/><span>SCROLL TO EXPLORE</span></a>
      <div className="hero-sticker"><Smile size={26}/><span>Here to help<br/>little ones shine!</span></div>
    </section>

    <section id="therapies" className="therapies-section"><div className="container-wide">
      <div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-dot"/> WHAT WE DO</span><h2>Support for every<br/><em>little milestone.</em></h2></div><p>Five thoughtful therapies. One shared belief: when children feel safe to play, incredible things can happen.</p></div>
      <div className="service-grid">{services.map((service, i) => { const Icon = icons[i] ?? Heart; return <Link to="/services/$slug" params={{ slug: service.slug }} key={service.slug} className={`service-card ${service.color}`}>
        <div className="service-image-wrap"><img src={service.image} alt={`${service.title} activity with a child`} loading="lazy" width={1024} height={768}/><span className="service-number">{service.number} / 05</span></div>
        <div className="service-card-body"><span className="service-icon"><Icon size={25} strokeWidth={1.7}/></span><ArrowUpRight className="service-arrow" size={22}/><h3>{service.title}</h3><p>{service.short}</p><span className="text-link">Discover more <ArrowUpRight size={16}/></span></div>
      </Link>})}</div>
    </div></section>

    <section className="guide-invite"><div className="container-wide guide-invite-inner"><span className="guide-invite-icon" aria-hidden="true"><WandSparkles size={35}/></span><div><span className="eyebrow">NOT SURE WHERE TO BEGIN?</span><h2>Let's find a <em>starting point.</em></h2><p>Tell us what you’re noticing, and explore therapies that could be worth a conversation.</p></div><Button variant="brand" size="xl" asChild><Link to="/therapy-guide">Explore with our guide <ArrowUpRight size={18}/></Link></Button></div></section>

    <section id="our-approach" className="approach-section"><div className="container-wide approach-grid">
      <div className="approach-visual"><div className="approach-image"><img src={playSpace} loading="lazy" width={1024} height={768} alt="Play-based therapy area with a sensory swing, colorful mats and play equipment"/></div><div className="approach-tag">PLAY IS HOW<br/>WE GROW <span>✳</span></div></div>
      <div className="approach-copy"><span className="eyebrow"><span className="eyebrow-dot"/> THE NAYESHA WAY</span><h2>Serious about care.<br/><em>Big on play.</em></h2><p>To a child, play is not a break from learning. It is how they discover the world. Our therapy spaces are designed around movement, curiosity and connection—not a conventional doctor–patient desk.</p><div className="approach-points"><div><span>01</span><div><h3>Child-led, always</h3><p>We follow each child's interests and pace, making room for confidence to grow.</p></div></div><div><span>02</span><div><h3>Purpose in every game</h3><p>Swings, puzzles, ball games and activities help turn goals into joyful moments.</p></div></div><div><span>03</span><div><h3>Families are partners</h3><p>We work with caregivers so little victories can continue at home.</p></div></div></div></div>
    </div></section>

    <section className="closing-section"><div className="container-wide closing-inner"><span className="closing-doodle">✳</span><span className="eyebrow">EVERY CHILD'S STORY IS DIFFERENT</span><h2>Let's make space for<br/><em>their kind of wonderful.</em></h2><p>Explore the support that feels right for your child.</p><Button variant="light" size="xl" asChild><Link to="/contact">Request an appointment <ArrowUpRight size={18}/></Link></Button></div></section>
  </SiteLayout>;
}
