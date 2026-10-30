const express = require("express");
const path = require("path");
const connectDB = require("./db");
const SensorData = require("./models/SensorData");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.json({
    message: "Heat Wave Backend",
    status: "running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK"
  });
});

app.post("/api/sensor-data", async (req, res) => {
  const { device_id, temperature, humidity, timestamp } = req.body;

    res.json(readings);
  } catch (error) {
    console.error("Fetch readings error:", error.message);
    res.status(500).json({
      error: "Failed to fetch sensor readings"
    });
  }
});

app.post("/api/sensor-data", async (req, res) => {
  const { device_id, temperature, humidity, timestamp } = req.body;
  if (
    typeof device_id !== "string" ||
    device_id.trim() === "" ||
    typeof temperature !== "number" ||
    typeof humidity !== "number"
  ) {
    return res.status(400).json({
      error: "device_id must be a string, Temperature and humidity must be numbers"
    });
  }

  try {
    const reading = await SensorData.create({
      device_id,
      temperature,
      humidity,
      ...(timestamp ? { timestamp: new Date(timestamp) } : {})
    });

    res.status(201).json({
      status: "success",
      message: "Sensor data saved",
      data: reading
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ error: "Failed to save sensor data" });
  }
});

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});