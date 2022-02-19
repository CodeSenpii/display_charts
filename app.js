//jshint esversion:8
// backend web server with express
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
let chart_data = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// using ejs templates 
app.set('view engine', 'ejs');
// aws sdk
const aws_s3  = require('aws-sdk');
const auth = require('./auth.json');

let fileNames = [];

//Add the filename here**********************************
fileNames = ["data.json", "data2.json"];
// ******************************************************

function s3ConnectStatus(error, data) {
  if (error != null) {
    console.log("Connot retrieve object: \ncheck file name \nOr upload a file. \nERROR: " + error);
  } else {
    // console.log("Loaded " + data.ContentLength + " bytes");
    // console.log(data);
    chart_data.push(JSON.parse(data.Body));
  }
}// end function

// async to connent to s3 bucket
async  function s3connect(){
try{
  aws_s3.config.setPromisesDependency();

  aws_s3.config.update(
    {
      accessKeyId: auth.accessKeyId,
      secretAccessKey: auth.secretAccessKey,
    }
  );// end update
  // s3 instantion
  const s3 = new aws_s3.S3();
  //retrieve object from s3
  for(var i = 0; i < fileNames.length; i++){

    const response0 = await s3.getObject(
      { Bucket: "kpdata", Key: fileNames[i] },
      s3ConnectStatus
    ) .promise();
    chart_data.pop();// remove duplicate entries
  }


  // chart_data0 = JSON.parse(response0.Body);
  // console.log("This is the 1" + chart_data0);

}catch(e){
  console.log('Error', e);
}

}// end async function
s3connect();

app.get("/", function(req, res){
  // res.sendFile(__dirname + "/index.html");
  res.render("charts", {chartData : chart_data, newFiles : fileNames});
});

app.listen(port, function(){
console.log("Server started on port 3000");
});

// function call
