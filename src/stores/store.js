import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ProductServiceInstance from '../services/product-serivce';

// Set default state for store
let defaultState = {
  products: [],
  loading: false,
  loadingSort: false,
  filter: {
    page: 1,
    sort: null,
    totalRows: 0,
  },
  isFirstFetch: false,
};

// Reducer
const appReducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'SHOW_LOADING':
      if(action.isLoadMore)
        newState.loading = true;
      else {
        if(action.isSort)
          newState.loadingSort = true;
      }
      return newState;
    case 'LOAD_PRODUCT_SUCCESS':
      newState.products = newState.products ? newState.products.concat(action.products) : action.products;
      newState.filter = action.filter;
      newState.loading = false;
      if (!newState.isFirstFetch)
        newState.isFirstFetch = true;
      return newState;
    case 'SORT_PRODUCT_SUCCESS':
      newState.products =  action.products;
      newState.filter = action.filter;
      newState.loadingSort = false;
      return newState;
    default:
      return state;
  }
};

// Actions handle

// Handle load products
export function loadProduct(filter) {
  return async (dispatch) => {
    dispatch(showLoading());
    let productResult = await ProductServiceInstance.getProducts(filter.page, filter.sort);
    filter.totalRows = productResult.totalRows;
    dispatch(loadProductSuccess(productResult.products, filter));
  };
}

// Handle sort products
export function sortProduct(filter) {
  return async (dispatch) => {
    dispatch(showLoadingSort());
    let productResult = await ProductServiceInstance.sortProducts(filter.page, filter.sort);
    dispatch(sortProductSuccess(productResult.products, filter));
  };
}

export function loadProductSuccess(products, filter) {
  return {
    type: 'LOAD_PRODUCT_SUCCESS',
    filter,
    products
  };
}

export function sortProductSuccess(products, filter) {
  return {
    type: 'SORT_PRODUCT_SUCCESS',
    filter,
    products
  };
}

export function showLoading() {
  return {
    type: 'SHOW_LOADING',
    isLoadMore: true
  };
}

export function showLoadingSort() {
  return {
    type: 'SHOW_LOADING',
    isSort: true
  };
}

// create store with default state and apply middleware 'redux-thunk'
// for fetching data from api
const store = createStore(
  appReducer,
  defaultState,
  applyMiddleware(thunk)
);

export default store;