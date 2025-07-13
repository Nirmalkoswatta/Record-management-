import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import fileFolderReducer from "./reducers/fileFolderReducer";
import fileReducer from "./reducers/fileReducer";
import activityReducer from "./reducers/activityReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  fileFolder: fileFolderReducer,
  file: fileReducer,
  activity: activityReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
