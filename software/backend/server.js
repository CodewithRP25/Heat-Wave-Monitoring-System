const express = require("express");

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

app.post("/api/sensor-data", (req, res) => {
  const { temperature, humidity } = req.body;

  if (
    typeof temperature !== "number" ||
    typeof humidity !== "number"
  ) {
    return res.status(400).json({
      error: "Temperature and humidity must be numbers"
    });
  }

  console.log("Sensor data received:", {
    temperature,
    humidity
  });

  res.json({
    status: "success",
    message: "Sensor data received"
  });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("server running on ${PORT}");
});