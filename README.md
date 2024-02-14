# Stocks React Typescript App

This is an app made using Typescript Node js Express js TypeORM and React js where a user can manually signup or login using Google SSO. This app provides the basic and financial information about the companies registered at NSE. This information is provided using Google SerpAPIs. This app also facilitates tracking the price of a stock. The app is also integrated with Google Firebase Cloud Messaging for push notifications feature. The app also comes with a provision of resetting user password in case the user forgot password. This is done using integration with Mailgun which allows users to send emails.


## Commands to be used to run the project

Open two terminals simultaneously and run the following commands on them: 

| Terminal 1 | Terminal 2 |
| ---------- | ---------- |
| cd nodets | cd reactts |
| $env:GOOGLE_APPLICATION_CREDENTIALS="...absolute path here\nodets\nstockse-firebase-adminsdk-pg15l-6b4b24e2e8.json" | npm start |
| npm run server |  |

