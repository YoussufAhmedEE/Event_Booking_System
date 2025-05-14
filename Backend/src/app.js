const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const passport = require("passport");
/****************************************** */
const { PORT }= require('./config/index.js'); // Port of the server
const {db} = require('./config/database');
const { ErrorMiddleware } = require('./middlewares/errors.middlewares.js');
const associations = require('./models/associations.js');
/******************************************** */
const {authRouter}= require('./routes/authentication.router.js');
const {eventRouter} =require('./routes/event.router.js');
const {bookingRouter}=require('./routes/booking.router.js')
const {tagRouter}=require('./routes/tag.router.js')
const {imageRouter} =require('./routes/image.router.js')
class App {
    constructor() {
        this.app = express();
        this.port = PORT;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("=================================");
            console.log(`🚀 App is listening on the port: ${this.port}`);
            console.log("=================================");
        });
    }

    async connectToDatabase() {
        try {
                await db.authenticate();     // Test the database connection 
                console.log('Connection to the database has been established successfully.');
                db.sync({ alter: true}) 
                console.log('Database synchronization complete.');
        } catch (error) {
                console.error('Unable to connect to the database:', error);
        }
    }

    initializeMiddlewares() {
        this.app.use(morgan('dev'));    // a middleware that logs the request details
        this.app.use(express.json());   // a middleware that used to parse json requests
        this.app.use(cookieParser());   // a middleware used to parse cookies
        this.app.use(cors({
            origin: "http://localhost:8000", //Port of Frontend 
            credentials: true, 
        })); // a middleware that alow cors (requests from other hosts )

        this.app.use((req,res,next)=> {    // next() should be provided in order to go to next middleware
            console.log("we got request from the client:\n", req.method,"\n", req.path);
            next();
        })

    this.app.use(passport.initialize());
    }

    initializeRoutes(){
        this.app.use('/api/auth', authRouter); // Authentication routes
        this.app.use('/api/event', eventRouter); // event routes
        this.app.use('/api/booking', bookingRouter); // booking routes
        this.app.use('/api/tag', tagRouter); // tag routes
        this.app.use('/api/image', imageRouter); // tag routes





    }

    initializeErrorHandling() {
        this.app.use(ErrorMiddleware);
    }

}

module.exports = { App };