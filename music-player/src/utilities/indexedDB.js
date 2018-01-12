function initiateDB() {
  return new Promise((resolve, reject) => {
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;

    const IDBTransaction =
      window.IDBTransaction ||
      window.webkitIDBTransaction ||
      window.msIDBTransaction;

    const IDBKeyRange =
      window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    let db, objectStore, songObjectStore;

    // open version 1 of our database
    const openRequest = indexedDB.open('songs', 1);

    // these two event handlers act on the database being opened
    // successfully, or not
    openRequest.onerror = function(event) {
      alert('Error loading database');
    };

    openRequest.onsuccess = function(event) {
      console.log('Database initialised.');

      // store the result of opening the database in the db
      // variable. This is used a lot later on, for opening
      // transactions and suchlike.
      db = openRequest.result;
      console.log('db', db);
      resolve(db);
    };

    openRequest.onupgradeneeded = function(event) {
      console.log('upgrade needed');
      db = event.target.result;

      objectStore = db.createObjectStore('songs', { keyPath: 'title' });
      // Create an index to search customers by name. We may have duplicates
      // so we can't use a unique index.
      // objectStore.createIndex("name", "name", { unique: false });
    };
    /* var indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  // Open (or create) the database
  var open = indexedDB.open('MyDatabase', 1);

  // Create the schema
  open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore('MyObjectStore', { keyPath: 'id' });
    var index = store.createIndex('NameIndex', ['name.last', 'name.first']);
  };

  open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction('MyObjectStore', 'readwrite');
    var store = tx.objectStore('MyObjectStore');
    var index = store.index('NameIndex');

    // Add some data
    store.put({ id: 12345, name: { first: 'John', last: 'Doe' }, age: 42 });
    store.put({ id: 67890, name: { first: 'Bob', last: 'Smith' }, age: 35 });

    // Query the data
    var getJohn = store.get(12345);
    var getBob = index.get(['Smith', 'Bob']);

    getJohn.onsuccess = function() {
      console.log(getJohn.result.name.first); // => "John"
    };

    getBob.onsuccess = function() {
      console.log(getBob.result.name.first); // => "Bob"
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
      // db.close();
    };
  }; */
  });
}

export default initiateDB;
