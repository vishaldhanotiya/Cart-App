import * as React from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';


export const navigationRef = React.createRef();
export const isMountedRef = React.createRef();
let navigation = navigationRef.current;
function setTopLevelNavigator(navigatorRef) {
  navigation = navigatorRef;
}

function navigate(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
  
    navigationRef.current?.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
}

const navigateToClearStack = (state) => {
  if (isMountedRef.current && navigationRef.current) {

    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: state}],
      }),
    );
  }
};

const navigateToStack = (state) => {
  const routes = state.filter((r) => r.name !== 'Home');
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: routes.length - 1,
        routes,
      }),
    );
  }
};
const navigateStack = (state) => {
  const routes = state.filter((r) => r.name !== 'Homes');
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: routes.length - 1,
        routes,
      }),
    );
  }
};
const popFromStack = (count) => {
  const popAction = StackActions.pop(count);
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(popAction);
  }
};
const pushToStack = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.push(name, params));
  }
};

const pushToStackHome = (id) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  }
};

function goBack() {
  if (isMountedRef.current && navigationRef.current) {

    navigationRef.current?.dispatch(CommonActions.goBack());
  }
}

export default {
  navigate,
  setTopLevelNavigator,
  navigateToClearStack,
  goBack,
  navigateToStack,
  popFromStack,
  pushToStack,
  pushToStackHome,
  navigateStack,
};
