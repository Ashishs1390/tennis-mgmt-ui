import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import Login from './../components/login/Login';
import Registration from 'app/components/registration/Registration';
import CompetancyRating from "app/components/competancy_rating/competancy_rating";
import PlayerDevelopmentWrapper from "app/components/PlayerDevelopment/PlayerDevelopmentWrapper";
import ProfilePage from 'app/components/profile/ProfilePage';
import VideoAnalysis from 'app/components/youtube-player/videoanalysiswrapper';
// import StrockAnalysisList from "app/components/strock-analysis-list/strock-analysis-list";
import StrockAnalysisWrapper from "./../components/strock-analysis-list/StrockAnalysisWrapper";
import CompareLibrary from "./../components/compare-library/compare-library";
// import ProfilePageConfig from './../components/profile/ProfilePageConfig'
import LinkPlayer from "./../components/link-player/link-player";
import ValidateRoute from "../shared-components/validateRoute";
const routeConfigs = [ExampleConfig];
import CompetancyAggregation from "../components/CompetancyAggregation/CompetancyAggregation" 

const routes = () => {  
  return [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    element: <Login/>
  },
  {
    path: 'example/:role',
    element: <Navigate to="example" />,
  },
  {
    path: 'registration/:role',
    element:<Registration/>
  },
  {
    path: 'profilepage',
    element:  <ValidateRoute><ProfilePage/></ValidateRoute>
  },
  {
    path: 'videoanalysis/:from',
    element: <ValidateRoute><VideoAnalysis/></ValidateRoute>
  },
  {
    path: "comparelibrary",
    element: <ValidateRoute> <CompareLibrary/> </ValidateRoute>
  },
  {
    path: "assessments",
    element: <ValidateRoute> <CompetancyRating/> </ValidateRoute>
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: 'strockanalysislist',
    element: <ValidateRoute>  <StrockAnalysisWrapper/> </ValidateRoute>
  },
  {
    path: 'playerdevelopment',
    element: <ValidateRoute> <PlayerDevelopmentWrapper/> </ValidateRoute>
  },
  {
    path: 'link/player',
    element: <ValidateRoute> <LinkPlayer/> </ValidateRoute>
    },
    {
      path: 'competancyaggregation',
      element: <ValidateRoute> <CompetancyAggregation /> </ValidateRoute>
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
]};

export default routes;
