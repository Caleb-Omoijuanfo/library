const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRouter');

const adminRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lew Nikolayerich Tolstoy',
    read: false
  },
      
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Mugo',
    read: false
  },
      
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
    
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
    
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
    
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  }
];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected successfully to server!');

          const db = client.db(dbName);

          const response = db.collection('books').insertMany(books);
          debug(response);
          res.json(response);
        } catch (error) {
          debug(error.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
