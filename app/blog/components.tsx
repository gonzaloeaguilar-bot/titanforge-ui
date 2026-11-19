import Link from 'next/link';

export function BlogHeader({ currentRoute = '/blog' }: { currentRoute?: string }) {
  return (
    <header className="nav">
      <div className="nav__in">
        <Link href="/" className="brand" aria-label="Titan Forge Fitness — home">
          <img className="brand__logo" src="/assets/images/site-logo.png" alt="Titan Forge Fitness" />
        </Link>
        <nav className="nav__links" aria-label="Main navigation">
          <Link href="/coaching" className={currentRoute === '/coaching' ? 'active' : ''}>Coaching</Link>
          <Link href="/pricing" className={currentRoute === '/pricing' ? 'active' : ''}>Pricing</Link>
          <Link href="/coaches" className={currentRoute === '/coaches' ? 'active' : ''}>Coaches</Link>
          <Link href="/programs" className={currentRoute === '/programs' ? 'active' : ''}>Programs</Link>
          <Link href="/method" className={currentRoute === '/method' ? 'active' : ''}>Method</Link>
          <Link href="/results" className={currentRoute === '/results' ? 'active' : ''}>Results</Link>
          <Link href="/resources" className={currentRoute === '/resources' ? 'active' : ''}>Resources</Link>
          <Link href="/science" className={currentRoute.startsWith('/science') ? 'active' : ''}>Science</Link>
          <Link href="/blog" className={currentRoute.startsWith('/blog') ? 'active' : ''}>Blog</Link>
          <Link href="/shop" className={currentRoute === '/shop' ? 'active' : ''}>Shop</Link>
          <Link href="/about" className={currentRoute === '/about' ? 'active' : ''}>About</Link>
        </nav>
        <div className="nav__right">
          <Link href="/start" className="btn btn--ghost btn--sm nav__intro-desktop">
            Find Your Path
          </Link>
          <Link href="/coaching-intensive#apply" className="btn btn--ember btn--sm">
            Apply
          </Link>
        </div>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot__top">
        <div className="foot__brand">
          <Link href="/" className="brand" aria-label="Titan Forge Fitness — home">
            <img className="brand__logo" src="/assets/images/site-logo.png" alt="Titan Forge Fitness" />
          </Link>
          <div className="foot__tag">Built Here. Forged Within.</div>
          <p>
            Coaching for adults ready to stop guessing, build the foundation, and train with intention. Englewood, CO &amp; online worldwide.
          </p>
        </div>
        <div className="foot__col">
          <h4>Train</h4>
          <Link href="/coaching">Coaching</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/coaches">Coaches</Link>
          <Link href="/programs">Programs</Link>
          <Link href="/method">The Method</Link>
          <Link href="/referral">Referral Program</Link>
          <Link href="/start">Find Your Path</Link>
          <Link href="/coaching-intensive#apply">Apply</Link>
        </div>
        <div className="foot__col">
          <h4>Learn</h4>
          <Link href="/results">Results</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/science">Science</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/free/forge-readiness-check">Free Readiness Check</Link>
          <Link href="/shop">Shop</Link>
        </div>
        <div className="foot__col">
          <h4>Company</h4>
          <Link href="/about">About Steve</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refund-policy">Refunds</Link>
          <Link href="/shipping-policy">Shipping</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
      </div>
      <div className="wrap foot__bottom">
        <span>© {new Date().getFullYear()} TITAN FORGE Fitness, Corp. All rights reserved.</span>
        <span>Built Here. Forged Within.</span>
      </div>
    </footer>
  );
}
