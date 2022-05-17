# term-project-team-uno-4

# UNO GAME TEAM 4
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

### Team Members: 
Dev Soni, Vicente Pericone, Vandit Malik, Aryan Sharma

## Deployed on Heroku
https://uno-team-4.herokuapp.com/

## Tools Used

* HTML, CSS, Bootstrap → For designing frontend
* .ejs → Templating engine
* JavaScript → For adding functionalities + game logic
* Node.js, Express.js, Sequelize → For backend development
* Socket.io → For communication b/w server & client
* Postgres → For storing information in database
* GitHub → For Code sharing and version control
* Heroku → For Deployment of the web app
 
## Description

* We have built a multiplayer UNO Game which supports arbitrary number of players and game rooms. We have replicated the general idea of UNO card game and implemented the logic and design as a web application. In this game, players are challenged to see who can empty their set of cards first to win the game.
* Players can create and join game rooms, chat with each other in the global chat and also chat among players while playing the game. 
* Players can upload a Profile Picture and also view their number of wins and losses.
* Our team members collaborated using various tools to successfully build this real-time multiplayer game.

## Features

* Players can Create an Account and Sign In.
* Players can Upload a Profile Picture and check their total number of Wins and Losses in the Profile Section.
* Create a Game Room or Join One. 
* This game supports multiple game rooms and 2-4 players.
* Chat with players in the Global Chat.
* To play the game, each player must throw a card that has one matching characteristic of the card that is on existing deck. 
* Cards can only be matched by their Colors or their Number value.
* Special Cards → Draw 2, Draw 4, Reverse, Skip, Wild Card, Wild Draw 4
* **SPECIAL RULE: Click CALL UNO! when you have 2 cards remaining.**
* More game rules and specifications can be found in the [Rules Page](https://uno-team-4.herokuapp.com/rules) 

## Milestones
[Milestone 1,2 - Web App Concept, Wireframes, Game Rules + Features + Functionalities](/Milestones/Milestone%201%2C%202.pdf)\
[Milestone 3,4 - Web App Entity Design, Application Logic](/Milestones/Milestone%203%2C%204.pdf)\
[Milestone 5 - Development Progress](/Milestones/Milestone%205.pdf)\
[Final Presentation here - Final Documentation](/Milestones/Final%20Presentation.pdf)

## Install and Run Instructions

* Install Node & PostgreSQL
* Navigate to src folder of project in terminal
* Install node modules ```npm install```
* Setup database migration ```npm run db:migrate```
* Run the game ```npm run start:dev```
* Visit ```http://localhost:3000/``` to run the application
* To play the game on remote server, Visit the Heroku Deployed [Link here](https://uno-team-4.herokuapp.com/)

## Interesting Parts during the Build Process

* The most interesting part of this build process was to actually code the game which we have been playing in our real lives using paper cards.
* Collaborating with different team members and learn new technologies was interesting.
* Creating a screen for uploading profile picture and keeping a count of wins + losses was fun to add.
* Building an intuitive UI design was also important to give a nice feel to the players and have them remember the original UNO card game.

## Difficulties we had and how we overcame them

* It was hard to coordinate schedules for team meetings, since the members of our group lived in different time zones.
* Everyone worked on a little bit of everything rather than having a designated person work on a specific area.
* Learning PostgreSQL and Sequelize
* Building the game logic consumed most of the time and figuring out how to handle card images dynamically
* We researched many solutions and tested them to build the right logic
* Using Heroku was challenging and we encountered a lot of errors trying to deploy to heroku throughout the development
* One temporary solution we used was creating another git repository and deployed it from there, while simultaneously copy code into this repository to showcase progress

## Future Updates and Fixes

* We allowed users to upload a profile image to their account but it does not display the image next to their name when sending messages
* We tried implementing a call-uno button but trying to figure out the logic was difficult 	
* Right now, players have to press the call-uno button before playing their second to last card which isn’t what we wanted, instead we’ll change it to last card
* When having to draw 2/4 cards, players have to click on the +2/+4 icon to be dealt the cards instead of automatically dealing the cards

## Rules

<img src="/public/img/rules.png">
