import axiosInstance from '../axiosConfig';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './types';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axiosInstance.post('/api/users/signin', credentials)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        dispatch(loginSuccess(response.data.token));
        
      })
      .catch(error => {
        console.error('Login error:', error.response ? error.response.data : error.message);
        dispatch(loginFailure(error.response ? error.response.data.message : error.message));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  };
};
