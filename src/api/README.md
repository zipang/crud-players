# A CRUD API deployed on AWS lambdas 

With [now](https://zeit.co/now), deployments of lambdas functions is really easy : [Turn a node.js function into an AWS lambda](https://zeit.co/docs/v2/deployments/official-builders/node-js-now-node/)  
Furthermore, the route configuration is simply declared inside `now.json`  
Based on [this example](https://zeit.co/blog/serverless-express-js-lambdas-with-now-2) from Now blog, we can deploy lambda functions using express, fastify or even micro to serve each single entry point of our API !

## RESTFUL API Design

This CRUD API was designed following the principled exposed in this great blog post : [Best practices for a pragmatic RESTFUL API](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
