# Assignment 2 –weight-watchers-client        


### Table of contents

<!--ts-->
   * [Contact info](#Contact-info)
   * [Web App functionality](#Web-App-functionality)
      * [App Features](#App-Features)
      * [Video](#Video)
   * [API endpoints](#API-endpoints)
   * [Data storage](#Data-storage)
      * [Model submissions-model.js](#Model-submissions-model.js)
      * [Model users-models.js](#Model-users-models.jss)
   * [Server](#Server)
   * [Testing](#Testing)
     * [Sample Test execution](#Sample-Test-execution)
     * [Continuous Integration and Test results](#Continuous-Integration-and-Test-results)
   * [Code Examples](#Code)
   * [Build Setup](#Build-Setup)
   * [References](#Client)
   
<!--te-->
### Contact info
Name  : Fran

Email : Frmm97@gmail.com

## Web App functionality

This web appliaction for a Weight Watchers, this app is for the group leader to add new memmbers. they can fill in the members information like there starting weight, goal weight .etc when they have a weight watchers meeting agian the leader can then login and  updated the members info and they can leave a note. if a member has decided to stop atending the meetings the leader can then delet the member for the group. 
## App Features

### Video 
(Click on image below)
[![Web App](https://i.imgur.com/pHibVl9.png)](https://www.youtube.com/embed/qkWbVPdYZ-Q "Web App")

### Add new Member form

 <img src="https://i.imgur.com/1gm6YQr.png" width="500">

### List 
The table whre you can view the members informarion is where you can search, filter, update and delete.

Once the member is added they show up here, only there name location where they go to a meeting and also the members age.

<img src="https://i.imgur.com/PzGNE3b.png" width="500"> <img src="https://i.imgur.com/AMu87sn.png" width="300"> 

To se the rest of the info press shew details and then once you are done press hide details  
<img src="https://i.imgur.com/DboRqXX.png" width="500">
### Update
This will bring up the members info in the form that you use to add them 
<img src="https://i.imgur.com/zTxubcS.png" width="500">
### Delete
<img src="https://i.imgur.com/gzPPBaV.png" width="300"> <img src="https://i.imgur.com/vdWzCkp.png" width="260"> <img src="https://i.imgur.com/Kxt3avm.png" width="300">
## API endpoints
![Screenshot](https://github.com/FranciscaMasombo/weight-watchers-client/blob/master/photos/tt.PNG)

## Server
https://github.com/FranciscaMasombo/weight-watchers-server

## Data storage

I used MLab for the database , the schemas are below 

 ### Model submissions-model.js
 
````bash
let mongoose = require('mongoose')
const UserSchema = require('mongoose')
let SubmissionSchema =  new mongoose.Schema({

    fname: { type:String, required: true},
    lname: { type:String, required: true},
    email: { type: String, required: true },
    number: { type: String, required: true },
    gender: { type:String, required: true},
    age: { type: Number, min: 16, max: 70, required: true },
    weightType: { type:String, required: true},
    startWeight: { type:Number, required: true },
    goalWeight:{ type:Number, required: false },
    currentWeight:{ type:Number, required: false},
    location:{ type:String, required: true },
    date: { type: String},
    note: {type: String, required: false},
    user: {type: UserSchema.ObjectId, ref: 'user'},
},  {collection: 'sub'})
module.exports= mongoose.model('sub',SubmissionSchema )

````
 ### Model users-models.js
````bash
let mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;
let userSchema =  new schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    location: {type: String, required: true},
    workID: {type: String, required: true}
},{collection: 'user'});
userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password,hash) {
    return bcrypt.compareSync(password,hash)
}
module.exports = mongoose.model('users',userSchema,'users');

````
## Testing

    $ npm cross-env NODE_ENV=test nyc --reporter=lcov --reporter=text mocha test/submissions-model-test.js
    $ npm cross-env NODE_ENV=test PORT=4000 nyc mocha test/submissions-model-test.js",
    $ npm nyc report --reporter=text-lcov | coveralls

### Continuous Integration and Test results

#### Build Status         [![Build Status](https://travis-ci.org/FranciscaMasombo/weight-watchers-server.svg?branch=master)](https://travis-ci.org/FranciscaMasombo/weight-watchers-server)

https://travis-ci.org/FranciscaMasombo/weight-watchers-server

```bash
➥  SUBMISSION TESTS
     Is there anything in the database
 Successfully Connected to [ ccwtracker-test ]
 ConnectionhasbeenmadetotheDatabase
       √ Is there anything in the database (117ms)
     POST/add-submission
 POST /add-submission 200 1106.255 ms - 43
       √ should add a new member (1139ms)
 POST /add-submission 401 11.096 ms - 1571
       √ should return error new member not added and a 400 error
     PUT /update-submission/:id
 (node:12004) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
 PUT /update-submission/5be0ac62fb6fc061430eb239 200 569.077 ms - 21
       √ should update one submission in database (575ms)
     Get/listOneSubmission/:id
 GET /listOneSubmission/5be0ac62fb6fc061430eb239 200 327.217 ms - 26
       √ should find one submission by id (332ms)
 GET /listSubmissions/00000000080000 404 20.980 ms - 41
       √ should return an error message and a 404 error
     DELETE /delete-submission/:id
 DELETE /delete-submission/5be0ac62fb6fc061430eb239 200 243.456 ms - 23
       √ should delete  (250ms)
 DELETE /delete-submission/5be0ac62fb6fc06143 200 2.396 ms - 278
       √ should return an error message and a 400 error


   8 passing (5s)

```

#### Coverage     [![Coverage Status](https://coveralls.io/repos/github/FranciscaMasombo/weight-watchers-server/badge.svg?branch=master)](https://coveralls.io/github/FranciscaMasombo/weight-watchers-server?branch=master)
```bash
➥
=============================== Coverage summary ===============================
Statements   : 62.5% ( 120/192 )
Branches     : 21.05% ( 8/38 )
Functions    : 31.43% ( 11/35 )
Lines        : 62.83% ( 120/191 )
================================================================================
The command "npm run coverage" exited with 0.
```
## Code

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
