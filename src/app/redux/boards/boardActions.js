import { get, post } from "./../../api/axios.api";

import {
    FETCH_BOARD_REQUEST, FETCH_BOARD_SUCCESS, FETCH_BOARD_FAILURE,
    POST_BOARD_REQUEST, POST_BOARD_SUCCESS, POST_BOARD_FAILURE
} from './boardTypes'

export const fetchBoardSuccess = (data) => {
    return {
        type: FETCH_BOARD_SUCCESS,
        payload: data
    }
}

const fetchBoardFailure = (error) => {
    return {
        type: FETCH_BOARD_FAILURE,
        payload: error
    }
}

export const getBoardData = () => {
    return (dispatch) => {
        get(`/api/tennismgmt/boards`)
            .then((response) => {
                console.log(response.data,"---------------------board")
                dispatch(fetchBoardSuccess([...response.data.data ]));

            })
            .catch((error) => {
                console.log(error.response.data)
                dispatch(fetchBoardFailure(error.response.data));
            });
    }
}



export const postBoardSuccess = (data) => {
    return {
        type: POST_BOARD_SUCCESS,
        payload: data
    }
}

const postBoardFailure = (error) => {
    return {
        type: POST_BOARD_FAILURE,
        payload: error
    }
}

export const postBoardData = () => {
    return (dispatch) => {
        post(`/api/tennismgmt/boards/newboard`, { board_name: "Untitled Board"})
            .then((response) => {
                console.log('-----------postBoardData------------')
                console.log(response);
                dispatch(postBoardSuccess({ ...response.data.data }));

            })
            .catch((error) => {
                console.log(error)
                dispatch(postBoardFailure(error.response.data));
            });
    }
}