const inquirer = require('inquirer')

const getAnswers = ()=>{
  inquirer.prompt([
    {type: "input", name: "username", message: "Github username?"},
    {type: "input", name: "title", message: "Project title?"},
    {type: "input", name: "description", message: "Description of project?"},
    {type: "input", name: ""}
  ])
}