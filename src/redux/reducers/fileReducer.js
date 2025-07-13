import * as types from '../actionsTypes/fileActionTypes';

const initialState = {
  isLoading: false,
  files: [],
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FILE_LOADING:
      return { ...state, isLoading: action.payload };
    case types.SET_FILES:
      return { ...state, files: action.payload };
    case types.CREATE_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case types.UPDATE_FILE:
      return {
        ...state,
        files: state.files.map(f => f.id === action.payload.id ? { ...f, ...action.payload.updates } : f),
      };
    case types.DELETE_FILE:
      return {
        ...state,
        files: state.files.filter(f => !action.payload.includes(f.id)),
      };
    default:
      return state;
  }
};

export default fileReducer; 