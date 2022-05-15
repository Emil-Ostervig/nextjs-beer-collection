import BeerFilterForm from "../../components/beerlist/BeerFilterForm"
import BeerFilterItem from "../../components/beerlist/BeerFilterItem"
import beerService from "../../services/beer.service"
import { Beer } from "../../types/beer"
import generateUUID from '../../utils/generateUUID';
import React, { useState } from "react"
import Link from "next/link";
const AddNewBeer = () => {
  const [getSaved, setSaved] = useState(false);
  const [getBeerId, setBeerId] = useState('');
  const onSubmit = ( values: {[id: string]: string}) => {
    const id = generateUUID();
    setBeerId(id);
    beerService.addUserBeer({...values, id} as any as Beer);
    setSaved(true);
  }
  const savedMessage = () => {
    if(!getSaved) return null;
    
    return (
      <div className="add-beer__feedback">
        <h3>Saved beer</h3>
        <Link href={`/beers/${getBeerId}`}>Go to Beer</Link>
      </div>
    )
  }
  return <div className="add-beer">
    <div className="container container--small">
      <h1>Add new beer</h1>
      <BeerFilterForm layout="vertical" onSubmit={onSubmit} submitText="Gem øl" >
        <BeerFilterItem filter={{name: 'name', label: 'Beer name', type: 'text', value: '', required: true}} />
        <BeerFilterItem filter={{name: 'description', label: 'Description', type: 'textarea', value: '', required: true}} />
        <BeerFilterItem filter={{name: 'tagline', label: 'Tagline', type: 'text', value: '', required: true}} />
        <BeerFilterItem filter={{name: 'yeast', label: 'Yeast', type: 'text', value: '', required: true}} />
        <BeerFilterItem filter={{name: 'hops', label: 'Hops', type: 'text', value: '', required: true}} />
        <BeerFilterItem filter={{name: 'malt', label: 'Malt', type: 'text', value: '', required: true}} />
        <BeerFilterItem filter={{name: 'food', label: 'Food', type: 'text', value: '', required: true}} />


        <BeerFilterItem filter={{name: 'abv', label: 'ABV', type: 'number', value: '', required: true}} />

        <BeerFilterItem filter={{name: 'ibu', label: 'IBU', type: 'number', value: '', required: true}} />

        <BeerFilterItem filter={{name: 'ebc', label: 'EBC', type: 'number', value: '', required: true}} />
      </BeerFilterForm>
      {savedMessage()}
    </div>
  </div>
}

export default AddNewBeer;