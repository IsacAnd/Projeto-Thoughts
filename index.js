// implementar rota de administrador (vê e exclui usuários)

const express = require('express');
const exphbs = require('express-handlebars');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const flash = require('express-flash')

const app = express();

const conn = require('./db/conn');

// import dos models
const Thought = require('./models/Thought');
const User = require('./models/User');

// import routes
const ThoughtsRoutes = require('./routes/ThoughtsRoutes');
const authRoutes = require('./routes/AuthRoutes');

// import controller
const ThoughtsController = require('./controllers/ThoughtsController');
const AuthController = require('./controllers/AuthController');

// template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// receive response from application body
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

// session middleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

// flash message
app.use(flash());

// public path
app.use(express.static('public'));

// set session to res
app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session
    }

    next();
})

app.use('/thoughts', ThoughtsRoutes);
app.use('/', authRoutes);

app.get('/', ThoughtsController.showThoughts);

conn
// .sync({ force: true })
.sync()
.then(() => {
    app.listen(3000);
})
.catch((error) => {
    console.log(error);
})