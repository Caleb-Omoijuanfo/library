const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = require('./src/routes/bookRouter');

app.use(morgan('tiny'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// let express know where to accesss static files.
app.use(express.static(path.join(__dirname, '/public/')));

// app.use('/css', express.static(path.join(__dirname, 'index.css')));
app.use('/js', express.static(path.join(__dirname, 'jquery.min.js')));

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render(
    'index', 
    { 
      title: 'Library',
      nav: [
        {
          link: '/books',
          title: 'Books'
        },

        {
          link: '/authors',
          title: 'Authors'
        }
      ]
    }
  );
});

app.listen(port, () => {
  debug(`Express app listening on port ${chalk.green(port)}`);
});
