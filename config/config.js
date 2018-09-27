const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  SALESLOFT_API_URL: Joi.string()
    .required()
    .description('SalesLoft API url is required.'),
  SALESLOFT_API_KEY: Joi.string()
    .required()
    .description('SalesLoft API key is required.'),
  API_SECRET: Joi.string()
    .required()
    .description('API secret is required.'),
  API_KEY: Joi.string(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  apiUrl: envVars.SALESLOFT_API_URL,
  apiKey: envVars.SALESLOFT_API_KEY,
  apiSecret: envVars.API_SECRET,
  testingApiKey: envVars.API_KEY,
};

module.exports = config;
