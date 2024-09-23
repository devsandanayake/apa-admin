import {
    APPROVEL_REQUEST,
    APPROVEL_SUCCESS,
    APPROVEL_FAILURE,
} from '../actions/approvelAction'

const initialState = {
    loading: false,
    data: [],
    error: '',
    updateSucess: false,
};

const approvelReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPROVEL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case APPROVEL_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
                updateSucess: true,
            };
        case APPROVEL_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default approvelReducer;

