const express = require('express');
const docusign = require('docusign-esign');
const axios = require('axios');
var fs = require('fs');
var path = require('path');
const app = express();

const apiClient = new docusign.ApiClient();

const appConstant = require('../config/config');

const docusignRouter = express.Router();
apiClient.setBasePath(appConstant.basePath);


docusignRouter.get('/getToken', function (req, res) {
    const authUri = apiClient.getAuthorizationUri(appConstant.integrationKey, appConstant.scopes, appConstant.redirectUri, appConstant.responseType, appConstant.randomState);
    res.redirect(authUri);
});

docusignRouter.get('/createEnvolop', function (req, res) {
    apiClient.generateAccessToken(appConstant.integrationKey, appConstant.secreteKey, req.query.code)
        .then(function (oAuthToken) {
            apiClient.addDefaultHeader('Authorization', 'Bearer ' + oAuthToken.accessToken);
            apiClient.getUserInfo(oAuthToken.accessToken)
                .then(function (userInfo) {
                    apiClient.setBasePath(userInfo.accounts[0].baseUri + "/restapi");
                    createEnvolop(userInfo.accounts[0].accountId, oAuthToken.accessToken, (result) => {
                        res.send(result.envelopeId);
                    });
                }).catch(function (error) {
                    if (error) {
                        res.send("error"+error);
                    }
                });

        }).catch(function (error) {
            if (error)
                throw error;
        });
})


function createEnvolop(accountId, token, callback) {  
   var filedata = Buffer.from(fs.readFileSync('File.pdf')).toString('base64');

    var data = {
        "status": "sent",
        "emailSubject": "API Signature Request",
        "documents": [{
            "documentId": "1",
            "name": "File.docx",
            "documentBase64": filedata
        }],
        "recipients": {
            "signers": [{
                "email": appConstant.emailAddress,
                "name": "Pramod Mali",
                "recipientId": "1",
                "routingOrder": "1"
            }]
        }
    };

    var header = {
        'X-DocuSign-Authentication': JSON.stringify({
            "Username": appConstant.username,
            "Password": appConstant.password,
            "IntegratorKey": appConstant.integrationKey
        }),
        'Content-Type': 'application/json'
    }
    axios.post(`${appConstant.basePath}/v2/accounts/${accountId}/envelopes`,
        JSON.stringify(data), { headers: header })
        .then(function (response) {
            callback(response.data);
        }).catch(ex => {
            callback(ex);
        });
}

docusignRouter.post('/checkStatus',function (req, res){
    let accountId = req.body.accountId;
    let envId = req.body.envId;

    var header = {
        'X-DocuSign-Authentication': JSON.stringify({
            "Username": appConstant.username,
            "Password": appConstant.password,
            "IntegratorKey": appConstant.integrationKey
        }),
        'Content-Type': 'application/json'
    }

    let url = `https://demo.docusign.net/restapi/v2/accounts/${accountId}/envelopes/${envId}`;
    axios.get(url, { headers: header })
        .then(function (response) {
            console.log(response);
            res.json(response.data);
        }).catch(ex => {
            res.send(ex);
        });
    
});

module.exports = docusignRouter;
