const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require('cors');




const app = express();
const PORT = 8000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get("/api/getWeather/place/:id",async (req,res)=>{
    const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${req.params.id}&aqi=yes`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        return res.json(data)
    }catch(err){
        console.error("Error fetching weather data:", err);
        return res.status(500).json({ error: "Failed to fetch weather data" });
    }
})
app.get("/api/getWeather/coords/:x/:y",async (req,res)=>{
    const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${req.params.x},${req.params.y}&aqi=yes`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        return res.json(data)
    }catch(err){
        console.error("Error fetching weather data:", err);
        return res.status(500).json({ error: "Failed to fetch weather data" });
    }
})
app.get("/api/getWeather/search/:id",async (req,res)=>{
    const url = `https://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${req.params.id}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        return res.json(data)
    }catch(err){
        console.error("Error fetching weather data:", err);
        return res.status(500).json({ error: "Failed to fetch weather data" });
    }
})

app.get("/api/getForecast/place/:id",async (req,res)=>{
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${req.params.id}&days=5&aqi=yes&alerts=yes`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        return res.json(data)
    }catch(err){
        console.error("Error fetching weather data:", err);
        return res.status(500).json({ error: "Failed to fetch weather data" });
    }
})
app.get("/api/getForecast/coords/:x/:y",async (req,res)=>{
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${req.params.x},${req.params.y}&days=5&aqi=yes&alerts=yes`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        return res.json(data)
    }catch(err){
        console.error("Error fetching weather data:", err);
        return res.status(500).json({ error: "Failed to fetch weather data" });
    }
})



app.listen(PORT,() => {
    console.log(`server started at http://localhost:${PORT}`);
})