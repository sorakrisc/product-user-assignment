import {combineReducers} from 'redux';
import catalogReducer from './catalog.reducer';
import userReducer from './user.reducer';

export const rootReducer = combineReducers({
  catalog: catalogReducer,
  users: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
