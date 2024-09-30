const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserData = require("./model/infomodel");
const redis = require("redis");
const PORT = process.env.POTRT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
let client;

(async () => {
  client = redis.createClient({
    socket: {
      port: 6379,
      host: 'redis-service'
   }
  });
  client.on("error", (error) => console.error(`Error : ${error}`));
  client.on("connect", () => console.log("Redis connected"));
  await client.connect();
})();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// cheaking root api
app.get("/", (req, res) => {
  res.json({ message: "that is the root folder and now update " });
});

// for all the users information about
async function getAllUser(req, res) {
  console.log("request get for all users");
  try {
    const users = await UserData.find({});
    client.setEx(
      "all user data",
      3000,
      JSON.stringify("{'message':'this is from cahce'}\n\n\n" + users)
    );
    res.status(200).json(users);
  } catch (error) {
    console.log("Show  the error message for get method");
    res.send(500).json({ message: error.message });
  }
}

// for cacheing database
async function cheakchache(req, res, next) {
  try {
    // const id = req.params.id;
    const id = "all user data";
    const data = await client.get(id);
    if (data !== null) {
      console.log("data from cache");
      res.status(200).json(data);
    } else {
      next();
    }
  } catch (error) {
    console.log(`Redis function ${error}`);
  }
}

// sent user infromation to database
app.post("/user", async (req, res) => {
  console.log("request sent");
  try {
    const user = await UserData.create(req.body);
    client.del("all user data");
    res.status(200).json(user);
  } catch (error) {
    console.log("Show  the error message posh method");
    res.send(500).json({ message: error.message });
  }
});

// cheak user infromation to database and cache
// if not in cache then store and return
// otherwise return data from cache
app.get("/user", cheakchache, getAllUser);

// that is not necessarily for this project
// async function getUser(req, res) {
//   try {
//     console.log(`request get for single user ${req.params.id}`);
//     const users = await UserData.findOne({ mobile: req.params.id });
//     if (users == null) {
//       return res.status(200).json({ message: "No user found" });
//     }
//     client.setEx(
//       req.params.id.toString(),
//       3000,
//       JSON.stringify("{'message':'this is from cahce'}" + users)
//     );
//     res.status(200).json(users);
//   } catch (error) {
//     console.log("Show  the error message for single data get method");
//     res.send(500).json({ message: error.message });
//   }
// }
// app.get("/user/:id", cheakchache, getUser);

// update user data
// app.put("/user/:id", async (req, res) => {
//   console.log("request for update userdata");
//   try {
//     const { userid } = req.params.id;
//     const users = await UserData.findOneAndUpdate(
//       { mobile: req.params.id },
//       req.body
//     );
//     if (!users) {
//       return res
//         .status(404)
//         .json({ message: `cannot update user information ${userid}` });
//     }
//     console.log("updated user deatoils in radis");
//     client.del(req.params.id);
//     res.status(200).json(users);
//   } catch (error) {
//     console.log("Show  the error message for update method");
//     res.send(404).json({ message: error.message });
//   }
// });
console.log("------")
mongoose
  .connect(
    'mongodb://mongo:27017/docker-db'
  )
  .then((e) => {
    console.log("Connected  mongo database");
    console.log("---------------{$e}" + e);
    app.listen(PORT, () => {
      console.log("node js application running on part 3000");
    });
  })
  .catch((e) => {
    console.log("Error connecting");
    console.log(e);
  });