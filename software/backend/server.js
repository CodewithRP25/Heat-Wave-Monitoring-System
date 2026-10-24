const express = require("express");
const connectDB = require("./db");
const SensorData = require("./models/SensorData");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/",(req,res) => {
    res.json({
        message:"Heat Wave Backend",
        status:"running"
    });
});

app.get("/api/health",(req,res)=>{
    res.json({
        status:"OK"
    });
});

app.post("/api/sensor-data", async (req, res) => {
  const { temperature, humidity } = req.body;

  if (
    typeof temperature !== "number" ||
    typeof humidity !== "number"
  ) {
    return res.status(400).json({
      error: "Temperature and humidity must be numbers"
    });
  }

  try {
    const reading = await SensorData.create({
      temperature,
      humidity
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