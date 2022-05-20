// import createGenerateClassName from '@mui/styles/createGenerateClassName';
// import jssPreset from '@mui/styles/jssPreset';
// import { create } from 'jss';
// import jssExtend from 'jss-plugin-extend';
// import rtl from 'jss-rtl';
import Provider from 'react-redux/es/components/Provider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import store from './store';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";

const withAppProviders = (Component) => (props) => {
  function WrapperComponent() {
    const [isLoggedIn, setISLoggedIn] = useState(
      Cookies.get("token") == null ? false : true
    );

    useEffect(() => {
      if (isLoggedIn && Cookies.get("token") !== '') {
        setISLoggedIn(true);
      }
    }, [Cookies.get("token")]);
    return <AppContext.Provider
      value={{
        routes: routes(),
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <Component {...props} />
          </StyledEngineProvider>
        </Provider>
      </LocalizationProvider>
    </AppContext.Provider>
  };

  return WrapperComponent;
};

export default withAppProviders;
