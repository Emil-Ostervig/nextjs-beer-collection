import { Beer, MeasurementUnit } from "../../types/beer";

const BeerSpecList = (props: { beer: Beer }) => {
  const specs = [
    {
      value: props.beer.abv,
      label: 'ABV'
    },
    {
      value: props.beer.ibu,
      label: 'IBU'
    },
    {
      value: props.beer.volume, 
      label: 'Volume',
      type: 'unit',
    },
    {
      value: props.beer.ebc,
      label: 'EBC'
    },
    {
      value: props.beer.target_fg,
      label: 'FG',
    },
    {
      value: props.beer.target_og,
      label: 'OG',
    },
  ];

  
  const itemValue = (unit: {type?: string, value: MeasurementUnit | number}) => {
    if(unit.type == 'unit' && typeof unit.value != 'number'){
      return <>
        {`${unit.value.value} ${unit.value.unit}`}
      </>
    }
    return <>
      {unit.value}
    </>
  }

  return <div className="beer-spec-list">
    {
      specs.map((item) => {
        return item.value && <p className="beer-spec-list__item" key={item.label}>
          <span className="beer-spec-list__item-key">
            {item.label}
          </span> 
          <span className="beer-spec-list__item-value">
            {itemValue(item)}
          </span>
        </p>
      })
    }
    
  </div>
}

export default BeerSpecList;