import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import  userRoutes  from "./Routes/UserRoutes"
import  postRoutes  from "./Routes/PostRoutes"




    // create express app
    const app = express()
    app.use(bodyParser.json())

    app.use('/users',userRoutes)
    app.use('/posts',postRoutes)

    process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });


    // start express server
    app.listen(3000)


    console.log("Express server has started ")
