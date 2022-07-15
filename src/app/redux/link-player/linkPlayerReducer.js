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
  
const initalVideoAnalysisState = {
    searchedPlayer: '',
    loadingSearchedPlayer: false,
    errorSearh: false,
    loadingAddPlayer: false,
    errorAddPlayer: false,
    searchedPlayerList: [],
    loadingSearchedPlayerList: false,
    errorSearhList: false,
    searchedPlayerListNew: [],
    loadingSearchedPlayerListNew: false,
    errorSearhListNew: false,
    selectedPlayerList: [],
}

export const linkPlayerReducer = (state = initalVideoAnalysisState, action)=>{
    switch(action.type){
        case SEARCH_PLAYER_EMAIL: 
            return {
                ...state,
                searchedPlayer: action.payload,
                loadingSearchedPlayer: true
            };
        case SEARCH_PLAYER_EMAIL_SUCCESS: 
            return {
                ...state,
                loadingSearchedPlayer: false,
                errorSearh: null
            };
        case SEARCH_PLAYER_EMAIL_FAILURE: 
            return {
                ...state,
                loadingSearchedPlayer: false,
                errorSearh: action.payload
            };
        case SELECTED_PLAYER_LINK: 
            return {
                ...state,
                loadingAddPlayer: true
            };
        case SELECTED_PLAYER_LINK_SUCCESS: 
            return {
                ...state,
                loadingAddPlayer: false,
                searchedPlayer: '',
                errorAddPlayer: null,
                searchedPlayerList: [...state.searchedPlayerList,action.payload]
            };
        case SELECTED_PLAYER_LINK_FAILURE: 
            return {
                ...state,
                loadingAddPlayer: false,
                errorAddPlayer: action.payload
            };
        case FETCH_PLAYER_EMAIL_LIST: 
            return {
                ...state,
                loadingSearchedPlayerList: true
            };
        case FETCH_PLAYER_EMAIL_LIST_SUCCESS: 
            return {
                ...state,
                searchedPlayerList: action.payload,
                loadingSearchedPlayerList: false,
                errorSearhList: null
            };
        case FETCH_PLAYER_EMAIL_LIST_FAILURE: 
            return {
                ...state,
                loadingSearchedPlayerList: false,
                errorSearhList: action.payload
            };

        case FETCH_PLAYER_EMAIL_LIST_NEW: 
            return {
                ...state,
                loadingSearchedPlayerListNew: true
            };
        case FETCH_PLAYER_EMAIL_LIST_SUCCESS_NEW: 
            return {
                ...state,
                searchedPlayerListNew: action.payload,
                loadingSearchedPlayerListNew: false,
                errorSearhListNew: null
            };
        case FETCH_PLAYER_EMAIL_LIST_FAILURE_NEW: 
            return {
                ...state,
                loadingSearchedPlayerListNew: false,
                errorSearhListNew: action.payload
            };

        case SELECTED_PLAYER_EMAIL_LIST_ADD: 
            return {
                ...state,
                selectedPlayerList: [...state.selectedPlayerList, action.payload]
            };
        case SELECTED_PLAYER_EMAIL_LIST_REMOVE:
            return {
                ...state,
                selectedPlayerList: state.selectedPlayerList.filter(x => x !== action.payload)
            };
        case SELECTED_PLAYER_EMAIL_LIST_ADDALL:
            return {
                ...state,
                selectedPlayerList: state.searchedPlayerListNew.map(x => x.email)
            };
        case SELECTED_PLAYER_EMAIL_LIST_REMOVEALL:
            return {
                ...state,
                selectedPlayerList: []
            };
        default: return state;
    }

}


