//jshint esversion:8
// backend web server with express
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// aws sdk
const aws_s3  = require('aws-sdk');
const auth = require('./auth.json');

// async
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
  const response = await s3.getObject(
    { Bucket: "kpdata", Key: "data.json" },
    function (error, data) {
      if (error != null) {
        console.log("Connot retrieve object: \ncheck file name \nOr upload a file. \nERROR: " + error);
      } else {
        // console.log("Loaded " + data.ContentLength + " bytes");
        // console.log("Loaded " + data);
        // do something with data.Body
      }
    }
  ).promise();

  const chart_data = JSON.parse(response.Body);
  console.log(chart_data);

}catch(e){
  console.log('Error', e);
}

}// end async function

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, function(){
console.log("Server started on port 3000");
});

// function call
s3connect();
