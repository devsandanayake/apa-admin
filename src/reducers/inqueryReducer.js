import { INQUERY_REQUEST, INQUERY_SUCCESS, INQUERY_FAILURE } from '../actions/inqueryAction'; 

const initialState = {
    loading: false,
    data: [],
    error: '',
};

const inqueryReducer = (state = initialState, action) => {
    switch (action.type) {
        case INQUERY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case INQUERY_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case INQUERY_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default inqueryReducer;