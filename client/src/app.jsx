import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/usersReducer';
import rolesReducer from './reducers/rolesReducer';
import tasksReducer from './reducers/tasksReducer';
import participantsReducer from './reducers/participantsReducer';
import Main from './components/Main';
import Auth from './containers/AuthContainer';
import UsersContainer from './containers/UsersContainer';
import TasksContainer from './containers/TasksContainer';
import ReadyForTestContainer from './containers/ReadyForTestContainer';
import { authenticate } from './actions/authActions';
import constants from './constants/constants';

import './styles/style.scss';
import './index.html';

const cssQuickDraw = combineReducers({
  auth: authReducer,
  users: usersReducer,
  roles: rolesReducer,
  tasks: tasksReducer,
  participants: participantsReducer,
});
let store = createStore(
  cssQuickDraw,
  applyMiddleware(thunkMiddleware)
);

function requireAuth(nextState, replace) {
  if (!store.getState().auth.get('signedIn')) {
    replace({
      pathname: '/auth/signin',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function requireAuthAndAdminRole(nextState, replace) {
  if (!store.getState().auth.get('signedIn')) {
    replace({
      pathname: '/auth/signin',
      state: { nextPathname: nextState.location.pathname },
    });
    return;
  }
  if (store.getState().auth.get('user').get('role').get('name') !== constants.ADMIN_ROLE) {
    replace({
      pathname: '/testReady',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function requireUnauth(nextState, replace) {
  if (store.getState().auth.get('signedIn')) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

const authInfo = JSON.parse(localStorage.getItem('auth'));
if (authInfo) {
  store.dispatch(authenticate(authInfo.user, authInfo.token));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRedirect to="/tasks" />
        <Route path="/auth/:action" component={Auth} onEnter={requireUnauth} />
        <Route path="/users" component={UsersContainer} onEnter={requireAuthAndAdminRole} />
        <Route path="/tasks" component={TasksContainer} onEnter={requireAuthAndAdminRole} />
        <Route path="/testReady" component={ReadyForTestContainer} onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
