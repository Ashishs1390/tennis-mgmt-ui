import {
    FETCH_ACADEMY_REQUEST, FETCH_ACADEMY_SUCCESS, FETCH_ACADEMY_FAILURE
} from "./academyTypes";

const initialState = {
    data: {},
    error: { status: 400 },

}



export const academyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACADEMY_REQUEST:
            return {
                ...state
            }

        case FETCH_ACADEMY_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: {}
            }
        case FETCH_ACADEMY_FAILURE:
            return {
                ...state,
                data: [],
                error: { ...action.payload }
            }

        default: return state;
    }

}
