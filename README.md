# docusign-nodejs

Docusign API with NodeJS

## Steps

* Change Config File

    Following constants need to be changed:
        integrationKey
        secreteKey
        username
        password
        emailAddress

    Run Project
        Go to root and type: node index.js

    Sign Document
        Navigate to <http://localhost:3000>
        Click on esign button
        Login to Docusign account, it'll retrun envelope id

    View envelope status
        Navigate to <http://localhost:3000/checkStatus>
        Enter envelope id in text box to check status