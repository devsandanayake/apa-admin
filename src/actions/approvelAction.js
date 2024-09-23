import axiosInstance from "../axiosConfig";
export const APPROVEL_REQUEST = "APPROVEL_REQUEST";
export const APPROVEL_SUCCESS = "APPROVEL_SUCCESS";
export const APPROVEL_FAILURE = "APPROVEL_FAILURE";

export const approvelRequest = () => ({
    type: APPROVEL_REQUEST,
    });

export const approvelSuccess = (data) => ({
    type: APPROVEL_SUCCESS,
    payload: data,
    });

export const approvelFailure = (error) => ({
    type: APPROVEL_FAILURE,
    payload: error,
    });

export const approvelPost = (adCode, status) => {
    return (dispatch) => {
        dispatch(approvelRequest());
        axiosInstance.patch('/api/ads/approveAds', {adCode, status})
            .then(response => {
                dispatch(approvelSuccess(response.data.ad.status));
            })
            .catch(error => {
                dispatch(approvelFailure(error.message));
            });
    };
}  
    
    
