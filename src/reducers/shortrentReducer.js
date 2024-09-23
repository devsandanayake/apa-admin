import {SHORT_RENT_REQUEST , SHORT_RENT_SUCCESS , SHORT_RENT_FAILURE} from "../actions/shortrentAction";

const initialState = {
    loading: false,
    data: [],
    error: '',
};

const shortrentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHORT_RENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SHORT_RENT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case SHORT_RENT_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default shortrentReducer;