import { Beer } from "../../types/beer";
import BeerCard from "./BeerCard";
import styles from "../../styles/modules/BeerCardList.module.css";
const BeerCardList = (props: { beers: Beer[]}) => {
  return (
    <ul className={styles['beer-card-list']}>
      {
        props.beers.map((item) => {
          return <li className={styles['beer-card-list__item']} key={item.id}>
            <BeerCard  item={item} />
            </li>
        })
      }
    </ul>
  )
}
export default BeerCardList;