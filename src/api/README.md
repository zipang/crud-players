# A Micro-services CRUD API

With [now.js](https://zeit.co/now), deployments of AWS lambdas functions is really easy : [Turn a node.js function into an AWS lambda](https://zeit.co/docs/v2/deployments/official-builders/node-js-now-node/)  

Furthermore, the routes configuration for our API is simply declared inside the main configuration file `now.json` :

```json
"routes": [
		{
			"src": "/api/(?<domain>[^/]*)",
			"methods": ["POST"],
			"dest": "src/api/$domain/create.js"
		},
		{
			"src": "/api/(?<domain>[^/]*)/(?<id>[^/]*)",
			"methods": ["PUT", "PATCH"],
			"dest": "src/api/$domain/update.js"
		},
		{
			"src": "/api/(?<domain>[^/]*)/(?<id>[^/]*)",
			"methods": ["DELETE"],
			"dest": "src/api/$domain/delete.js"
		},
		{
			"src": "/api/(?<domain>[^/]*)/(?<id>[^/]*)",
			"methods": ["GET"],
			"dest": "src/api/$domain/read.js"
		},
		{
			"src": "/api/(?<domain>[^/]*)",
			"methods": ["GET"],
			"dest": "src/api/$domain/find.js"
		}
]
```

As detailled in [this post](https://zeit.co/blog/serverless-express-js-lambdas-with-now-2), we can deploy lambda functions using express, fastify or even micro to serve each entry point of our API !  
But..! the point is : deploying the _smallest amount of code possible_ (in term of dependencies) and the _fastest_ is a sure _win_ because lambda functions execution cost is mainly evaluated with these criterias :
* Amount of time spent in execution
* Bandwith used
* Amount of physical space used by deploy

Sources :
* https://zeit.co/account/plane

That's why using a micro http server like **micro** totally makes sense, even if i'm pretty sure that **Express** or **fastify** are still in the run because they have been really awesomely optimized recently.

## RESTFUL API Design

This CRUD API was designed following the principled exposed in this great blog post : [Best practices for a pragmatic RESTFUL API](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
