import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import logger from "morgan";
import chalk from "chalk";

import db from "./db/connection.js";
import testJWTRouter from './controllers/test-jwt'
import usersRouter from './controllers/users'
import profilesRouter from './controllers/profiles'

dotenv.config();
const server = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

server.use('/profiles', profilesRouter);
server.use('/test-jwt', testJWTRouter);
server.use('/users', usersRouter);

app.use("/api", routes)
// Routes go here

db.on("connected", () => {
    console.clear();
    console.log(chalk.blue("Connected to MongoDB!"));
  
    app.listen(PORT, () => {
      console.log(`Express server running on port: ${PORT}`);
    });
  });
