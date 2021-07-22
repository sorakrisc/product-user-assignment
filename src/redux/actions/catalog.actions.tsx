import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductInterface,
} from '../types/catalog.types';
// Action Creators

export function addProduct(product: ProductInterface) {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}

export function deleteProduct(id: number) {
  return {
    type: REMOVE_PRODUCT,
    payload: id,
  };
}
