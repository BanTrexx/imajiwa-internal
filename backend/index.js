import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js"
import UserRoute from "./routes/UserRoute.js";
import ProjectRoute from "./routes/ProjectRoute.js";
import RoleRoute from "./routes/RoleRoute.js";
import ProjectWorkerRoute from "./routes/ProjectWorkerRoute.js";
dotenv.config();

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
db.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
  }).catch(err => {
    console.error('Error syncing database:', err);
  });

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use(express.json());

app.use(UserRoute);
app.use(ProjectRoute);
app.use(RoleRoute);
app.use(ProjectWorkerRoute);

app.listen(process.env.APP_PORT, () => {
    console.log("App is running on port 5000...");
});