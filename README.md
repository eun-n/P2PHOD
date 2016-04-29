# p2phelpme

Project Overview:
This app allows users to post a picture of a problem they have and create a video chat room that people can access by clicking on their post.

Technologies Used:
HTML, CSS, JavaScript, Node.JS, Express, WebRTC, PeerJS, Sequelize, Heroku

Installation Instructions: 
Fork and Clone repo
open project in terminal
-npm install
-nodemon or node index.js

Unsolved Problems:
Currently the caller ID from the PeerJS cloud server is delivered over http, while getUserMedia (video calling) is only available in https. This results in a MixedContent error that does not accept the caller ID. The ID shows up when run on localhost.

Possible Problems:
Trolling. Lots of trolling.

Future Goals:
Add in tags and a sorting option for posts.
Get the video chat to work over https.
Implement a calendar so people are able to schedule availability.
Find a way to connect users without having to type in the caller ID.
Create a rating system where users are able to rate others for helpfulness.

Super Future Goals:
Create a reward system where users are able to offer a reward for users who help them.


User Stories:
Person A
-Person A needs help with figuring out an issue with their car so they take a picture of their problem and post it online. They don't like reading through yahoo answers, searching forums, slow customer service, or waiting for people to respond over text. Instead they are able to talk to someone and show them their problem and get immediate help.

Person B
-Person B knows a lot about a certain topic (cars). They are able to look through posts to see the different problems people and decide which ones they would be abe to help with. They can then click on a post and get taken directly to a video chat where they can talk to the poster. 