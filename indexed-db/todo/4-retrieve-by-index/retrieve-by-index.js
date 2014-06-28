;(function(){
  var TASK_TABLE = 'tasks';
  var USER_TABLE = 'users';

  var tbody = document.getElementsByTagName('tbody');

  var on_ready = function() {
    var transaction = db.transaction([USER_TABLE, TASK_TABLE], 'readwrite');

    // Do something when all the data is added to the database.
    transaction.oncomplete = function(e) {
      console.log("All data were successfully retrieved! > e: ", e);
    };
    transaction.onerror = function(e) {
      console.error("Retrieve failed! > e: ", e);
    };

    // Retrieve 'users'
    var User = transaction.objectStore(USER_TABLE);
    var index = User.index('name');
    // Get All 'users'
    index.get('Wee').onsuccess = function(e) {
      var cursor = e.target.result;

      if (cursor) {
        tr = document.createElement('TR');
        tr.innerHTML = '<td>'+ cursor.id +'</td>' +
          '<td>'+ cursor.first_name +'</td>' +
          '<td>'+ cursor.last_name +'</td>';
        tbody[0].appendChild(tr);
      }

    };
    // end of Retrieving 'users'

    // Retrieve Multiple Results 'users'
    var User = transaction.objectStore(USER_TABLE);
    var boundKeyRange = IDBKeyRange.lowerBound('N', false);
    var index = User.index('name');
    // Get All 'users'
    index.openCursor(boundKeyRange).onsuccess = function(e) {
      var cursor = e.target.result;

      if (cursor) {
        tr = document.createElement('TR');
        tr.innerHTML = '<td>'+ cursor.value.id +'</td>' +
          '<td>'+ cursor.value.first_name +'</td>' +
          '<td>'+ cursor.value.last_name +'</td>';
        tbody[1].appendChild(tr);

        cursor.continue();
      }

    };
    // end of Retrieving 'users'
  };

  document.addEventListener('onDBReady', on_ready);
})();
