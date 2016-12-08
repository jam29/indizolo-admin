var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';
AWS.config.update({accessKeyId: 'AKIAJPVMMSLWWJYCLDUA', secretAccessKey: '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'});
//var ep = new AWS.Endpoint('cellar.services.clever-cloud.com');
//var s3 = new AWS.S3({ endpoint: ep, signatureVersion: 'v2'});

var s3 = new AWS.S3();
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



