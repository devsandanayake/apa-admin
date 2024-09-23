import axiosInstance from "../axiosConfig";
export const LONGRENT_REQUEST = "LONGRENT_REQUEST";
export const LONGRENT_SUCCESS = "LONGRENT_SUCCESS";
export const LONGRENT_FAILURE = "LONGRENT_FAILURE";

export const longrentRequest = () => ({
    type: LONGRENT_REQUEST,
    });

export const longrentSuccess = (data) => ({
    type: LONGRENT_SUCCESS,
    payload: data,
    });

export const longrentFailure = (error) => ({
    type: LONGRENT_FAILURE,
    payload: error,
    });

export const longrentGet = () => {
    return (dispatch) => {
        dispatch(longrentRequest());
        axiosInstance.get('/api/longrental/getAllLRentalTransactions')
            .then(response => {
                dispatch(longrentSuccess(response.data));
            })
            .catch(error => {
                dispatch(longrentFailure(error.message));
            });
    };
}

export const viewEachLongrent = (adCode) => {
    return (dispatch) => {
        dispatch(longrentRequest());
        axiosInstance.get('api/longrental/getadCodeLRentalTransactions',{
            params: {
                adCode: adCode
            }
        })
            .then(response => {
                dispatch(longrentSuccess(response.data));
                 
            })
            .catch(error => {
                dispatch(longrentFailure(error.message));
            });
    };
}


export const updateStatus = (adCode, adminKeyStatus,username,monthlyRate,advancePayment,id) => {
    return (dispatch) => {
        dispatch(longrentRequest());
        axiosInstance.patch(`/api/longrental/updateLRentalTransactionStatus`, {
            adminKeyStatus: adminKeyStatus,
            username:username,
            monthlyRate:monthlyRate,
            advancePayment:advancePayment

        }, {
            params: {
                adCode: adCode,
                id: id
            }
        })
        .then(response => {
            dispatch(longrentSuccess(response.data));
            window.location.reload();
        })
        .catch(error => {
            dispatch(longrentFailure(error.message));
        });
    };
}

