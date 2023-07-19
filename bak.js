const express = require("express");
const path = require("path");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const { DATABASE_URL } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getPostgresVersion() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT version()");
    console.log(res.rows[0]);
  } finally {
    client.release();
  }
}

getPostgresVersion();

// adding new event
app.post("/events", async (req, res) => {
  const { title, content, date, time, email, phone, username } = req.body;
  const client = await pool.connect();

  try {
    const query =
      "INSERT INTO events (title, content, date, time, email, phone, username, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING *";
    const params = [title, content, date, time, email, phone, username];

    const result = await client.query(query, params);
    // send new event data back to client
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  } finally {
    client.release();
  }
});

//getting user's post
app.get("/events/username/:username", async (req, res) => {
  const username = req.params.username;
  const client = await pool.connect();

  try {
    const query = "SELECT * FROM events WHERE username = $1";
    const params = [username];

    const result = await client.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.delete("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  const client = await pool.connect();

  try {
    const query = "DELETE FROM events WHERE id = $1";
    const params = [eventId];
    await client.query(query, params);

    console.log(`Event with id ${eventId} deleted successfully`);
    res.json({
      status: "success",
      message: `Event with id ${eventId} deleted successfully`,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.put("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  const { title, content, date, time, email, phone, username } = req.body;
  const client = await pool.connect();

  try {
    const query =
      "UPDATE events SET title = $1, content = $2, date = $3, time = $4, email = $5, phone = $6, username = $7 WHERE id = $8";
    const params = [
      title,
      content,
      date,
      time,
      email,
      phone,
      username,
      eventId,
    ];
    await client.query(query, params);

    console.log(`Event with id ${eventId} updated successfully`);
    res.json({
      status: "success",
      message: `Event with id ${eventId} updated successfully`,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get("/events", async (req, res) => {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM events";
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get("/events/:id", async (req, res) => {
  const id = req.params.id;
  const client = await pool.connect();

  try {
    const query = "SELECT * FROM events WHERE id = $1";
    const params = [id];

    const result = await client.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get("/events/username/:username", async (req, res) => {
  const username = req.params.username;
  const client = await pool.connect();

  try {
    const query = "SELECT * FROM events WHERE username = $1";
    const params = [username];

    const result = await client.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/404.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});
