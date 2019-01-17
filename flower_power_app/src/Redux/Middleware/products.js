import {
  GET_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  updateProducts
} from "../Actions/products";
import { apiRequest } from "../Actions/api";
import { showLoader, hideLoader } from "../Actions/ui";

export const getProductsFlow = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === GET_PRODUCTS) {
    dispatch(
      apiRequest(
        "/products",
        "GET",
        null,
        FETCH_PRODUCTS_SUCCESS,
        FETCH_PRODUCTS_ERROR
      )
    );
    dispatch(showLoader());
  }
};

export const processProductsCollection = ({dispatch}) => next => action => {
    next(action);

    if(action.type === FETCH_PRODUCTS_SUCCESS) {
        dispatch(updateProducts(action.payload));
        dispatch(hideLoader());
    }
}

export const productsMdl = [
    getProductsFlow,
    processProductsCollection
];
