;(function(){
  console.log('add-data.js')

  var TASK_TABLE = 'tasks'; // table or objectStore
  var USER_TABLE = 'users'; // table or objectStore
  var task_data = [{
      title: 'Gaagle',
      description: 'Google like website. A Google clone'
    }, {
      title: 'Yeeha',
      description: 'Yahoo like website. A Yahoo clone.'
    }];
  var user_data = [{
      first_name: 'Nino',
      last_name: 'Paolo'
    }, {
      first_name: 'Wee',
      last_name: 'Louellyn'
    }];

  // Add `tasks`
  var add_tasks = function(e) {
    console.log('add tasks');
    var transaction = db.transaction([TASK_TABLE], 'readwrite');

    // Do something when all the data is added to the database.
    transaction.oncomplete = function(e) {
      console.log("All data were successfully added! > e: ", e);
    };
    transaction.onerror = function(e) {
      console.error("Saving failed! > e: ", e);
    };

    // adding data to `tasks` objectstore
    var objectStore = transaction.objectStore(TASK_TABLE);
    for (var i in task_data) {
      var request = objectStore.add(task_data[i]);
      request.onsuccess = function(e) {
        console.log('Inserted task > id: ', e.target.result);
      };
    }
  };

  // Add `users`
  var add_users = function(e) {
    console.log('add user');
    var transaction = db.transaction([USER_TABLE], 'readwrite');

    // Do something when all the data is added to the database.
    transaction.oncomplete = function(e) {
      console.log("All data were successfully added! > e: ", e);
    };
    transaction.onerror = function(e) {
      console.error("Saving failed! > e: ", e);
    };

    // adding data to `users` objectstore
    var objectStore = transaction.objectStore(USER_TABLE);
    for (var i in user_data) {
      var request = objectStore.add(user_data[i]);
      request.onsuccess = function(e) {
        console.log('Inserted user > id: ', e.target.result);
      };
    }
  };

  document.addEventListener('onDBReady', add_tasks);
  document.addEventListener('onDBReady', add_users);
})();
