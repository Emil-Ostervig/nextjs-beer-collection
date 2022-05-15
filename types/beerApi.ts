export interface BeerApiFilter {
    abv_gt?: number | string;
    abv_lt?: number | string;
    ibu_gt?: number | string;
    ibu_lt?: number | string;
    ebc_gt?: number | string;
    ebc_lt?: number | string;
    beer_name?: string;
    yeast?: string;
    brewed_before?: Date | string;
    brewed_after?: Date | string;
    hops?: string;
    malt?: string;
    food?: string;
    ids?: string[] | string;
}