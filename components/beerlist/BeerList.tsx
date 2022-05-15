
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import beerService from "../../services/beer.service"
import styles from '../../styles/modules/BeerList.module.css';
import { Beer, SortOrderOption } from "../../types/beer";
import BeerFilterForm from "./BeerFilterForm";
import BeerFilterItem from "./BeerFilterItem";
import LoadingSpinner from "../atoms/LoadingSpinner";
import BeerCardList from "./BeerCardList";
import contentService from "../../services/content.service";

const BeerList = (props: {initialBeers?: Beer[]}) => {
  const router = useRouter();

  const [beerItems, setBeerItems] = useState<Beer[]>(props.initialBeers || []);
  const [isLoading, setLoading] = useState(props.initialBeers ? false : true);
  const [sortOrder, setSortOrder] = useState('');
  const [sortOrderOptions, setSortOrderOptions] = useState<SortOrderOption[]>([]);

  useEffect(() => {
    contentService.getSortOptions().then(options => {
      setSortOrderOptions(options);
      setSortOrder(options[0]?.value);
    });
    if(!props.initialBeers){
      hydrateBeers();
    }
  }, []);

  const hydrateBeers = () => {
    setLoading(true)
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    const beerListParams = beerService.mapUrlParamsToFilters(params);
    
    beerService.getBeers(beerListParams).then((beers) => {
      setBeerItems(beers);
      setLoading(false);
    })
  }


  useEffect(() => {
    const handleRouteChange = (url:string, data:any) => {
      hydrateBeers();
    }
    router.events.on('routeChangeComplete', handleRouteChange)
   
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, []);

  
  const parseForSort = (key: string, value: any) => {
    let parsedValue;
    switch (key) {
      case 'first_brewed':
        const [month, year] = value.split('/');
        parsedValue = `${year}${month}`;
        break;
    
      default:
        parsedValue = value;
        break;
    }
    return parsedValue;
  }
  const sortedBeerItems = () => {
    const currentSortOption = sortOrderOptions.find((el) => el.value === sortOrder);
    if(!currentSortOption) return [...beerItems];
    const sortKey = currentSortOption.key;
    const sortedItems = [...beerItems]
      .sort((a,b) => {
        const aValue = a[sortKey as keyof Beer];
        const bValue = b[sortKey as keyof Beer];
        return parseForSort(sortKey, aValue) > parseForSort(sortKey, bValue) ? 1 : -1;
      });

    return currentSortOption.descending ? sortedItems.reverse() : sortedItems;
  }

  const beerListElement = () => {
    if(isLoading) {
      return <LoadingSpinner/>
    }
    else if(sortedBeerItems().length == 0){
      return <h3>No beers found for search</h3>
    }
    return <BeerCardList beers={sortedBeerItems()} />
  }

  const handleFilterSubmit = (formData: {[id:string]: string}) => {
    const params = new URLSearchParams(formData);
    Object.keys(formData).forEach(key => {
      if(formData[key] == ''){
        params.delete(key);
      }
    });
    router.replace({
      pathname: window.location.href.split('?')[0],
      search: params.toString()
    })
  }
  

  return <div className={styles.beerlist}>
    <div className="container">
      <div className={styles['beerlist__filters']}>
        <BeerFilterForm onSubmit={handleFilterSubmit} layout="horizontal" submitText="Filter">
          <BeerFilterItem filter={{name: 'beer_name', label: 'Beer name', type: 'text', value: ''}} />
          <BeerFilterItem filter={{name: 'yeast', label: 'Yeast', type: 'text', value: ''}} />
          <BeerFilterItem filter={{name: 'food', label: 'Food', type: 'text', value: ''}} />

          <BeerFilterItem filter={{name: 'abv_gt', label: 'ABV min', type: 'number', value: ''}} />
          <BeerFilterItem filter={{name: 'abv_lt', label: 'ABV max', type: 'number', value: ''}} />

          <BeerFilterItem filter={{name: 'ibu_gt', label: 'IBU min', type: 'number', value: ''}} />
          <BeerFilterItem filter={{name: 'ibu_lt', label: 'IBU max', type: 'number', value: ''}} />

          <BeerFilterItem filter={{name: 'ebc_gt', label: 'EBC min', type: 'number', value: ''}} />
          <BeerFilterItem filter={{name: 'ebc_lt', label: 'EBC max', type: 'number', value: ''}} />

          <BeerFilterItem filter={{name: 'brewed_before', label: 'Brewed before', type: 'date', value: ''}} />
          <BeerFilterItem filter={{name: 'brewed_after', label: 'Brewed after', type: 'date', value: ''}} />

          <BeerFilterItem filter={{name: 'hops', label: 'Hops', type: 'text', value: ''}} />
          <BeerFilterItem filter={{name: 'malt', label: 'Malt', type: 'text', value: ''}} />


        </BeerFilterForm>
        <div className={styles['beerlist__sort-row']}>

          <p className={styles['beerlist__count']}>
            Showing {sortedBeerItems().length} beers
          </p>

          <div className={styles['beerlist__sort']}>
            <label htmlFor="beerListSortOrder">Sort by:</label>
            <select className={styles['beerlist__sort-select']} name="sortOrder" id="beerListSortOrder" defaultValue={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              {
                sortOrderOptions.map((item) => {
                  return <option key={item.value} value={item.value} >{item.label}</option>
                })
              }
            </select>
          </div>
        </div>
      </div>
      {beerListElement()}
    </div>
  </div>
}


export default BeerList
