var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';
AWS.config.update({accessKeyId: 'RCITZM0P-3E3TL7YURFD', secretAccessKey: 'PPHUQ9PpZf0HcFCBEXQ2W1px4r25inGyf7Ey4g=='});
var ep = new AWS.Endpoint('cellar.services.clever-cloud.com');
var s3 = new AWS.S3({ endpoint: ep, signatureVersion: 'v2'});

//var s3 = new AWS.S3();
var params = {Bucket: 'indizolo', Key: 'data.jpg', GrantFullControl: 'Me' };

s3.getSignedUrl('getObject', params, function (err, url) {
  console.log("The URL for GET is", url);
});


s3.getSignedUrl('putObject', params, function (err, url) {
  console.log("The URL for PUT is", url);
});

/*
var bucket = {Bucket: 'indizolo' };
s3.getBucketCors( bucket, function (err, data) {
  console.log("Bucket CORS is %j ", data);
});
*/



