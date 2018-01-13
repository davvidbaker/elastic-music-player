import { put, takeEvery, takeLatest, select } from 'redux-saga/effects';

import * as actions from './actions';
import songByTitle from './utilities/songByTitle';

function* next() {
  const state = yield select();
  const curTitle = state.currentSong ? state.currentSong.title : null;

  if (curTitle) {
    yield put(actions.pushHistory(curTitle));
  }

  if (state.queue[0]) {
    yield put(actions.play(songByTitle(state.queue[0], state.songList)));
  } else {
    yield put(actions.stop());
  }

  yield put(actions.advanceQueue());
  const queue = yield select(state => state.queue);
  /*
  advanceQueue = () => {
    const nextSong = this.props.queue.length > 0 ? this.props.queue[0] : null;
    if (nextSong) {
      this.props.play(
        this.props.songList.find(song => song.title === nextSong)
      );
    } else {
      this.props.stop();
    }
    this.props.advanceQueue();
  };
  */
  console.log('queue', queue);
}

function* resume() {
  const state = yield select();
  if (!state.currentSong) {
    const songToPlay = songByTitle(state.queue[0], state.songList);
    yield put(actions.play(songToPlay));
    yield put(actions.advanceQueue());
  }
}

// if prev is pressed with less than 1 second, we go to previous song instead of start of current song
function* prev({ sec }) {
  const state = yield select();
  if (sec < 1 && state.history.length > 0) {
    const songToPlay = songByTitle(state.history[0], state.songList);
    yield put(actions.play(songToPlay));
    yield put(actions.popHistory());
  }
}

function* mainSaga() {
  yield takeEvery(actions.PLAYER_NEXT, next);
  yield takeLatest(actions.PLAYER_RESUME, resume);
  yield takeEvery(actions.PLAYER_PREV, prev);
}

export default mainSaga;
