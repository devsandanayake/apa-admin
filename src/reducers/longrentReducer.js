import { LONGRENT_REQUEST , LONGRENT_SUCCESS , LONGRENT_FAILURE } from "../actions/longrentAction";

const initialState = {
    loading: false,
    data: [],
    error: '',
};

const longrentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LONGRENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LONGRENT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case LONGRENT_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default longrentReducer;