export const PLAY_FROM_QUEUE = 'PLAY_FROM_QUEUE';
export const PLAY_FROM_HISTORY = 'PLAY_FROM_HISTORY';
export const PLAYER_LOOP_TOGGLE = 'PLAYER_LOOP_TOGGLE';
export const PLAYER_NEXT = 'PLAYER_NEXT';
export const PLAYER_PREV = 'PLAYER_PREV';
export const PLAYER_RESUME = 'PLAYER_RESUME';
export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_STOP = 'PLAYER_STOP';
export const HISTORY_CLEAR = 'HISTORY_CLEAR';
export const HISTORY_POP = 'HISTORY_POP';
export const HISTORY_PUSH = 'HISTORY_PUSH';
export const HISTORY_REMOVE = 'HISTORY_REMOVE';
export const QUEUE_ADD = 'QUEUE_ADD';
export const QUEUE_ADVANCE = 'QUEUE_ADVANCE';
export const QUEUE_REMOVE = 'QUEUE_REMOVE';
export const QUEUE_CLEAR = 'QUEUE_CLEAR';
export const SONG_ADD = 'SONG_ADD';
export const SONG_RECOVER = 'SONG_RECOVER';
export const SONG_REMOVE = 'SONG_REMOVE';
export const UPLOAD_BEGIN = 'UPLOAD_BEGIN';
export const UPLOAD_COMPLETE = 'UPLOAD_COMPLETE';

export function addSong({ title, artist, album, objectURL }) {
  return {
    type: SONG_ADD,
    details: { title, artist, album, objectURL },
  };
}

export function beginUpload(filename) {
  return {
    type: UPLOAD_BEGIN,
    filename,
  };
}

export function completeUpload(filename) {
  return {
    type: UPLOAD_COMPLETE,
    filename,
  };
}

export function play(song) {
  return {
    type: PLAYER_PLAY,
    song,
  };
}

export function playSongFromHistory(index) {
  return {
    type: PLAY_FROM_HISTORY,
    index,
  };
}

export function playSongFromQueue(index) {
  return {
    type: PLAY_FROM_QUEUE,
    index,
  };
}

export function pause(song) {
  return {
    type: PLAYER_PAUSE,
    song,
  };
}

export function stop() {
  return {
    type: PLAYER_STOP,
  };
}

export function toggleLooping() {
  return {
    type: PLAYER_LOOP_TOGGLE,
  };
}

export function recoverSong(title, objectURL) {
  return {
    type: SONG_RECOVER,
    title,
    objectURL,
  };
}

export function addToQueue(title) {
  return {
    type: QUEUE_ADD,
    title,
  };
}

export function removeFromQueue(index) {
  return {
    type: QUEUE_REMOVE,
    index,
  };
}

export function removeFromHistory(index) {
  return {
    type: HISTORY_REMOVE,
    index,
  };
}

export function advanceQueue() {
  return {
    type: QUEUE_ADVANCE,
  };
}

export function playerNext() {
  return {
    type: PLAYER_NEXT,
  };
}

// sec is how many seconds into song you are
export function playerPrev(sec) {
  return {
    type: PLAYER_PREV,
    sec,
  };
}

export function playerResume() {
  return {
    type: PLAYER_RESUME,
  };
}

export function pushHistory(title) {
  return {
    type: HISTORY_PUSH,
    title,
  };
}

export function popHistory() {
  return {
    type: HISTORY_POP,
  };
}

export function clearHistory() {
  return {
    type: HISTORY_CLEAR,
  };
}

export function clearQueue() {
  return {
    type: QUEUE_CLEAR,
  };
}
