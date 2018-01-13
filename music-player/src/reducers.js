import * as actions from './actions';

export function songList(state = [], action) {
  switch (action.type) {
    case actions.SONG_ADD:
      return [...state, action.details];
    case actions.SONG_RECOVER:
      return state.map(
        song =>
          song.title !== action.title
            ? song
            : { ...song, objectURL: action.objectURL }
      );
    default:
      return state;
  }
}

// The queue only holds the song titles, the rest of the information is in the songList.
export function queue(state = [], action) {
  switch (action.type) {
    case actions.QUEUE_ADD:
      return [...state, action.title];

    case actions.QUEUE_ADVANCE:
      return state.slice(1);

    case actions.QUEUE_CLEAR:
      return [];

    case actions.QUEUE_REMOVE:
      // const indexToRemove = state.findIndex(title => title === action.title);
      return state.filter((_title, index) => index !== action.index);

    default:
      return state;
  }
}

// The history only holds the song titles, the rest of the information is in the songList.
export function history(state = [], action) {
  switch (action.type) {
    case actions.HISTORY_PUSH:
      return [action.title, ...state];
    case actions.HISTORY_POP:
      return state.slice(1);
    case actions.HISTORY_CLEAR:
      return [];

    default:
      return state;
  }
}

export function currentSong(state = null, action) {
  switch (action.type) {
    case actions.PLAYER_PLAY:
      console.log('action', action);
      return action.song ? action.song : state;

    case actions.SONG_RECOVER:
      return state && action.title === state.title
        ? { ...state, objectURL: action.objectURL }
        : state;

    case actions.PLAYER_STOP:
      return null;

    default:
      return state;
  }
}

export function filesUploading(state = [], action) {
  switch (action.type) {
    case actions.UPLOAD_BEGIN:
      return [...state, action.filename];
    case actions.UPLOAD_COMPLETE:
      return state.filter(filename => filename !== action.filename);
    default:
      return state;
  }
}

export function filesUploaded(state = [], action) {
  switch (action.type) {
    case actions.UPLOAD_COMPLETE:
      return [...state, action.filename];
    default:
      return state;
  }
}

export function playing(state = false, action) {
  switch (action.type) {
    case actions.PLAYER_PLAY:
    case actions.PLAYER_RESUME:
      return true;

    case actions.PLAYER_STOP:
    case actions.PLAYER_PAUSE:
      return false;

    default:
      return state;
  }
}

/**
 * 3 states for looping:
 *
 * 0: don't repeat
 * 1: repeat queue
 * 2: repeat track
 */
export function looping(state = 0, action) {
  switch (action.type) {
    case actions.PLAYER_LOOP_TOGGLE:
      return (state + 1) % 3;

    default:
      return state;
  }
}
