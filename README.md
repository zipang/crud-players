# crud-players
Simple CRUD application demonstrating React+Now+FaunaDB integration

## Configuration

### Environment variables and secrets

Some secrets doesn't belong to the repository, like our database secrete API keys or passwords..

They have been stored inside `now` as secret environnement variable like : 

```sh
now secret add PLAYERS_API_SECRET XXXXXXXXXXXX
```

To made them available inside a now deployment, add it inside now.json :

```json

```

To use it in local environment, just export them before running the tests : 

```sh
export PLAYERS_API_SECRET=XXXXXXXXXXXXXXXXXXXXX
export FAUNADB_TEST_SECRET=XXXXXXXXXXXXXXXXXXXX
```

To launch and debug the tests from VS Code, there is a special launch configuration to create :
* [Debugging Mocha tests in VS Code](https://github.com/Microsoft/vscode-recipes/tree/master/debugging-mocha-tests)
And then, the environment variables must be added inside this launch configuration as : 
```json
  "env": {
    "FAUNADB_TEST_SECRET": "XXXXXXXXXXXXXXXX"
  }
```

Then, to use the variables inside node.js just do : 

```js
const secret = process.env.PLAYERS_API_SECRET;
```

See [Environment variables and secrets in Now](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/)
