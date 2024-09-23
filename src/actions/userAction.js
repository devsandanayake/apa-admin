import axiosInstance from "../axiosConfig";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILURE = "USER_FAILURE";


export const userRequest = () => ({
    type: USER_REQUEST,
});

export const userSuccess = (data) =>({
    type: USER_SUCCESS,
    payload: data,
});

export const userFailure = (error) =>({
    type: USER_FAILURE,
    payload: error,
});


export const getUser = () => {
    return(dispatch) =>{
        dispatch(userRequest());
        axiosInstance.get('/api/users/viewAllUsers')
        .then(response => {
            dispatch(userSuccess(response.data));
        })
        .catch(error => {
            dispatch(userFailure(error.message));
        }
        );
    }
}

export const userPostAds = (username) => {
    return (dispatch) => {
      dispatch(userRequest());
      axiosInstance.get(`/api/users/viewAllAds/${username}`)
        .then(response => {
          dispatch(userSuccess(response.data.ads));
        })
        .catch(error => {
          dispatch(userFailure(error.message));
        });
    };
  }


export const userDetails = (username) => {
    return (dispatch) => {
        dispatch(userRequest());
        axiosInstance.get(`/api/users/viewUserProfileAdmin`, {
            params: {
                username: username
            }
        })
        .then(response => {
            dispatch(userSuccess(response.data));
        })
        .catch(error => {
            dispatch(userFailure(error.message));
        });
    };
}  


