import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IFilterState {
    filteredProducts: IProduct[];
}

const initialState: IFilterState = {
    filteredProducts: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterByCategory: (state, action: { payload: { products: IProduct[], category: string } }) => {
            const { products, category } = action.payload;
            let tempProducts = [];
            if (category === "All") {
                tempProducts = products;
            } else {
                tempProducts = products.filter(
                    (product) => product.category === category
                )
            }
            state.filteredProducts = tempProducts
        },
        filterByBrand: (state, action: { payload: { products: IProduct[], brand: string } }) => {
            const { products, brand } = action.payload;
            console.log('brand', brand);
            let tempProducts = [];
            if (brand === "All") {
                tempProducts = products;
            } else {
                tempProducts = products.filter(
                    (product) => product.brand === brand
                )
            }
            state.filteredProducts = tempProducts
        },
        filterByPrice: (state, action: { payload: { products: IProduct[], price: number } }) => {
            const { products, price } = action.payload;
            let tempProducts = [];

            tempProducts = products.filter(product => product.price <= price);

            state.filteredProducts = tempProducts;

        },
        filterBy: (state, action: { payload: { products: IProduct[], price: number, brand: string, category: string } }) => {
            const { products, price, brand, category } = action.payload;
            let tempProducts = [];

            if (category === "All") {
                tempProducts = products;
            } else {
                tempProducts = products.filter(
                    (product) => product.category === category
                )
            }
            if (brand === "All") {
                tempProducts = tempProducts;
            } else {
                tempProducts = tempProducts.filter(
                    (product) => product.brand === brand
                )
            }

            tempProducts = tempProducts.filter(product => product.price <= price);

            state.filteredProducts = tempProducts;

        },
        sortProducts: (state, action: { payload: { products: IProduct[], sort: string } }) => {
            const { products, sort } = action.payload;
            let tempProducts: IProduct[] = [];
            if (sort === 'latest') {
                tempProducts = products;
            }

            if (sort === "lowest-price") {
                tempProducts = products.slice().sort((a, b) => {
                    return a.price - b.price;
                })
            }

            if (sort === 'highest-price') {
                tempProducts = products.slice().sort((a, b) => {
                    return b.price - a.price;
                })
            }

            state.filteredProducts = tempProducts

        },
        filterBySearch: (state, action: { payload: { products: IProduct[], search: string } }) => {

            const { products, search } = action.payload;

            const tempProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.category.toLowerCase().includes(search.toLowerCase())
            )

            state.filteredProducts = tempProducts;

        }
    }
});

export const {
   filterByCategory,
   filterByBrand,
   filterByPrice,
    sortProducts,
    filterBySearch,
    filterBy
} = filterSlice.actions;    

export const selectFilteredProducts = (state: RootState) => state.filter.filteredProducts;


export default filterSlice;

export const filterReducer = filterSlice.reducer;