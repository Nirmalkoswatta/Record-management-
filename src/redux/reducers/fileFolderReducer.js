import * as types from "../actionsTypes/fileFolderActionTypes";

const initialState = {
    isLoading: true,
    currentFolder: "root",
    userFolders: [],
    userFiles: [],
    adminFolders: [],
    adminFiles: [], 
};

const fileFolderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_FOLDER:
            return {
                ...state,
                userFolders: [...state.userFolders, action.payload],
            };
        case types.ADD_FOLDER: 
            return {
                ...state,
                userFolders: action.payload,
            };
        case types.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case types.CREATE_FILE:
        default:
            return state;
    }
};

export default fileFolderReducer;
