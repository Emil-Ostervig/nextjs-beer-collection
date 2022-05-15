import Link from 'next/link'
import React from 'react'
import { NavigationItem as INavigationItem } from '../../types/navigation';
import styles from '../../styles/modules/Navigation.module.css';
import { useRouter } from 'next/router';
const NavigationItem = (props: {item: INavigationItem} ) => {
  const router = useRouter();
  const getClasses = () => {
    const classes = [styles['nav-item-link']];
    if(router.pathname == props.item.url){
      classes.push(styles['nav-item-link--active']);
    }
    return classes.join(' ');
  }
  return <li className={styles['nav-item']}>
    <Link href={props.item.url} >
      <a className={getClasses()}>
        {props.item.title}
      </a>
    </Link>
  </li>
}

export default NavigationItem
