import axiosInstance from "../axiosConfig";

export const CHARGING_REQUEST = "CHARGING_REQUEST";
export const CHARGING_SUCCESS = "CHARGING_SUCCESS";
export const CHARGING_FAILURE = "CHARGING_FAILURE";

export const chargingRequest = () => ({
    type: CHARGING_REQUEST,
});

export const chargingSuccess = (data) => ({
    type: CHARGING_SUCCESS,
    payload: data,
});

export const chargingFailure = (error) => ({
    type: CHARGING_FAILURE,
    payload: error,
});



export const getCharging = (adCode) => {
    return (dispatch) => {
        dispatch(chargingRequest());
        axiosInstance.get(`/api/pricing/${adCode}`)
            .then(response => {
                dispatch(chargingSuccess(response.data));
            })
            .catch(error => {
                dispatch(chargingFailure(error.message));
            });
    };
}