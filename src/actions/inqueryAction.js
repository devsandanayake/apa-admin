import axiosInstance from "../axiosConfig";

export const INQUERY_REQUEST = "INQUERY_REQUEST";
export const INQUERY_SUCCESS = "INQUERY_SUCCESS";
export const INQUERY_FAILURE = "INQUERY_FAILURE";

export const inqueryRequest = () => ({
    type: INQUERY_REQUEST,
});

export const inquerySuccess = (data) => ({
    type: INQUERY_SUCCESS,
    payload: data,
});

export const inqueryFailure = (error) => ({
    type: INQUERY_FAILURE,
    payload: error,
});
    
export const getInquery = () => {
    return (dispatch) => {
        dispatch(inqueryRequest());
        axiosInstance.get('/api/auction-inquery/viewAllInqueries')
            .then(response => {
                dispatch(inquerySuccess(response.data));
                //save localstorage here if ReplyStatus is Pending Count 
                localStorage.setItem('inqueryCount', response.data.filter(inquery => inquery.replyStatus === 'Pending').length);
            })
            .catch(error => {
                dispatch(inqueryFailure(error.message));
            });
    };
}

export const replyInquery = (inqueryID, reply) => {
    return (dispatch) => {
        dispatch(inqueryRequest());
        axiosInstance.post('/api/auction-inquery/replyToInquery', {inqueryID, reply})
            .then(response => {
                dispatch(inquerySuccess(response.data));
                window.location.reload();
            })
            .catch(error => {
                dispatch(inqueryFailure(error.message));
            });
    };
}


export const viewInqueries = (auctionID) => {
    return (dispatch) => {
        dispatch(inqueryRequest());
        axiosInstance.get(`/api/auction-inquery/viewInqueries/${auctionID}`)
            .then(response => {
                dispatch(inquerySuccess(response.data));
            })
            .catch(error => {
                dispatch(inqueryFailure(error.message));
            });
    }
}

