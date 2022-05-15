import { useRouter } from 'next/router'
import NavigationItem from './NavigationItem';
import { NavigationItem as INavigationItem } from '../../types/navigation'
import styles from '../../styles/modules/Navigation.module.css';
import debounce from '../../utils/debounce';
import { useEffect, useState } from 'react';
const Navigation = (props: {items: INavigationItem[]}) => {
  const [isNavOpen, setNavOpen] = useState<boolean>(false);
  const burgerIconSrc = () => {
    return isNavOpen ? '/images/close-icon.svg' : '/images/menu-icon.svg';
  }
  const toggleNav = () => setNavOpen(!isNavOpen);
  return <nav className={ styles.navigation}>
    <button className={styles['navigation__button']} onClick={toggleNav}>
      <img className="nav__button-icon" src={burgerIconSrc()}/>
    </button>
    <ul className={isNavOpen ? `${styles['nav-list']}  ${styles['open']}` : `${styles['nav-list']}`}>
      {
        props.items.map((item, index) => {
          return <NavigationItem item={item} key={index}/>
        })
      }
    </ul>
    
  </nav>
}

export default Navigation
