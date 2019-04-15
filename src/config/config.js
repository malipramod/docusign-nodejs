const docusign = require('docusign-esign');

const apiClient = new docusign.ApiClient();


const integrationKey = 'your_integrationKey';
const secreteKey = 'your_secreteKey';
const username='your_username';
const password='your_password';
const responseType = apiClient.OAuth.ResponseType.CODE;
const scopes = [apiClient.OAuth.Scope.EXTENDED];
const randomState = "*^.$DGj*)+}Jk";
const redirectUri = 'http://localhost:3000/api/docusign/createEnvolop';
const basePath = 'https://demo.docusign.net/restapi';
const emailAddress = 'to_emailAddress';

module.exports ={
    integrationKey,
    secreteKey,
    responseType,
    scopes,
    randomState,
    redirectUri,
    basePath,
    username,
    password
}