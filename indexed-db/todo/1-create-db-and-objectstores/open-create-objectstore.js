// References:
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

;(function(){
  console.log('open-create-objectstore.js');
// In the following line, you should include the prefixes of implementations you want to test.
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  // DON'T use "var indexedDB = ..." if you're not in a function.
  // Moreover, you may need references to some window.IDB* objects:
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

  if (!indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    return;
  }

  // Custom Events
  var onDBReady = document.createEvent('Event');
  onDBReady.initEvent('onDBReady'); // on indexed db is opened

  // Let us open our database
  var DB_NAME = 'todo';
  var USER_TABLE = 'users';
  var TASK_TABLE = 'tasks';
  var request = indexedDB.open(DB_NAME, VERSION);

  request.onerror = function(event) {
    console.log('IndexedDB is not allowed.')
  };
  request.onsuccess = function(event) {
    console.log('Connected to DB successfully.')
    window.db = request.result;

    db.onerror = function(e) {
      console.error('Database error: ', e.target.errorCode);
    };

    document.dispatchEvent(onDBReady); // fire 'onDBReady' listeners
  };
  request.onupgradeneeded = function(e) {
    var db = event.target.result;

    // Create an object store or db.TABLE
    if (! db.objectStoreNames.contains(TASK_TABLE)) {
      // Create `tasks` table
      var objectStore = db.createObjectStore(TASK_TABLE, {
        keyPath: 'id',
        autoIncrement: true
      });
    }

    if (! db.objectStoreNames.contains(USER_TABLE)) {
      // Create `users` table
      var objectStore = db.createObjectStore(USER_TABLE, {
        keyPath: 'id',
        autoIncrement: true
      });
    } else if (e.oldVersion < 2) {
      // create index
      // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore.createIndex
      var objectStore = request.transaction.objectStore(USER_TABLE);
      objectStore.createIndex('name', 'first_name', {unique: false});
    }
  };
})();
