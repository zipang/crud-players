'use strict';
var formats = require('ajv/lib/compile/formats')();
var validate = (function() {
  var refVal = [];
  return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
    'use strict'; /*# sourceURL=todos */
    var vErrors = null;
    var errors = 0;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      if (true) {
        var errs__0 = errors;
        var valid1 = true;
        if (data.firstName === undefined) {
          valid1 = false;
          validate.errors = [{
            keyword: 'required',
            dataPath: (dataPath || '') + "",
            schemaPath: '#/required',
            params: {
              missingProperty: 'firstName'
            },
            message: 'should have required property \'firstName\''
          }];
          return false;
        } else {
          var errs_1 = errors;
          if (typeof data.firstName !== "string") {
            validate.errors = [{
              keyword: 'type',
              dataPath: (dataPath || '') + '.firstName',
              schemaPath: '#/properties/firstName/type',
              params: {
                type: 'string'
              },
              message: 'should be string'
            }];
            return false;
          }
          var valid1 = errors === errs_1;
        }
        if (valid1) {
          if (data.lastName === undefined) {
            valid1 = false;
            validate.errors = [{
              keyword: 'required',
              dataPath: (dataPath || '') + "",
              schemaPath: '#/required',
              params: {
                missingProperty: 'lastName'
              },
              message: 'should have required property \'lastName\''
            }];
            return false;
          } else {
            var errs_1 = errors;
            if (typeof data.lastName !== "string") {
              validate.errors = [{
                keyword: 'type',
                dataPath: (dataPath || '') + '.lastName',
                schemaPath: '#/properties/lastName/type',
                params: {
                  type: 'string'
                },
                message: 'should be string'
              }];
              return false;
            }
            var valid1 = errors === errs_1;
          }
          if (valid1) {
            var data1 = data.birthDate;
            if (data1 === undefined) {
              valid1 = true;
            } else {
              var errs_1 = errors;
              if (errors === errs_1) {
                if (typeof data1 === "string") {
                  if (!formats.date.test(data1)) {
                    validate.errors = [{
                      keyword: 'format',
                      dataPath: (dataPath || '') + '.birthDate',
                      schemaPath: '#/properties/birthDate/format',
                      params: {
                        format: 'date'
                      },
                      message: 'should match format "date"'
                    }];
                    return false;
                  }
                } else {
                  validate.errors = [{
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.birthDate',
                    schemaPath: '#/properties/birthDate/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  }];
                  return false;
                }
              }
              var valid1 = errors === errs_1;
            }
            if (valid1) {
              var data1 = data.number;
              if (data1 === undefined) {
                valid1 = false;
                validate.errors = [{
                  keyword: 'required',
                  dataPath: (dataPath || '') + "",
                  schemaPath: '#/required',
                  params: {
                    missingProperty: 'number'
                  },
                  message: 'should have required property \'number\''
                }];
                return false;
              } else {
                var errs_1 = errors;
                if ((typeof data1 !== "number" || (data1 % 1) || data1 !== data1)) {
                  validate.errors = [{
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.number',
                    schemaPath: '#/properties/number/type',
                    params: {
                      type: 'integer'
                    },
                    message: 'should be integer'
                  }];
                  return false;
                }
                var valid1 = errors === errs_1;
              }
              if (valid1) {
                if (data.team === undefined) {
                  valid1 = false;
                  validate.errors = [{
                    keyword: 'required',
                    dataPath: (dataPath || '') + "",
                    schemaPath: '#/required',
                    params: {
                      missingProperty: 'team'
                    },
                    message: 'should have required property \'team\''
                  }];
                  return false;
                } else {
                  var errs_1 = errors;
                  if (typeof data.team !== "string") {
                    validate.errors = [{
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.team',
                      schemaPath: '#/properties/team/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    }];
                    return false;
                  }
                  var valid1 = errors === errs_1;
                }
                if (valid1) {
                  if (data.biography === undefined) {
                    valid1 = true;
                  } else {
                    var errs_1 = errors;
                    if (typeof data.biography !== "string") {
                      validate.errors = [{
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.biography',
                        schemaPath: '#/properties/biography/type',
                        params: {
                          type: 'string'
                        },
                        message: 'should be string'
                      }];
                      return false;
                    }
                    var valid1 = errors === errs_1;
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate.errors = [{
        keyword: 'type',
        dataPath: (dataPath || '') + "",
        schemaPath: '#/type',
        params: {
          type: 'object'
        },
        message: 'should be object'
      }];
      return false;
    }
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "todos",
  "type": "object",
  "title": "JSON Schema for Players entries",
  "description": "A player in a game team",
  "required": ["firstName", "lastName", "number", "team"],
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "birthDate": {
      "type": "string",
      "format": "date",
      "description": "Born on"
    },
    "number": {
      "type": "integer",
      "description": "Official number in the team"
    },
    "team": {
      "type": "string"
    },
    "biography": {
      "type": "string"
    }
  },
  "examples": [{
    "firstName": "John",
    "lastName": "DOE",
    "biography": "John DOE was allways here. Even before the Game was created.",
    "number": 10,
    "team": "X"
  }, {
    "id": "groceries",
    "content": "Bread, butter, eggs and milk"
  }]
};
validate.errors = null;
module.exports = validate;