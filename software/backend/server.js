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

app.listen(PORT, "0.0.0.0", () => {
    console.log("server running on ${PORT}");
});