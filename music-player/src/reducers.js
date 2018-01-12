import * as actions from './actions';

export function songList(state = [], action) {
  switch (action.type) {
    case actions.SONG_ADD:
      return [...state, action.details];
    default:
      return state;
  }
}

export function queue(state = [], action) {
  switch (action.type) {
    /** 🔮 maybe change this so it doesn't automatically add new songs to queue */
    case actions.SONG_ADD:
      return [...state, action.details];
    default:
      return state;
  }
}

export function currentSong(state = null, action) {
  switch (action.type) {
    case actions.SONG_ADD:
      return action.details;
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
