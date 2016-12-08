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
var s3 = new AWS.S3({ endpoint: ep, signatureVersion: 'v2'});


var params = {Bucket: 'indizobjects', Key: 'data2.jpg' };
s3.getSignedUrl('getObject', params, function (err, url) {
  console.log("The URL is", url);
});
