import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import Login from './../components/login/Login';
import Registration from 'app/components/registration/Registration';
import CompetancyRating from "app/components/competancy_rating/competancy_rating";
import PlayerDevelopment from "app/components/PlayerDevelopment/PlayerDevelopment";
import ProfilePage from 'app/components/profile/ProfilePage';
import VideoAnalysis from 'app/components/youtube-player/videoanalysiswrapper';
// import StrockAnalysisList from "app/components/strock-analysis-list/strock-analysis-list";
import StrockAnalysisList from "./../components/strock-analysis-list/strock-analysis-list";
import CompareLibrary from "./../components/compare-library/compare-library";
// import ProfilePageConfig from './../components/profile/ProfilePageConfig'
import LinkPlayer from "./../components/link-player/link-player";
const routeConfigs = [ExampleConfig];


const routes = [
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
    // element: <Navigate to="registration"/>
    element:<Registration/>
  },
  {
    path: 'profilepage',
    element: <ProfilePage/>
  },
  {
    path: 'videoanalysis/:from',
    element: <VideoAnalysis/>
  },
  {
    path: "comparelibrary",
    element:<CompareLibrary/>
  },
  {
    path: "assessments",
    element: <CompetancyRating/>
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: 'strockanalysislist',
    element: <StrockAnalysisList/>
  },
  {
    path: 'playerdevelopment',
    element: <PlayerDevelopment/>
  },
  {
    path: 'link/player',
    element: <LinkPlayer/>
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
