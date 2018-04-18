'use strict';

exports.handler = (event, context, callback) => {
    
    console.log("Validating the correct destination");
    
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const origin = request.origin;

    const originA = "a-lambdaedgedemo-firstbucket.s3.amazonaws.com";
    const originB = "a-lambdaedgedemo-secondbucket.s3.amazonaws.com";

    if (headers['cloudfront-viewer-country']) {
        
        const countryCode = headers['cloudfront-viewer-country'][0].value;
        console.log("Country: " + countryCode);
        
        if (countryCode === 'PL') {
            headers['host'] = [{key: 'host',          value: originA}];
            origin.s3.domainName = originA;
            console.log("This is Poland");
        } else {
            headers['host'] = [{key: 'host',          value: originB}];
            origin.s3.domainName = originB;
            console.log("This is not Poland");
        }
        
    } else {
        console.log("CloudFront-Viever-country header not provided");
    }
    

    callback(null, request);
};
