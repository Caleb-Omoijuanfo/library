const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:adminRouter');

const bookRouter = express.Router();
// const books = [
//   {
//     title: 'War and Peace',
//     genre: 'Historical Fiction',
//     author: 'Lew Nikolayerich Tolstoy',
//     read: false
//   },
      
//   {
//     title: 'Les Miserables',
//     genre: 'Historical Fiction',
//     author: 'Victor Mugo',
//     read: false
//   },
      
//   {
//     title: 'The Time Machine',
//     genre: 'Science Fiction',
//     author: 'H. G. Wells',
//     read: false
//   },
    
//   {
//     title: 'A Journey into the Center of the Earth',
//     genre: 'Science Fiction',
//     author: 'Jules Verne',
//     read: false
//   },
    
//   {
//     title: 'The Dark World',
//     genre: 'Fantasy',
//     author: 'Kenneth Grahame',
//     read: false
//   },
    
//   {
//     title: 'The Wind in the Willows',
//     genre: 'Fantasy',
//     author: 'Kenneth Grahame',
//     read: false
//   }
// ];

function router(nav) {      
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected successfully to server!');

          const db = client.db(dbName);

          const books = await db.collection('books').find().toArray();                  

          res.render(
            'bookListView', 
            { 
              title: 'Library',
              nav,
              books
            }
          );
        } catch (error) {
          debug(error.stack);
        }

        client.close();
      }());      
    });
        
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected successfully to server!');

          const db = client.db(dbName);

          const book = await db.collection('books').findOne({ _id: new ObjectID(id) });               

          res.render(
            'bookView', 
            { 
              title: 'Library',
              nav,
              book
            }
          );         
        } catch (error) {
          debug(error.stack);
        }

        client.close();
      }());
    });
  return bookRouter;
}

module.exports = router;
