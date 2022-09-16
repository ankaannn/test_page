var db;
(function(){

    //open the DB 
    const request = indexedDB.open('MyDB', 1);

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

function getName(db, id){
    const txn= db.transaction('Names', 'readonly');
    const store = txn.objectStore('Names')
    let query = store.get(id);
    query.onsuccess = (event) => {
        if(!event.target.result){
            console.log(`The name with ${id} not found`)
        }
        else{
            console.table(event.target.result);
        }

    };
    query.onerror = (event) => {
        console.log(event.target.errorCode);
    };
    txn.oncomplete = function(){
        db.close();
    };

};


function insertName(name){
    //create a new transaction
    const txn = db.transaction('Names', 'readwrite');
    //get the Names object store 
    const store = txn.objectStore('Names');
    let query = store.put({name: name});
    //handle success case
    query.onsuccess = function (event) {
        console.log(event);
    };
    //handle error case
    query.onerror = function (event) {
        console.log(event.target.errorCode);
    };
    //close DB 
    //txn.oncomplete = function(){
    //    db.close(); 
    //};
}

function get_name_from_inputbox(){
    //take the value from the input tag
    let input = document.getElementById("inputfield").value
    insertName(input);
}