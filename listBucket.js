var AWS = require('aws-sdk');

/**
 * Don't hard-code your credentials!
 * Export the following environment variables instead:
 *
 * export AWS_ACCESS_KEY_ID='RCITZM0P-3E3TL7YURFD'
 * export AWS_SECRET_ACCESS_KEY='PPHUQ9PpZf0HcFCBEXQ2W1px4r25inGyf7Ey4g=='
 */

// Set your region for future requests.
// AWS.config.region = 'us-east-1';

// Create a bucket using bound parameters and put something in it.
AWS.config.update({accessKeyId: 'RCITZM0P-3E3TL7YURFD', secretAccessKey: 'PPHUQ9PpZf0HcFCBEXQ2W1px4r25inGyf7Ey4g=='});
var ep = new AWS.Endpoint('cellar.services.clever-cloud.com');
var s3 = new AWS.S3({ endpoint: ep, signatureVersion: 'v2' ,params: {Bucket: 'indizobjects'}});


// var s3bucket = new AWS.S3({params: {Bucket: 'indizobjects'}});

// IMPORTANT: Make sure to change the bucket name from "myBucket" above to something unique.


  s3.listBuckets(function(err, data) {
  if (err) { console.log("Error:", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});

