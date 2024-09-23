import {
    AUCTION_REQUEST,
    AUCTION_SUCCESS,
    AUCTION_FAILURE,
    AUCTION_OPEN,
    AUCTION_CLOSE,
    AUCTION_UPDATE,
}
from '../actions/auctionAction';

const initialState = {
    loading: false,
    data: [],
    error: '',
    open: false,
};

const auctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUCTION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case AUCTION_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case AUCTION_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        case AUCTION_OPEN:
            return {
                ...state,
                open: true,
                data: action.payload,
            };
        case AUCTION_CLOSE:
            return {
                ...state,
                open: false,
                data: action.payload,
            };
        case AUCTION_UPDATE:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}


export default auctionReducer;