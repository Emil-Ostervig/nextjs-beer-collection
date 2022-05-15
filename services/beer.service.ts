import { BeerApiFilter } from "../types/beerApi"
import axios from "axios"
import { Beer } from "../types/beer";
import { json } from "stream/consumers";
import dayjs from "dayjs";

const getBeers = (filter: BeerApiFilter ): Promise<Beer[]> => {
    const route = `https://api.punkapi.com/v2/beers`;
    return axios.get(route, {
        params: filter,
    }).then(res => res.data);
}

const getBeer = (id: string): Promise<Beer> => {
  const userBeer = getUserBeer(id);
  if(userBeer) {
    return Promise.resolve(userBeer);
  }
  const route = `https://api.punkapi.com/v2/beers/${id}`;
  return axios.get(route).then(res => res.data).then((data) => {
    if(Array.isArray(data) && data.length > 0){
      return data[0];
    }
    return null;
  });
}

const getRandomBeer = (): Promise<Beer> => {
    const route = `https://api.punkapi.com/v2/beers/random`;
    return axios.get(route).then(res => res.data);
}

const addUserBeer = (beer: Beer): void => {
  const existingBeers = getUserBeers();
  existingBeers.push(beer);
  window.localStorage.setItem('userBeers', JSON.stringify(existingBeers));
}

const getUserBeers = (): Beer[] => {
  const beers = window.localStorage.getItem('userBeers') || '[]';
  return JSON.parse(beers);
}

const getUserBeer = (id:string): Beer | undefined => {
  const userBeers = getUserBeers();
  return userBeers.find(el => el.id == id);
}

const mapUrlParamsToFilters = (params: URLSearchParams) : BeerApiFilter => {
  const filters: {[id:string]: string} = {} ;
  const propList = [
    'abv_gt',
    'abv_lt',
    'ibu_gt',
    'ibu_lt',
    'ebc_gt',
    'ebc_lt',
    'beer_name',
    'yeast',
    'brewed_before',
    'brewed_after',
    'hops',
    'malt',
    'food',
    'ids'
  ]
  propList.forEach(prop => {
    const param = params.get(prop);
    if(param){
      filters[prop] = param;
    }
  });

  if(filters.brewed_before) {
    filters.brewed_before = dayjs(filters.brewed_before).format('MM-YYYY');
  }
  if(filters.brewed_after) {
    filters.brewed_after = dayjs(filters.brewed_after).format('MM-YYYY');
  }
    
  return filters;
}


const beerService = {
    getBeers,
    getBeer,
    getRandomBeer,
    getUserBeers,
    addUserBeer,
    mapUrlParamsToFilters
}

export default beerService;