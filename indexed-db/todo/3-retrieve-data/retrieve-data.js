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

    // Retrieve 'tasks'
    var Task = transaction.objectStore(TASK_TABLE);
    Task.get(1).onsuccess = function(e) {
      console.log('Result: ', e.target.result);
    };

    // Get All 'tasks'
    Task.openCursor().onsuccess = function(e) {
      var cursor = e.target.result;

      if (cursor) {
        console.log('Results: ', cursor.value);

        tr = document.createElement('TR');
        tr.innerHTML = '<td>'+ cursor.value.id +'</td>' +
          '<td>'+ cursor.value.title +'</td>' +
          '<td>'+ cursor.value.description +'</td>';
        tbody[0].appendChild(tr);

        cursor.continue(); // iterate again
      }

    };
    // end of Retrieving 'tasks'

    // Retrieve 'users'
    var User = transaction.objectStore(USER_TABLE);
    User.get(1).onsuccess = function(e) {
      console.log('Result: ', e.target.result);
    };

    // Get All 'users'
    User.openCursor().onsuccess = function(e) {
      var cursor = e.target.result;

      if (cursor) {
        console.log('Results: ', cursor.value);

        tr = document.createElement('TR');
        tr.innerHTML = '<td>'+ cursor.value.id +'</td>' +
          '<td>'+ cursor.value.first_name +'</td>' +
          '<td>'+ cursor.value.last_name +'</td>';
        tbody[1].appendChild(tr);

        cursor.continue(); // iterate again
      }

    };
    // end of Retrieving 'users'
  };

  document.addEventListener('onDBReady', on_ready);
})();
