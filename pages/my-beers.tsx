import BeerCardList from "../components/beerlist/BeerCardList"
import { Beer } from "../types/beer"
import { useState, useEffect } from "react";
import beerService from "../services/beer.service";
const MyBeers = () => {
  const [getUserBeers, setUserBeers] = useState<Beer[]>([]);
  const [isInit, setIsInit] = useState(false);
  useEffect(() => {
    const beers = beerService.getUserBeers();
    setUserBeers(beers);
    setIsInit(true);
  }, [])
  const userBeerList = () => {
    if(!isInit) {
      return <></>
    }
    if(getUserBeers.length == 0) {
      return <h2>You have not added any beers yet</h2>
    }
    return <BeerCardList beers={getUserBeers}/>
  }
  return (
    <div className="my-beers">
      <div className="container">
        {userBeerList()}
      </div>
    </div>
  )
}

export default MyBeers;