import { BeerApiFilter } from "../types/beerApi"
import axios from "axios"
import { Beer, SortOrderOption } from "../types/beer";
import { NavigationItem } from "../types/navigation";
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getNavigation = async (): Promise<NavigationItem[]> => {
    await sleep(100); // Simulate response time
    const navigationItems = [
      {
        url: '/',
        title: 'Browse Beers'
      },
      {
        url: '/my-beers',
        title: 'My beers'
      },
      {
        url: '/beers/new',
        title: 'Add beer'
      }
    ]
    return Promise.resolve(navigationItems);
}

const getSortOptions = async (): Promise<SortOrderOption[]> => {
  await sleep(100); // Simulate response time
  return [
    {
      value: "price_asc",
      label: "First brewed (oldest first)",
      descending: false,
      key: "first_brewed",
    },
    {
      value: "price_desc",
      label: "First brewed (newest first)",
      key: "first_brewed",
      descending: true,
    },
    {
      value: "abv_asc",
      label: "ABV ascending",
      descending: false,
      key: "abv",
    },
    {
      value: "abv_desc",
      label: "ABV descending",
      descending: true,
      key: "abv",
    },
    {
      value: "volumne_asc",
      label: "Size ascending",
      descending: false,
      key: "volume",
    },
    {
      value: "volumne_desc",
      label: "Size descending",
      descending: true,
      key: "volume",
    },
  ]
}

const contentService = {
    getNavigation,
    getSortOptions
}

export default contentService;