import {
    FEATURE_REQUEST,
    FEATURE_SUCCESS,
    FEATURE_FAILURE,
}
from '../actions/featureAction';


const initialState = {
    loading: false,
    data: [],
    error: '',
};


const adsFeatureReducer = (state = initialState, action) => {
    switch (action.type) {
        case FEATURE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FEATURE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case FEATURE_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}


export default adsFeatureReducer;