export const GET_PRODUCTS = '[products] Get all products';
export const UPDATE_PRODUCTS = '[products] Update all products in state';
export const FETCH_PRODUCTS_SUCCESS = '[products] Get all products was successful';
export const FETCH_PRODUCTS_ERROR = '[products] Get all products encountered an error';

export const getProducts = () => ({
    type: GET_PRODUCTS
});

export const updateProducts = (products) => ({
    type: UPDATE_PRODUCTS,
    payload: products
});