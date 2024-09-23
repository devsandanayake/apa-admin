import axiosInstance from "../axiosConfig";

export const FEATURE_REQUEST = "FEATURE_REQUEST";
export const FEATURE_SUCCESS = "FEATURE_SUCCESS";
export const FEATURE_FAILURE = "FEATURE_FAILURE";

export const featureRequest = () => ({
    type: FEATURE_REQUEST,
});

export const featureSuccess = (data) => ({
    type: FEATURE_SUCCESS,
    payload: data,
});

export const featureFailure = (error) => ({
    type: FEATURE_FAILURE,
    payload: error,
});


export const getFeature = () => {
    return (dispatch) => {
        dispatch(featureRequest());
        axiosInstance.get('/api/ads-feature/viewAllAdsFeature')
            .then(response => {
                dispatch(featureSuccess(response.data));
            })
            .catch(error => {
                dispatch(featureFailure(error.message));
            });
    };
}

export const featurePost = (feature) => {
    return (dispatch) => {
        dispatch(featureRequest());
        axiosInstance.post('/api/ads-feature/createAdsFeature', { feature: feature })
            .then(response => {
                dispatch(featureSuccess(response.data));
                dispatch(getFeature());
            })
            .catch(error => {
                dispatch(featureFailure(error.message));
            });
    };
}

export const getShortTermDayCount = () => {
    return (dispatch) => {
        dispatch(featureRequest());
        axiosInstance.get('/api/ads-feature/getDayCount')
            .then(response => {
                dispatch(featureSuccess(response.data));
            })
            .catch(error => {
                dispatch(featureFailure(error.message));
            });
    };
}

export const removeFeature = (id) => {
    return (dispatch) => {
        dispatch(featureRequest());
        axiosInstance.delete(`/api/ads-feature/deleteFeature/${id}`)
            .then(response => {
                dispatch(featureSuccess(response.data));
                dispatch(getFeature());
            })
            .catch(error => {
                dispatch(featureFailure(error.message));
            });
    };
}

