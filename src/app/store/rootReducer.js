import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import {
  reducer,
  initalFetchReducer,
  validateEmailReducer,
} from "./../redux/basicInfo/basicInfoReducer";
import { reducer1 as videoAnalysisReducer } from "./../redux/videoanalysis/videoAnalysisReducer";


import {
  initalCompetnacyReducer
} from "./../redux/competancy/competancyReducer";

import {
  initalPDPReducer,
} from "./../redux/player-development/playerDevelopmentReducer";


import {
  initalVideoReducer,
  initalCompareReducer
} from "./../redux/videoanalysis/videoAnalysisReducer";
import { linkPlayerReducer } from "./../redux/link-player/linkPlayerReducer";
import { initalAggrReducer } from "./../redux/competancy-aggregation/competancyAggregationReducer";


const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    fuse,
    i18n,
    registration: reducer,
    getData: initalFetchReducer,
    emailValidation: validateEmailReducer,
    videoAnalysis: videoAnalysisReducer,
    videoInfo: initalVideoReducer,
    videoCompare: initalCompareReducer,
    competancy: initalCompetnacyReducer,
    personalDevelopment: initalPDPReducer,
    linkPlayerReducer: linkPlayerReducer,
    aggregatedCompData: initalAggrReducer,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'auth/user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
