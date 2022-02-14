//jshint esversion:6
const aws_s3  = require('aws-sdk');
aws_s3.config.update(
  {
    accessKeyId: "...",
    secretAccessKey: "...",
  }
);
const s3 = new aws_s3.S3();
s3.getObject(
  { Bucket: "kpdata", Key: "data.json" },
  function (error, data) {
    if (error != null) {
      console.log("Failed to retrieve an object: " + error);
    } else {
      console.log("Loaded " + data.ContentLength + " bytes");
      // do something with data.Body
    }
  }
);
