const express = require("express");
const https = require("https");

const app = express();

const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res) {
    res.sendFile(__dirname+"/index.html");
    
})
app.post("/", function(req, res){
         
        const query =req.body.city
        const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=60d2b8bbef1a306a0e4b3fcd18f4eaeb&units=metric";

    https.get(url , function (response) {
        
       
        response.on("data", function (data) {
            const weatherData =JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL =" https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+query +" is "+temp+" degree celcius </h1>");
            res.write("<h3> Description :"+weatherDescription+"<img src="+imageURL+">"+"</h3>");
            
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server is running");
});