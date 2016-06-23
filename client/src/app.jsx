import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/usersReducer';
import rolesReducer from './reducers/rolesReducer';
import tasksReducer from './reducers/tasksReducer';
import Main from './components/Main';
import SignIn from './containers/SignIn';
import UsersContainer from './containers/UsersContainer';
import IndexContainer from './containers/IndexContainer';
import TasksContainer from './containers/TasksContainer';
import { authenticate } from './actions/authActions';

import './styles/style.scss';
import './index.html';

const cssQuickDraw = combineReducers({
  auth: authReducer,
  users: usersReducer,
  roles: rolesReducer,
  tasks: tasksReducer,
});
let store = createStore(
  cssQuickDraw,
  applyMiddleware(thunkMiddleware)
);

function requireAuth(nextState, replace) {
  if (!store.getState().auth.get('signedIn')) {
    replace({
      pathname: '/signin',
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
        <IndexRoute component={IndexContainer} onEnter={requireAuth} />
        <Route path="/signin" component={SignIn} onEnter={requireUnauth} />
        <Route path="/users" component={UsersContainer} onEnter={requireAuth} />
        <Route path="/tasks" component={TasksContainer} onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
