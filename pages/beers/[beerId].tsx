import { useRouter } from 'next/router'
import { Beer } from '../../types/beer'
import styles from '../../styles/modules/SingleBeer.module.css';
import { useEffect, useState } from 'react';
import beerService from '../../services/beer.service';
import LoadingSpinner from '../../components/atoms/LoadingSpinner';
import BeerSpecList from '../../components/beerlist/BeerSpecList';

const SingleBeer = (props: {beer: Beer}) => {
  const router = useRouter()
  const { beerId } = router.query;
  const [getBeer, setBeer] = useState<Beer>();
  useEffect(() => {
    if(!beerId){
      return;
    }
    const fetchData = async () => {
      const beer = await beerService.getBeer(beerId as string);
      setBeer(beer);
    }
    fetchData();
    
  }, [beerId]);

  const content = () => {
    if(!getBeer) return <LoadingSpinner/>;

    return <div className={styles['single-beer']}>
      <div className="container d-f">
        <div className={styles['single-beer__gallery']}>
          <img src={getBeer.image_url}/>
        </div>
        <div className={styles['single-beer__content']}>
          <h1 className="single-beer__title">{getBeer.name}</h1>
          <p className={styles['single-beer__tagline']}>
            {getBeer.tagline}
          </p>
          <BeerSpecList beer={getBeer}/>
          <p className={styles['single-beer__description']}>
            {getBeer.description}
          </p>
        </div>
      </div>
    </div>
  }

  return <>
    {content()}
  </>
}

export default SingleBeer
