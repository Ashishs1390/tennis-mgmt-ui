import { combineReducers } from "redux";

// import searchReducer from './search/searchReducer';
import {
  reducer,
  initalFetchReducer,
  validateEmailReducer,
} from "./basicInfo/basicInfoReducer";
import {
  initalCompetnacyReducer
} from "./competancy/competancyReducer";

import {
  initalPDPReducer,
} from "./player-development/playerDevelopmentReducer";

import { reducer1 as videoAnalysisReducer } from "./videoanalysis/videoAnalysisReducer";

import {
  initalVideoReducer,
  initalCompareReducer
} from "./videoanalysis/videoAnalysisReducer";
import { linkPlayerReducer } from "./link-player/linkPlayerReducer";
import { initalAggrReducer } from "./competancy-aggregation/competancyAggregationReducer";
import { boardReducer, newBoardReducer } from "./boards/boardReducers"

const rootReducer = combineReducers({
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
  boardData: boardReducer,
  newBoardData: newBoardReducer
});

export default rootReducer;
