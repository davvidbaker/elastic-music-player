import { createStore, compose, combineReducers } from 'redux';

import * as reducers from './reducers';
import { loadState, saveState } from './utilities/localStorage';

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})) ||
  compose;

const persistedState = loadState();

const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer, persistedState, composeEnhancers());

store.subscribe(() => {
  const state = store.getState();
  const { filesUploaded, songList, currentSong, queue } = state;

  saveState({
    currentSong,
    filesUploaded,
    songList,
    queue,
  });
});

export default store;
