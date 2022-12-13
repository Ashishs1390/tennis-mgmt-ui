import { get, post } from "./../../api/axios.api";

import {
    FETCH_ACADEMY_REQUEST, FETCH_ACADEMY_SUCCESS, FETCH_ACADEMY_FAILURE
} from './academyTypes'

export const fetchAcademySuccess = (data) => {
    return {
        type: FETCH_ACADEMY_SUCCESS,
        payload: data
    }
}

const fetchAcademyFailure = (error) => {
    return {
        type: FETCH_ACADEMY_FAILURE,
        payload: error
    }
}

export const getAcademyData = () => {
    return (dispatch) => {
        get(`/api/tennismgmt/academy`)
            .then((response) => {
                console.log(response.data, "---------------------board")
                dispatch(fetchAcademySuccess({ ...response.data.data }));

            })
            .catch((error) => {
                console.log(error.response.data)
                dispatch(fetchAcademyFailure(error.response.data));
            });
    }
}

