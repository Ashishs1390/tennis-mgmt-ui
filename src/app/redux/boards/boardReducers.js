import {
    FETCH_BOARD_REQUEST, FETCH_BOARD_SUCCESS, FETCH_BOARD_FAILURE,
    POST_BOARD_REQUEST, POST_BOARD_SUCCESS, POST_BOARD_FAILURE
} from "./boardTypes";

const initialState = {
    data: [],
    error: { status: 400 },

}



export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOARD_REQUEST:
            return {
                ...state
            }

        case FETCH_BOARD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: {}
            }
        case FETCH_BOARD_FAILURE:
            return {
                ...state,
                data: [],
                error: { ...action.payload }
            }
       
        default: return state;
    }

}

// const initialStateSingleData = {
//     data: {},
//     error: { status: 400 },

// }

// export const singleBoardReducer = (state = initialStateSingleData, action) => {
    
// };

const initialNewState = {
    data: {},
    error: { status: 400 },

}

export const newBoardReducer = (state = initialNewState, action) => {
    // console.log('--------newBoardReducer------------')
    // console.log(action);
    switch (action.type) {
        case POST_BOARD_REQUEST:
            return {
                ...state
            }

        case POST_BOARD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: {}
            }
        case POST_BOARD_FAILURE:
            return {
                ...state,
                data: [],
                error: { ...action.payload }
            }

        default: return state;
    }

}




// export default {reducer,initalFetchReducer,validateEmailReducer}