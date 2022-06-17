<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation 

```bash
$ yarn install
```
or

```bash
npm install
```
## Set environment
```
```
## Running the app

```bash
$ yarn start
```
or

```bash
npm start
```

## Init data MongoDb
mongo wallet migration.js

## mini-wallet

Initialize my account for wallet 
```
Request: 
url : [GET] http://localhost:3000/api/v1/init
data : {
    "customerXid" : "kdwdda"
}

Response:
{
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lclhpZCI6eyJjdXN0b21lclhpZCI6IjM0ZWFmZmQifSwiaWF0IjoxNjU1NDIzNjkxLCJleHAiOjE2NTU0MjM4MTF9.3k8yAvhmTxgoAii_EKH3GI9ODJTBKBiN6zawUZJPgRo"
    },
    "status": "success"
}
```

Enable my wallet
```
Request: 
url : [post] http://localhost:3000/api/v1/wallet
headers : {
    "Authorization" : "token"
}

Response :
{
    "data": {
        "tokent": "20f2a505-f536-4d1e-a7d3-b52c4708241a"
    },
    "status": "success"
}

```

View Wallet Balance
```
Request: 
url : [GET] http://localhost:3000/api/v1/wallet
headers : {
    "Authorization" : "token"
}

Response :
{
    "status": "success",
    "data": {
        "wallet": {
            "id": "20f2a505-f536-4d1e-a7d3-b52c4708241a",
            "ownedBy": "b7f0645c-7f8b-4588-af1e-1bec4633cc2b",
            "status": "enable",
            "enableAt": "2022-06-17 07:08:39",
            "balance": 10621600
        }
    }
}

```

Disable my Wallet 
```
Request: 
url : [PATCH] http://localhost:3000/api/v1/wallet
body : {
    "isDisable": true
}

Response :
{
    "status": "disable set successfully",
    "data": {
        "wallet": {
            "id": "20f2a505-f536-4d1e-a7d3-b52c4708241a",
            "ownedBy": "b7f0645c-7f8b-4588-af1e-1bec4633cc2b",
            "status": "disable",
            "disableAt": "2022-06-17 06:12:34",
            "balance": 10621600
        }
    }
}
```

Add virtual account 
```
Request: 
url : [POST] http://localhost:3000/api/v1/wallet/deposits
body :{
    "amount": 310800,
    "referenceId": "440344do40khcb44e0929-0pc7-p03pa0492294"
}

Response :
{
    "status": "success",
    "data": {
        "deposit": {
            "id": "dd87a70e-9589-476e-b3d4-3769ad8299a7",
            "deposited_by": "ea0212d3-abd6-406f-8c67-868e814a2436",
            "status": "success",
            "deposited_at": "2022-06-17 01:54:01",
            "amount": 310800,
            "reference_id": "440344do40khcb44e0929-0pc7-p03pa0492294"
        }
    }
}
```

withdrawn account 
```
Request: 
url : [POST] http://localhost:3000/api/v1/wallet/withdrawals
body :{
    "amount": 310800,
    "referenceId": "440344do40khcb44e0929-0pc7-p03pa0492294"
}

Response :
{
    "status": "success",
    "data": {
        "withdrawn": {
            "id": "582701d4-3d08-4074-8513-dd94e30e4a93",
            "withdrawn_by": "ea0212d3-abd6-406f-8c67-868e814a2436",
            "status": "success",
            "withdrawn_at": "2022-06-17 01:43:24",
            "amount": 310800,
            "reference_id": "440344do40hcb44e4929-0pc7-p04pa0492294"
        }
    }
}
```