// Action Types
import {remove} from 'lodash';
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductInterface,
  CatalogActionTypes,
} from '../types/catalog.types';

// reducer

const initialState: ProductInterface[] = [];

function catalogReducer(state = initialState, action: CatalogActionTypes) {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];

    case REMOVE_PRODUCT:
      // deletedNewArray
      return remove(state, (obj: ProductInterface) => {
        return obj.id !== action.payload.id;
      });

    default:
      return state;
  }
}

export default catalogReducer;
