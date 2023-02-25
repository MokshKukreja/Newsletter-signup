const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    var firstName =req.body.fName;
    var lastName =req.body.lName;
    var email =req.body.email;

    const data ={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data); 
    const url ="https://us8.api.mailchimp.com/3.0/lists/48442d5ae1"
    const options ={
        method:"POST",
        auth:"moksh010:049d236cc15644cd5f50115f5197e954-us8"
    }
    const request = https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })



  request.write(jsonData); 
  request.end();

    // console.log(firstName,lastName,email)
});

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000.");
})

// 0600fb2162e9725abe5f0870c6c76fbf-us10
// 1d72f1ff25

// 049d236cc15644cd5f50115f5197e954-us8
// 48442d5ae1