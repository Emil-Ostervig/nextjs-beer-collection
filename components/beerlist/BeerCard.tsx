
import Link from "next/link";
import { Beer } from "../../types/beer";
import Image from "next/image";
import BeerSpecList from "./BeerSpecList";
const BeerCard = (props: {item: Beer}) => {
  const beerLink = () => {
    return `/beers/${props.item.id}`;
  }
  const cardImage = () => {
    if(!props?.item?.image_url){
      return <span className="beer-card__image-placeholder"></span>
    }
    return <Image src={props.item.image_url} layout="fill" objectFit="contain"/>
  }
  return <article className="beer-card">
    <div className="beer-card__box">
      <Link href={beerLink()}>
        <a>
          <div className="beer-card__image">
              { cardImage() }
          </div>
        </a>
      </Link>
      <div className="beer-card__content">
        <Link href={beerLink()}>
          <a>
            <h3 className="beer-card__title">
              {props.item.name}
            </h3>
            <p className="beer-card__tagline">
              {props.item.tagline}
            </p>
          </a>
        </Link>
        <div className="beer-card__speclist">
          <BeerSpecList beer={props.item}/>
        </div>
        <p className="beer-card__excerpt">
          {props.item.description}
        </p>
      </div>
    </div>
  </article>
}

export default BeerCard
