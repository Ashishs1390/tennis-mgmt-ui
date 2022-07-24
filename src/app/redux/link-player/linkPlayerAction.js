import {
  SEARCH_PLAYER_EMAIL,
  SEARCH_PLAYER_EMAIL_SUCCESS,
  SEARCH_PLAYER_EMAIL_FAILURE,
  SELECTED_PLAYER_LINK,
  SELECTED_PLAYER_LINK_SUCCESS,
  SELECTED_PLAYER_LINK_FAILURE,
  FETCH_PLAYER_EMAIL_LIST,
  FETCH_PLAYER_EMAIL_LIST_SUCCESS,
  FETCH_PLAYER_EMAIL_LIST_FAILURE,
  FETCH_PLAYER_EMAIL_LIST_NEW,
  FETCH_PLAYER_EMAIL_LIST_SUCCESS_NEW,
  FETCH_PLAYER_EMAIL_LIST_FAILURE_NEW,
  SELECTED_PLAYER_EMAIL_LIST_ADD,
  SELECTED_PLAYER_EMAIL_LIST_REMOVE,
  SELECTED_PLAYER_EMAIL_LIST_ADDALL,
  SELECTED_PLAYER_EMAIL_LIST_REMOVEALL,
} from "./linkPlayerActionsTypes";

import { get, post,put } from "../../api/axios.api";

export const searchedEmail = (searchEmail) => {
  return {
    type: SEARCH_PLAYER_EMAIL,
    payload: searchEmail
  };
};

export const searchedEmailSuccess = () => {
  return {
    type: SEARCH_PLAYER_EMAIL_SUCCESS,
  };
};

export const searchedEmailFailure = (payload) => {
  return {
    type: SEARCH_PLAYER_EMAIL_FAILURE,
    payload
  };
};

export const getSearchedPlayerByEmail = (searchEmail) => {
  return (dispatch) => {
    dispatch(searchedEmail(searchEmail));
    get(`/api/tennismgmt/linktoplayer`, { params: { email: searchEmail } })
      .then((response) => {
        dispatch(searchedEmailSuccess(response.data.data));
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(searchedEmailFailure(error.response.data.errMsg + " with email " +searchEmail));
      });
  };
};


export const fetchPlayerList = () => {
  return {
    type: FETCH_PLAYER_EMAIL_LIST,
  };
};

export const fetchPlayerListSuccess = (linkedPlayersList) => {
  return {
    type: FETCH_PLAYER_EMAIL_LIST_SUCCESS,
    payload: linkedPlayersList,
  };
};

export const fetchPlayerListFailure = () => {
  return {
    type: FETCH_PLAYER_EMAIL_LIST_FAILURE,
  };
};


export const fetchPlayerListNew = () => {
  return {
    type: FETCH_PLAYER_EMAIL_LIST_NEW,
  };
};

export const fetchPlayerListSuccessNew = (linkedPlayersList) => {
  return {
    type: FETCH_PLAYER_EMAIL_LIST_SUCCESS_NEW,
    payload: linkedPlayersList,
  };
};

export const fetchPlayerListFailureNew = () => {
  return {
    type: FETCH_PLAYER_EMAIL_LIST_FAILURE_NEW,
  };
};

export const fetchLinkedPlayerList = (searchEmail) => {
  return (dispatch) => {
    dispatch(fetchPlayerList(searchEmail));
    get(`/api/tennismgmt/linktoplayer`)
      .then((response) => {
        dispatch(fetchPlayerListSuccess(response.data.data));
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(fetchPlayerListFailure(error.response.errMsg));
      });
  };
};

export const fetchLinkedPlayerListNew = (searchEmail) => {
  return (dispatch) => {
    dispatch(fetchPlayerListNew(searchEmail));
    get(`/api/tennismgmt/linktoplayer/new`)
      .then((response) => {
        dispatch(fetchPlayerListSuccessNew(response.data.data));
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(fetchPlayerListFailureNew(error.response.errMsg));
      });
  };
};


export const addPlayer = () => {
  return {
    type: SELECTED_PLAYER_LINK,
  };
};

export const addedPlayerSuccess = (payload) => {
  return {
    type: SELECTED_PLAYER_LINK_SUCCESS,
    payload
  };
};

export const addPlayerFailure = () => {
  return {
    type: SELECTED_PLAYER_LINK_FAILURE,
  };
};

export const addPlayerToList = (details) => {
  return (dispatch) => {
    dispatch(addPlayer());
    put(`/api/tennismgmt/linktoplayer`, { ...details })
      .then((response) => {
          dispatch(addedPlayerSuccess(response.data.data[0]));
          dispatch(fetchLinkedPlayerListNew(''));
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(addPlayerFailure(error.response.data.errMsg));
      });
  };
};

export const selectedEmailAdd = (selectedEmail) => {
  return {
    type: SELECTED_PLAYER_EMAIL_LIST_ADD,
    payload: selectedEmail
  };
};

export const selectedEmailRemove = (selectedEmail) => {
  return {
    type:   SELECTED_PLAYER_EMAIL_LIST_REMOVE,
    payload: selectedEmail
  };
};

export const selectedEmailAddAll = () => {
  return {
    type: SELECTED_PLAYER_EMAIL_LIST_ADDALL,
  };
};

export const selectedEmailRemoveAll = () => {
  return {
    type: SELECTED_PLAYER_EMAIL_LIST_REMOVEALL,
  };
};