var db;
(function(){

    //open the DB 
    const request = indexedDB.open('HomeDB', 1);

    //could not open db
    request.onerror = (event) => {
        console.error(`DB error: ${event.target.errorCode}`);
    };
    
    //initialize objects stores and indexes
    request.onupgradeneeded = (event) => {
        db = event.target.result;
        //create the object names
        let store = db.createObjectStore('Names', {
            autoIncrement: true
        });
    }

    //handle success case when db is open
    request.onsuccess = (event) => {
        db = event.target.result;
        //insertName(db, {
        //    name: 'annika', password: "12"
        //});
        //getName(db, 1);
    }
    //function that insert the name into the DB


})();