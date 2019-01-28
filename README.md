# crud-players
Simple CRUD application demonstrating React+Now+FaunaDB integration

## Configuration

### Using environment variables and secrets with `now`

Some configuration details doesn't belong to the git repository, like our database secrets API keys or passwords..

They can been stored inside `now` as secrets like this : 

```sh
now secret add PLAYERS_API_SECRET XXXXXXXXXXXXXXXX
```

Then, we can make them available as environment variables inside the deployed production lambdas, by adding them to `now.json` in a special `env` section :

```json
	"env": {
		"NODE_ENV": "production",
		"PLAYERS_API_SECRET": "@PLAYERS_API_SECRET"
	},
```

To use these variables in the local environment, just export them in the terminal before running the tests or a script : 

```sh
> export PLAYERS_API_SECRET=XXXXXXXXXXXXXXXX
> mocha api.test.js
```

To launch and debug the tests from inside VS Code with the secrets, there is a special `launch.json` configuration to create :
[Debugging Mocha tests in VS Code](https://github.com/Microsoft/vscode-recipes/tree/master/debugging-mocha-tests)  
And then, the environment variables must be added inside this launch configuration as : 
```json
  "env": {
    "PLAYERS_API_SECRET": "XXXXXXXXXXXXXXXX"
  }
```

Then, to read the variables inside node.js just do : 

```js
const secret = process.env.PLAYERS_API_SECRET;
```

See [Environment variables and secrets in Now](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/)
