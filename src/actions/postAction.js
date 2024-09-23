import axiosInstance from '../axiosConfig';
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  LOGOUT
} from './types';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const logout = () => ({
    type: LOGOUT,
    });


export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    axiosInstance.get('/api/ads/viewAllAdsForAdmin')
      .then(response => {
        dispatch(fetchDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};


export const fetchDataSpecific = (adCode) => {
    return (dispatch) => {
        dispatch(fetchDataRequest());
        axiosInstance.get(`/api/ads/viewSpecificAdForAdmin/${adCode}`)
            .then(response => {
                dispatch(fetchDataSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error.message));
            });
    };
}



