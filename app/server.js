const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user.routes");
const teamRouter = require("./routes/team.routes");
const application = require("./routes/application.routes");

const app = express();

var corsOptions = {
  origin: "https://aptimus-fe.vercel.app/", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
userRouter(app);
teamRouter(app);
application(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
