import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import fileFolderReducer from "./reducers/fileFolderReducer";
import fileReducer from "./reducers/fileReducer";
import activityReducer from "./reducers/activityReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  fileFolders: fileFolderReducer,
  file: fileReducer,
  activity: activityReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
