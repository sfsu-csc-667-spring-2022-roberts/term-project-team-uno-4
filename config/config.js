require('dotenv').config();

module.exports = {
 "development": {
 "use_env_variable": "DATABASE_URL",
 "dialect": "postgres"
 },
 "test": {
 "use_env_variable": "DATABASE_URL",
 "dialect": "postgres"
 },
 "production": {
 "use_env_variable": "postgres://tpioaplangvqpv:b030cc4ac31173063de355484f82d06e6fc2c595bcb3be31256f616f37c03d90@ec2-44-194-4-127.compute-1.amazonaws.com:5432/d2ng6hh11aj6ln",
 "dialect": "postgres"
 }
}