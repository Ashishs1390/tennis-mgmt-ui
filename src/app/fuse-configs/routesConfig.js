import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import Login from './../components/login/Login';
import Registration from 'app/components/registration/Registration';
// import CompetancyAggregationWrapper from "app/components/competancy_rating/CompetancyWrapper";
import PlayerDevelopmentWrapper from "app/components/PlayerDevelopment/PlayerDevelopmentWrapper";
import ProfilePage from 'app/components/profile/ProfilePage';
import VideoAnalysis from 'app/components/youtube-player/videoanalysiswrapper';
// import StrockAnalysisList from "app/components/strock-analysis-list/strock-analysis-list";
import StrockAnalysisWrapper from "./../components/strock-analysis-list/StrockAnalysisWrapper";
import CompareLibrary from "./../components/compare-library/compare-library";
// import ProfilePageConfig from './../components/profile/ProfilePageConfig'
import LinkPlayerWrapper from "./../components/link-player/LinkPlayerWrapper";
import ValidateRoute from "../shared-components/validateRoute";
import ContactsApp from "./../components/link-player/contacts/ContactsApp";
import Pricing from "./../components/pricing/pricing";
const routeConfigs = [ExampleConfig];
import CompetancyAggregationWrapper from "../components/CompetancyAggregation/CompetancyAggregationWrapper"
import CompetancyAssessmentWrapper from "../components/competancy_rating/CompetancyWrapper"

const routes = () => {
  return [
    // if you want to make whole app auth protected by default change defaultAuth for example:
    // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
    // The individual route configs which has auth option won't be overridden.
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    {
      path: "/",
      element: < Navigate to="login" ></Navigate>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: 'example/:role',
      element: <Navigate to="example" />,
    },
    {
      path: 'registration/:role',
      element: <Registration />
    },
    {
      path: 'profilepage',
      element: <ValidateRoute><ProfilePage /></ValidateRoute>
    },
    {
      path: 'videoanalysis/:from',
      element: <ValidateRoute><VideoAnalysis /></ValidateRoute>
    },
    {
      path: "comparelibrary",
      element: <ValidateRoute> <CompareLibrary /> </ValidateRoute>
    },
    {
      path: "assessments",
      element: <ValidateRoute> <CompetancyAssessmentWrapper /> </ValidateRoute>
    },
    {
      path: 'loading',
      element: <FuseLoading />,
    },
    {
      path: 'strockanalysislist',
      element: <ValidateRoute>  <StrockAnalysisWrapper /> </ValidateRoute>
    },
    {
      path: 'playerdevelopment',
      element: <ValidateRoute> <PlayerDevelopmentWrapper /> </ValidateRoute>
    },
    {
      path: 'link/player',
      element: <ValidateRoute> <LinkPlayerWrapper /> </ValidateRoute>
    },
    {
      path: 'competancyaggregation',
      element: <ValidateRoute> <CompetancyAggregationWrapper /> </ValidateRoute>
    }, {
      path: 'contact',
      element: <ValidateRoute> <ContactsApp /> </ValidateRoute>
    },
    {
    path: 'pricing',
      element: <ValidateRoute> <Pricing /> </ValidateRoute>
    },

    {
      path: '404',
      element: <Error404Page />,
    },
    {
      path: '*',
      element: <Navigate to="404" />,
    },
  ]
};

export default routes;
