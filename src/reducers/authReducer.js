import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
  } from '../actions/types';
  
  const initialState = {
    loading: false,
    user: null,
    error: '',
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_SUCCESS:
        return {
          loading: false,
          user: action.payload,
          error: '',
          isAuthenticated: true,
        };
      case LOGIN_FAILURE:
        return {
          loading: false,
          user: null,
          error: action.payload,
          isAuthenticated: false,
        };
      case LOGOUT:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  