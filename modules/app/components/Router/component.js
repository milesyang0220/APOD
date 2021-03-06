import React from 'react';

import { BackHandler } from 'react-native';

import {
    addNavigationHelpers,
} from 'react-navigation';

import {
    initializeListeners,
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'

import AppNavigator from './components/AppNavigator';

function getCurrentScreen(navigationState) {
    if (!navigationState) {
      return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
      return getCurrentScreen(route)
    }
    return route.routeName
}

export const routerMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.router
)
const addListener = createReduxBoundAddListener('root')

class Router extends React.PureComponent {
    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }
  
    componentDidMount() {
      initializeListeners('root', this.props.router)
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }
  
    backHandle = () => {
      const currentScreen = getCurrentScreen(this.props.router)
      if (currentScreen === 'Login') {
        return true
      }
      if (currentScreen !== 'Home') {
        this.props.dispatch(NavigationActions.back())
        return true
      }
      return false
    }
  
    render() {
      const { dispatch, router } = this.props;
  
      const navigation = addNavigationHelpers({
        dispatch,
        state: router,
        addListener,
      });

      return <AppNavigator navigation={navigation} />
    }
  }
  
export function routerReducer(state, action = {}) {
    return AppNavigator.router.getStateForAction(action, state)
}

export default Router
