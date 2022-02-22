const inquirer = require('inquirer');
const mysql2 = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();