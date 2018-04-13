# LettuceEat
LettuceEAT connects local restaurants and/or businesses with a surplus of unsold food to non-profit organizations in the greater Tucson area.This application allows all public to see donation posts, donors' profiles and nonprofits' profiles. Donors need to sign up in order to make donation posts and non profits need to sign up in order to contact donors about their interest. LettuceEAT aims to reduce food waste one bite at a time.

![Demo gif](./client/public/LettuceEat.gif)
* [Live Demo](https://lettuceeat.herokuapp.com/)
* [Video Demo]()

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
1. Install Node.js  (https://nodejs.org/en/download/)
2. Install MySQL (https://www.mysql.com/downloads/)

### Installing
1. Clone the github repo using command line:
```
git clone https://github.com/michellele994/LettuceEat.git
``` 
2. Using command line go to the LettuceEact directory
```
cd LettuceEat
```
3. Reset Database: Copy the schema,in the db folder,paste it into your desired mysql interface/command line.
4. Once in the LettuceEat directory 
```
cd client
```
5. Run the install package.json dependencies in the client folder
```
yarn install
```
6. Now install server side dependencies by going back to the LettuceEat directory 
```
cd .. 
```
7. Now install server side dependencies by  
```
yarn install 
```
8. Run  
```
yarn build
```
9. Run the app 
```
yarn start
```
10. If successfull you should see the following message on you command line, 
```
App listening on PORT 3001
```
11. Your app should automatically open on http://localhost:3000/


<!-- ## Running the tests

1. Go to ClassroomApp directory run in command line
```
npm test
``` -->

## Deployment
Follow Heroku's deployment instructions
* https://devcenter.heroku.com/articles/git
* Add JawsDB MySQL add-on

## Built With
* [React.js](https://reactjs.org/) -To create the user interface
* [Sequelize](http://docs.sequelizejs.com/) - Promised-based ORM used
* [Express](http://expressjs.com/) - Web framework used
* [Yarn](http://expressjs.com/) - Package manager employed
<!-- * [Mocha](https://mochajs.org/) - Used as testing framework
* [chai](http://www.chaijs.com/) - Assertion library paired with Mocha for testing -->


## Authors
* **Michelle Le** - *Team Lead* - [GitHub](https://github.com/michellele994)
* **Brandon Haines** - *Team:Front-end* - [GitHub](https://github.com/bhaines3)
* **Ernesto Samaniego** - *Team:Front-end* - [GitHub](https://github.com/ernesto13)
* **Perla Ballesteros** - *Team:Front-end/Back-end* - [GitHub](https://github.com/perlaballesteros)

## Acknowledgments
* 
* 