const express = require('express');
const exphbs  = require('express-handlebars')
const path =require('path');
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const env = require('dotenv').config()
const homeRoutes = require('./routes/homeRoutes')
const posterRoutes = require('./routes/posterRoutes')
const connectDB = require('./config/db')();
const flash = require('connect-flash')
const app = express();

app.use(flash())
//inital session
const store = new MongoStore({
    collection: 'session',
    uri: process.env.MONGO_URI,
})

//BodyParser
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))


//Set Static folder
app.use(express.static(path.join(process.cwd(),'public')))

//Initial template engines
app.engine('.hbs',exphbs.engine({extname: '.hbs'}))
app.set('view engine','.hbs')

//Initial Routes
app.use('/',homeRoutes);
app.use('/posters',posterRoutes)
app.use('/auth',require('./routes/authRoutes'))
app.use('/profile',require('./routes/profileRoutes'))
const PORT  = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})  