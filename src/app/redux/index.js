export { fetchLoginDetails } from "./login/loginActions";
export {
  fetchVideo,
  getCompareVideo,
} from "./videoanalysis/videoAnalysisActions";
export {
  getCompetancy,
  updateCompetancyWeight,
  saveCompetancy,
  emptyCompetancySave,
} from "./competancy/competancyActions";
export {
  getPersonalDevPageInfo,
  getPersonalDevOnDate,
} from "./player-development/playerDevelopmentActions";
export * from "./basicInfo/basicInfoActions";
export {
  getSearchedPlayerByEmail,
  fetchLinkedPlayerList,
  addPlayerToList,
  selectedEmailAdd,
  selectedEmailRemove,
  selectedEmailAddAll,
  selectedEmailRemoveAll,
} from "./link-player/linkPlayerAction";
export { getCompetancyDetails } from "./competancy-aggregation/competancyAggregationAction";

export { getBoardData, postBoardData } from "./boards/boardActions";

export { getAcademyData } from "./academy/academyActions";
