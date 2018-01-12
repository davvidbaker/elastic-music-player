export const UPLOAD_BEGIN = 'UPLOAD_BEGIN';
export const UPLOAD_COMPLETE = 'UPLOAD_COMPLETE';
export const SONG_ADD = 'SONG_ADD';
export const SONG_REMOVE = 'SONG_REMOVE';

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
