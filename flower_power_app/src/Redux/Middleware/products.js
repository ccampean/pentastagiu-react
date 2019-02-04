import {
  GET_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  SAVE_PRODUCT,
  updateProducts,
  getProductById, DELETE_PRODUCT,
  SET_SAVE_EDIT_PRODUCT,
  FETCH_PRODUCT_SAVE_EDIT_SUCCESS,
  resetProduct,
} from "../Actions/products";
import { apiRequest } from "../Actions/api";
import {showLoader, hideLoader, PRODUCT_EDIT_STARTED, finishEditProduct} from "../Actions/ui";

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
export const deleteProductById = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === DELETE_PRODUCT) {
    dispatch(
      apiRequest(
        `/products/${action.payload}`,
        "DELETE",
        null,
        GET_PRODUCTS,
        FETCH_PRODUCTS_ERROR
      )
    );
    dispatch(showLoader());
  }
};
export const productById= ({ dispatch }) => next => action => {
  next(action);

  if (action.type === PRODUCT_EDIT_STARTED) {
    dispatch(
      apiRequest(
        `/products/${action.payload}`,
        "GET",
        null,
        FETCH_PRODUCT_SUCCESS,
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
export const processProductCollection = ({dispatch}) => next => action => {
  next(action);

  if(action.type === FETCH_PRODUCT_SUCCESS) {
    dispatch(getProductById(action.payload));
    dispatch(hideLoader());
  }
}

export const saveProductById= ({ dispatch, getState }) => next => action => {
  next(action);

  if (action.type === SET_SAVE_EDIT_PRODUCT) {
    const state = getState();
    dispatch(showLoader());
    dispatch(
      apiRequest(
        "/products",
        "PUT",
       { body: { product: state.products.product } },
        FETCH_PRODUCT_SAVE_EDIT_SUCCESS,
        FETCH_PRODUCTS_ERROR
      )
    );
  }
};
export const processSaveEditProductCollection = ({dispatch}) => next => action => {
  next(action);

  if(action.type === FETCH_PRODUCT_SAVE_EDIT_SUCCESS) {
    dispatch(hideLoader());
    dispatch(finishEditProduct());
    dispatch(resetProduct());
  }
}
export const saveProduct= ({ dispatch, getState }) => next => action => {
  next(action);

  if (action.type === SAVE_PRODUCT) {
    const state = getState();
    dispatch(showLoader());
    dispatch(
      apiRequest(
        "/products",
        "POST",
        { body: { product: state.products.product } },
        GET_PRODUCTS,
        FETCH_PRODUCTS_ERROR
      )
    );
  }
};
export const productsMdl = [
    getProductsFlow,
    processProductsCollection,
  productById,
  processProductCollection,
  saveProductById,
  processSaveEditProductCollection,
  deleteProductById,
  saveProduct,
];
