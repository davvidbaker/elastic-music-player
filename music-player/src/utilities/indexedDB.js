function initiateDB() {
  return new Promise((resolve, reject) => {
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;

    let db;

    // open version 1 of our database
    const openRequest = indexedDB.open('songs', 1);

    // these two event handlers act on the database being opened
    // successfully, or not
    openRequest.onerror = function(event) {
      alert('Error loading database');
    };

    openRequest.onsuccess = function(event) {
      // store the result of opening the database in the db
      // variable. This is used a lot later on, for opening
      // transactions and suchlike.
      db = openRequest.result;
      resolve(db);
    };

    openRequest.onupgradeneeded = function(event) {
      db = event.target.result;

      db.createObjectStore('songs', { keyPath: 'title' });
    };
  });
}

export default initiateDB;
