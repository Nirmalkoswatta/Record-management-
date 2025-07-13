import * as types from '../actionsTypes/activityActionTypes';

const initialState = {
  isLoading: false,
  activities: [],
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACTIVITY_LOADING:
      return { ...state, isLoading: action.payload };
    case types.SET_ACTIVITIES:
      return { ...state, activities: action.payload };
    case types.ADD_ACTIVITY:
      return { ...state, activities: [action.payload, ...state.activities] };
    default:
      return state;
  }
};

export default activityReducer; 