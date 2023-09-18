const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require("./database");
const http = require("http");
const session = require("express-session");
const passport = require("passport");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    method: ["GET", "POST", "DELETE"],
    allowedHeaders: ["custom-header"],
    credentials: true,
  },
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySql");
});

// // Serve the admin GUI built with Vite and React
// app.use(express.static(path.join(__dirname, "admin/dist")));

// // Catch-all route for admin GUI
// app.get("/admin/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "admin/dist/index.html"));
// });

app.use("/images", express.static("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
        callback(null, true);
      } else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes/apiRoutes"));

let connectedUser = [];

io.on("connection", (client) => {
  // running the connected every time there is someone connecting
  client.on("connected", (data) => {
    const existed = connectedUser.find((user) => user.socketID === client.id);
    if (existed) return;
    connectedUser.push({ ...data, socketID: client.id });

    console.log(data.user.email + " is connected");
  });

  // changing the connected client information if it's logged in.
  client.on("loggedIn", (data) => {
    connectedUser = connectedUser.map((user) => {
      if (user.socketID === client.id)
        return { user, user: data.user, socketID: client.id };
      return user;
    });
    console.log(`${data.user.email} signed in`);
  });

  // client searching if there is available admin.
  client.on("searchAdmin", (callback) => {
    const theresAdmin = connectedUser.filter(
      (user) => user.user.type === "admin"
    )[0];
    callback(theresAdmin);
  });

  // client requesting the admin support
  client.on("requestAdminContact", (data) => {
    const requestingClient = connectedUser.find(
      (user) => user.socketID === client.id
    );
    io.to(data.socketID).emit("clientContactRequest", requestingClient);
  });

  // admin accepting the client support request
  client.on("acceptRequest", (data) => {
    const adminInfo = connectedUser.find((user) => user.socketID === client.id);
    io.to(data.socketID).emit("requestAccepted", adminInfo);
  });

  client.on("sendMessage", (data) => {
    io.to(data.socketID).emit("receivedMessage", {
      sender: data.email,
      message: data.message,
    });
  });

  client.on("adminDisconnectToChat", (data) => {
    io.to(data.clientSocketID).emit("adminDisconnect", { socketID: client.id });
  });

  // running this function if a client is disconnecting
  // removing the client information in the saved array
  client.on("disconnect", () => {
    const disconnectedUser = connectedUser.find(
      (user) => user.socketID === client.id
    );
    io.emit("clientDisconnected", { socketID: client.id });
    if (disconnectedUser) {
      connectedUser = connectedUser.filter(
        (user) => user.socketID !== client.id
      );
      console.log(`${disconnectedUser.user.email} is disconnected`);
    }
  });
});

server.listen(3000, (err) => {
  if (err) throw err;
  console.log("Listening at port 3000");
});
