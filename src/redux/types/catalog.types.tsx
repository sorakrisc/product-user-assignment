export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
}

// ACTION TYPES

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: ProductInterface[];
}

interface RemoveProductAction {
  type: typeof REMOVE_PRODUCT;
  payload: ProductInterface;
}

export type CatalogActionTypes = AddProductAction | RemoveProductAction;
