import Navigation from './Navigation';
import contentService from '../../services/content.service'
import { useState } from 'react';
import { NavigationItem } from '../../types/navigation';

const TheHeader = () => {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);

  contentService.getNavigation().then((navItems) => {
    setNavItems(navItems);
  })

  return <header className="site-header">
    <div className="site-logo">
      <img className="site-logo__image" src="/images/beer-icon.svg" alt="Beers and stuff"/>
      <span className="site-logo__tagline">BeerStore</span>
    </div>
    <Navigation items={navItems}/>
  </header>
}

export default TheHeader
