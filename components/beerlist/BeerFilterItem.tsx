import { useRouter } from "next/router";
import { useEffect, useState,  } from "react";
import { BeerFilterItem as IBeerFilterItem } from "../../types/beer";

const BeerFilterItem = (props: { filter: IBeerFilterItem }) => {
  const [getValue, setValue] = useState('');
  const router = useRouter();

  const getUrlParams = () => {
    const currentUrl = new URL(window.location.href);
    return new URLSearchParams(currentUrl.search);

  }
  const loadStateFromUrl = () => {
    const params = getUrlParams();
    const value = params.get(props.filter.name);
    if(value) {
      setValue(value);
    }
  }
  const handleChange =  (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }

  useEffect(() => {
    loadStateFromUrl();
  }, []);

  const input = () => {
    const requiredAttr = props.filter?.required ? true : false;
    if(props.filter.type == 'textarea'){
      return <textarea className="beer-filter-item__input" required={requiredAttr} name={props.filter.name} value={getValue} onChange={handleChange}>
      </textarea>
    }
    return <input className="beer-filter-item__input" required={requiredAttr} type={props.filter.type} name={props.filter.name} value={getValue} onChange={handleChange}/>
  }

  return <div className="beer-filter-item">
    <label className="beer-filter-item__label">
      {props.filter.label}
    </label>
    {input()}
  </div>

}

export default BeerFilterItem;