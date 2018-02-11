class Database{

    constructor() {

        var mongodbHost = 'ds229448.mlab.com';  //host
        var mongodbPort = '29448';              //port
        var authenticate = 'user:user@';        //id/password
        var mongodbDatabase = 'chatroom';          //table to use

        this.MongoClient = require('mongodb').MongoClient;
        this.url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;  //connection string
    }

    insertMessage(new_text) {       //save sended message to db

        this.MongoClient.connect(this.url, function (err, database) {

            const actual_db = database.db('chatroom')
            actual_db.collection('table', function (err, collection) {

                collection.insert({text: new_text });

                actual_db.collection('table').count(function (err, count) {

                    if (err) throw err;
                    //console.log('Total Rows: ' + count);

                });

            });

        });
    }

    dropTable() {   //delete all chatroom history
        this.MongoClient.connect(this.url, function (err, database) {

            const actual_db = database.db('chatroom')
            actual_db.collection('table', function (err, collection) {

                collection.drop();

                actual_db.collection('table').count(function (err, count) {

                    if (err) throw err;
                    console.log('Total Rows: ' + count);

                });

            });

        });
    }

    printContent(){     //function for maintenance, display on console all table content
        this.MongoClient.connect(this.url, function (err, database) {

            const actual_db = database.db('chatroom')
            actual_db.collection('table', function (err, collection) {

                collection.find().toArray(function (err, docs) {
                    if (err) throw err;
                    docs.forEach(function (doc) {
                        console.log(   // 'id: ' + doc['id'] +
                                        ' text: ' + doc['text']
                                    );
                    });
                });
            });
        });
    }
}

module.exports = Database;










