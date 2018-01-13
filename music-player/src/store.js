import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './reducers';
import mainSaga from './sagas';
import { loadState, saveState } from './utilities/localStorage';

// This is so we can use the redux dev tools chrome extension.
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})) ||
  compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const persistedState = loadState();

const rootReducer = combineReducers(reducers);
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mainSaga);

store.subscribe(() => {
  const state = store.getState();
  const { filesUploaded, songList, currentSong, queue, history } = state;

  saveState({
    currentSong,
    filesUploaded,
    songList,
    queue,
    history,
  });
});

export default store;
