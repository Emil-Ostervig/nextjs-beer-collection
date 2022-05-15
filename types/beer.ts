
export interface MeasurementUnit {
    value: number;
    unit: string;
}


export interface Method {
    temp: MeasurementUnit;
    duration?: number;
}

export interface MaltIngredient {
    name: string;
    amount: MeasurementUnit;
}

export interface HopIngredient {
    name: string;
    amount: MeasurementUnit;
    add: string;
    attribute: string;
}

export interface Ingredients {
    malt: MaltIngredient[];
    hops: HopIngredient[];
    yeast: string;
}

export interface Beer {
    id: string;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu: number;
    target_fg: number;
    target_og: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuation_level: number;
    volume: MeasurementUnit;
    boil_volume: MeasurementUnit;
    method: {
        [methodName: string]: Method | null;
    };
    ingredients: Ingredients;
    food_pairing: string[];
    brewers_tips: string;
    contributed_by: string;
}

export interface BeerFilterItem {
  required?: boolean | null;
  type: 'number' | 'text' | 'date' | 'textarea',
  name: string;
  value: string;
  label: string;
}

export interface SortOrderOption {
  value: string;
  label: string;
  descending: boolean;
  key: string;
}