import axiosInstance from "../axiosConfig";
export const LONGRENT_INQUERY_REQUEST = "LONGRENT_INQUERY_REQUEST";
export const LONGRENT_INQUERY_SUCCESS = "LONGRENT_INQUERY_SUCCESS";
export const LONGRENT_INQUERY_FAILURE = "LONGRENT_INQUERY_FAILURE";

export const longrentInqueryRequest = () => ({
    type: LONGRENT_INQUERY_REQUEST,
});

export const longrentInquerySuccess = (data) => ({
    type: LONGRENT_INQUERY_SUCCESS,
    payload: data,
});


export const longrentInqueryFailure = (error) => ({
    type: LONGRENT_INQUERY_FAILURE,
    payload: error,
});


export const getLongrentInquery = () => {
    return(dispatch)=>{
        dispatch(longrentInqueryRequest());
        axiosInstance.get('/api/longrental-inquery/all')
        .then(response => {
            dispatch(longrentInquerySuccess(response.data));
            //pending count save in local storage
            localStorage.setItem('LRpendingCount', response.data.filter((item) => item.replyStatus === 'Pending').length);
        })
        .catch(error => {
            dispatch(longrentInqueryFailure(error.message));
        });
    }
}


export const updateInqueryStatus = (inqueryID, status, reply) => {
     return (dispatch) => {
           console.log("inqueryID",inqueryID , reply);
            dispatch(longrentInqueryRequest());
            axiosInstance.patch(`/api/longrental-inquery/update`,
                 {status, reply},
                {
                params:{
                    inqueryID:inqueryID
                }
            })
                .then(response => {
                    dispatch(longrentInquerySuccess(response.data));
                    window.location.reload();
                })
                .catch(error => {
                    dispatch(longrentInqueryFailure(error.message));
                });
        };
    }

