const express = require("express"); // equivalent to line above
const cors = require("cors");
const DB = require("./data/db");
const server = express();

server.use(express.json());
server.use(cors());
// server.get("/", (req, res) => {
//   res.send("hello web 20.75");
// });

// POST 400
server.post("/api/users", (req, res) => {
  const userInformation = req.body;
  DB.add(userInformation)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    });
});
// POST 500
server.post("/api/users", (req, res) => {
  const userInformation = req.body;
  DB.add(userInformation)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

// GET 404
server.get("/api/users/:id", (req, res) => {
  DB.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});
// GET 500
server.get("/api/users", (req, res) => {
  DB.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
// DELETE 404
server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  DB.remove(userId)
    .then(user => {
      res.status(200).json({ message: "user deleted successfully" });
    })
    .catch(error => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});
// DELTE 500
server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  DB.remove(userId)
    .then(user => {
      res.status(200).json({ message: "user deleted successfully" });
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});
// PUT 404
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const name = req.body.name;
  const bio = req.body.bio;
  console.log(req.body);
  if (!name || !bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  DB.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

const port = 8000;
server.listen(port, () => console.log("\napi runnning\n"));
