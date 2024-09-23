import {LONGRENT_INQUERY_REQUEST,LONGRENT_INQUERY_SUCCESS,LONGRENT_INQUERY_FAILURE} from '../actions/LRentInquery'

const initialState ={
    loading:false,
    data:[],
    error:'',
}


const LRentInqueryReducer = (state = initialState,action) =>{
    switch(action.type){
        case LONGRENT_INQUERY_REQUEST:
            return{
                ...state,
                loading:true,
            };
        case LONGRENT_INQUERY_SUCCESS:
            return{
                loading:false,
                data:action.payload,
                error:'',
            };
        case LONGRENT_INQUERY_FAILURE:
            return{
                loading:false,
                data:[],
                error:action.payload,
            };
        default:
            return state;
    }
}

export default LRentInqueryReducer;

