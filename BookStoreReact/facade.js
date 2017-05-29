var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var url = 'mongodb://127.0.0.1/booksdb'
var autoIncrement = require("mongodb-autoincrement");
var bcrypt = require("bcrypt")

function getBooks(callback){
    MongoClient.connect(url, function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("books").find({}).toArray(function(err,data){
            assert.equal(null,err)
            var books = data
            callback(books)
            db.close()
        })
    })
}

function addBook(book, callback){
    console.log(book)
    MongoClient.connect(url, function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("books").count({}, function(err,number){
            assert.equal(null,err)
            book.id = number +1
            db.collection("books").insertOne(book, function(err,resualt){
                assert.equal(null,err)
                var insertedBook = resualt.ops[0]
                callback(insertedBook)
                })

        })
    })
}

function deleteBook(bookId, callback){
    MongoClient.connect(url, function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("books").deleteOne({id: bookId}, function(err,data){
            assert.equal(null,err)
            var response = data
            callback(response)
        })
    })
}

function updateBook(book,callback){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("books").updateOne({id: book.id},
                    {$set: {"title": book.title, "info": book.info, "moreinfo": book.moreinfo}},
                            function(err,data){
                            assert.equal(null,err)
                            var updatedBook = data
                            callback(updateBook)
                            })
    })
}

var facade = {
    getBooks: getBooks,
    addBook : addBook,
    deleteBook : deleteBook,
    updateBook : updateBook,
    setURL: setURL,
    createNewUser : createNewUser,
    login : login,
    findUserByName: findUserByName
}


function setURL(newURL){
    url = newURL
}

function createNewUser(username, password, callback){
    // hashing and salting the password
    let hash = bcrypt.hashSync(password,10) // 10 is rounds use when creating an salt!
    MongoClient.connect(url, function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("users").insertOne({username:username, password:hash}, function(err,data){
            assert.equal(null,err)
            var result = data.ops[0]
            callback(result)
        })
    })
}

function findUserByName(username,callback){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("users").findOne({username:username}, function(err,data){
            assert.equal(null,err)
            user = data
            callback(user)
        })
    })
}

function login(username,password,callback){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("users").findOne({username:username}, function(err,data){
            if(data == null){
             callback({user:null, succes:false})
             return
            }
            user = data
            if(bcrypt.compareSync(password, user.password)){
                callback({user: user, succes:true})
            }
            else{
                console.log("Authentication Failed")
                callback({user:null, succes:false})
            }
        }) 
    })
}


module.exports = facade
