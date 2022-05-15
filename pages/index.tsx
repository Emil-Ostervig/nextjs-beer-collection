import type { NextPage } from 'next'
import BeerList from '../components/beerlist/BeerList';
import beerService from '../services/beer.service';
import { Beer } from '../types/beer';
const Home = (props: {initialBeers: Beer[]}) => {
  return (
      <BeerList initialBeers={props.initialBeers}/>
  )
}

export async function getServerSideProps(context:any) {
  const params = new URLSearchParams(context.query)
  const beerListParams = beerService.mapUrlParamsToFilters(params);
  const beers = await beerService.getBeers(beerListParams)
  return {
    props: {
      initialBeers: beers
    },
  }
}
export default Home
