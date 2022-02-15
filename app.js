//jshint esversion:8
const aws_s3  = require('aws-sdk');
const auth = require('./auth.json');

// async
console.log(auth);
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
    { Bucket: "kpdata", Key: "dat.json" },
    function (error, data) {
      if (error != null) {
        console.log("Connot retrieve object: \ncheck file name \nOr upload a file. \nERROR: " + error);
      } else {
        console.log("Loaded " + data.ContentLength + " bytes");
        // do something with data.Body
      }
    }
  );

}catch(e){
  console.log('Error', e);
}

}// end async function

// function call
s3connect();
