MODELS
======

Each directory inside the models/ should contain at least the following files :

* `index.js` the main entry file exports a factory method `create` to create new instances. The validation of the data is guaranteed by the `create` method and on each setter.
* `schema.json` the JSON-schema that expose the structure and the validation rules of this model. It should also contain an `examples` section that contains an array of valid data that will be used for the tests.
* `validate.js` the validation method. It could be handwritten in simple cases or generated with `ajv-cli` (another json validator) with the following command line : `ajv -s schema.json -o validate.js`
* `index.spec.js`
* `validate.spec.js`
