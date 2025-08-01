const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const ACCESS_KEY = "68832693145cb4e8449b05b6";
const SECRET_KEY = "W6gPJljsewhqe5l3vh12nJeLQrEwD0gBEZZrjswQ257i2E6gQzgVWdPX7lL1JvIuKK542dY9tHCBCnTkjVlGwUK21wLasQXWocS1zg7VF4GvJBY91W18IF2G4fnu-KJCVOitpHrv6llPMe5_MI687E126jb9pgy-HJk9tsZnlEQ=";

app.get("/get-token", async (req, res) => {
  const { user_id, role, room_id } = req.query;

  try {
    const response = await axios.post(
      "https://api.100ms.live/v2/room-tokens",
      {
        user_id,
        role,
        room_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      }
    );

    res.send(response.data);
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).send("Failed to get token");
  }
});

// ✅ This fixes "Cannot GET /"
app.get("/", (req, res) => {
  res.send("🟢 100ms token server is up and running!");
});

app.listen(3000, () => {
  console.log("✅ Token server running at http://localhost:3000");
});
