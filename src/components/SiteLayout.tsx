import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X, Heart } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { services } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { PlayLoader } from './PlayLoader';

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: s => s.location.pathname });
  const logoUrl = '/nayeshachilddevelopmentcenterfinal.png';
  return <>
    <PlayLoader />
    <div className="announcement">A brighter path for every child <span>✳</span> Play-led, child-centered care</div>
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="Nayesha Child Development Center home"><img src={logoUrl} alt="Nayesha Child Development Center" /></Link>
        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          <Link to="/" className={path === '/' ? 'active' : ''} onClick={() => setOpen(false)}>Home</Link>
          <div className="nav-services"><span>Our therapies</span><div className="nav-dropdown">{services.map(s => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} onClick={() => setOpen(false)}>{s.title}<ArrowUpRight size={15} /></Link>)}</div></div>
          <Link to="/therapy-guide" onClick={() => setOpen(false)}>Therapy guide</Link>
          <Link to="/activity-planner" onClick={() => setOpen(false)}>For therapists</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Get in touch</Link>
          <div className="mobile-service-links">{services.map(s => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} onClick={() => setOpen(false)}>{s.title}</Link>)}</div>
        </nav>
        <Button variant="brand" asChild className="header-cta"><Link to="/contact">Request an appointment <ArrowUpRight size={17}/></Link></Button>
        <Button variant="ghost" size="icon" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
    </header>
    <main>{children}</main>
    <footer className="site-footer"><div className="footer-inner"><div className="footer-top"><div><img src={logoUrl} alt="Nayesha Child Development Center" className="footer-logo"/><p>A little more support. A lot more possibility.</p></div><div><span className="footer-label">EXPLORE</span>{services.map(s => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>{s.title}</Link>)}<Link to="/therapy-guide">Therapy guide</Link><Link to="/activity-planner">For therapists</Link></div><div><span className="footer-label">GET IN TOUCH</span><p>Have a question about your child's next step?</p><Link to="/contact" className="footer-contact-link">Request a callback <ArrowUpRight size={16}/></Link><div className="mt-4 text-sm space-y-2"><p><strong>Email:</strong> <a href="mailto:purnimakandekar@gmail.com">purnimakandekar@gmail.com</a></p><p><strong>Mob:</strong> <a href="tel:9867479667">9867479667</a></p><p><strong>Address:</strong><br />Nayesha Child Development Center<br />Shop No. 6, Highlife Residency, Plot No. 24<br />Sector - 22, Kamothe.<br />Opp. Kidzonia Pre-School</p></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Nayesha Child Development Center</span><span>Made with <Heart size={13} fill="currentColor"/> for little beginnings</span></div></div></footer>
  </>;
}
