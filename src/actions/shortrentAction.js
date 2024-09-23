import axiosInstance from "../axiosConfig";

export const SHORT_RENT_REQUEST = "SHORT_RENT_REQUEST";
export const SHORT_RENT_SUCCESS = "SHORT_RENT_SUCCESS";
export const SHORT_RENT_FAILURE = "SHORT_RENT_FAILURE";

export const shortRentRequest = () => ({
    type: SHORT_RENT_REQUEST,
});

export const shortRentSuccess = (data) => ({
    type: SHORT_RENT_SUCCESS,
    payload: data,
});


export const shortRentFailure = (error) => ({
    type: SHORT_RENT_FAILURE,
    payload: error,
});


export const viewEachShortrent = (adCode) => {
    return (dispatch) => {
        dispatch(shortRentRequest());
        axiosInstance.get('api/short-rental/getadCodeSRentalTransactions',{
            params: {
                adCode: adCode
            }
        })
            .then(response => {
                dispatch(shortRentSuccess(response.data));
                 
            })
            .catch(error => {
                dispatch(shortRentFailure(error.message));
            });
    };
}






