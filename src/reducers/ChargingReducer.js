import {
  CHARGING_REQUEST,
  CHARGING_SUCCESS,
  CHARGING_FAILURE
}
from '../actions/ChargingAction';


const initialState = {
    loading: false,
    data: [],
    error: '',
    };

const chargingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHARGING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CHARGING_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case CHARGING_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default chargingReducer;