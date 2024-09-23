import axiosInstance from "../axiosConfig";
export const AUCTION_REQUEST = "AUCTION_REQUEST";
export const AUCTION_SUCCESS = "AUCTION_SUCCESS";
export const AUCTION_FAILURE = "AUCTION_FAILURE";
export const AUCTION_OPEN = "AUCTION_OPEN";
export const AUCTION_CLOSE = "AUCTION_CLOSE";
export const AUCTION_UPDATE = "AUCTION_UPDATE";



export const auctionRequest = () => ({
    type: AUCTION_REQUEST,
});

export const auctionSuccess = (data) => ({
    type: AUCTION_SUCCESS,
    payload: data,
});


export const auctionFailure = (error) => ({
    type: AUCTION_FAILURE,
    payload: error,
});

export const auctionOpen = (data) => ({
    type: AUCTION_OPEN,
    payload: data,
});

export const auctionClose = (data) => ({
    type: AUCTION_CLOSE,
    payload: data,
});

export const auctionUpdate = (data) => ({
    type: AUCTION_UPDATE,
    payload: data,
});


//get auction aplied ads
export const getAuction = () => {
    return (dispatch) => {
        dispatch(auctionRequest());
        axiosInstance.get('/api/ads/viewAllAdsForAdmin')
            .then(response => {
                const data = response.data.filter(ad => ad.transactionType === 4);
                dispatch(auctionSuccess(data));
            })
            .catch(error => {
                dispatch(auctionFailure(error.message));
            });
    };
}

//openForAuction
export const openForAuction = (adCode , value) =>{
    return (dispatch) => {
        dispatch(auctionRequest());
        axiosInstance.patch('/api/ads/openForBidding', {adCode, value})
            .then(response => {
                if(!response.data.ad){
                    dispatch(auctionClose(response.data));
                    window.location.reload();
                }
                else{
                    dispatch(auctionOpen(response.data));
                    window.location.reload();
                }
            })
            .catch(error => {
                dispatch(auctionFailure(error.message));
            });
    };
}

//updateAuction
export const updateAuction = (adCode, startDate,startTime,endDate,endTime, startPrice,maxRate,BidValue) =>{
    return (dispatch) => {
        dispatch(auctionRequest());
        axiosInstance.patch('/api/ads/updateBid', {adCode, startDate,startTime,endDate,endTime, startPrice,maxRate,BidValue})
            .then(response => {
                dispatch(auctionUpdate(response.data));
                window.location.reload();
            })
            .catch(error => {
                dispatch(auctionFailure(error.message));

            });
    };
}



export const viewRegisterUsers = (auctionID) => {
    return (dispatch) => {
        dispatch(auctionRequest());
        axiosInstance.get(`/api/auction/viewAllRegUsers/${auctionID}`)
            .then(response => {
                dispatch(auctionSuccess(response.data));
            })
            .catch(error => {
                dispatch(auctionFailure(error.message));
            });
    };
}


