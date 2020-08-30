# RedditBot Template for JavaScript
Snoowrap mention messaging queue

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

This is a template for a Reddit bot in JavaScript. It uses Snoowrap with two requesters, one to create a messaging queue, and another to process the mentions. If you've tried using Snoosorm to generate a stream from your inbox before, you may have run into a problem, where there is a need to utilize multiple requesters to complete API transactions. Well the fix is a messaging queue! This bot template is a simplified version of the ever popular Snoostorm library. It contains a messaging queue function (that Snoostorm was lacking!) to get around the problem of requiring many requesters.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This application runs on NodeJS. You must have NodeJS to run it.

### Installing

A step by step series of examples that tell you how to get a development env running.

Download the source code...

Run this command...

```
npm install
```

Of course you will find these values at https://www.reddit.com/prefs/apps/
```
USER_AGENT=''
CLIENT_ID=''
CLIENT_SECRET=''
REDDIT_USER=''
REDDIT_PASS=''
```

And begin coding your bot!

## Usage <a name = "usage"></a>

Open up the file: src/service/BotService.js

Write your functions in this file, put your code within doSomething().

doSomething() will be called each time a new mention is received.

It will be passed a pre-fetched comment object, from your inbox.

doSomething() must return a Promise Object. The resulting function doesn't actually do anything with it, but to complete the promise chain, it is required.
