import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import fileFolderReducer from "./reducers/fileFolderReducer";



const rootReducer = combineReducers({auth: authReducer, fileFolder: fileFolderReducer});
const store = createStore(
    
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))

);

export default store; 