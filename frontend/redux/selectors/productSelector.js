import { createSelector } from 'reselect';

const selectProductState = state => state.productReducer;

export const selectProduct = createSelector(
  selectProductState,
  product => product.product
);

export const selectCount = createSelector(
    selectProductState,
    product => product.cartCount
)