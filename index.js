const inquirer = require('inquirer')
const fs = require('fs')


const generateMarkdown = (data)=>{
  let licenseBadge;
  let licenseLink;
  switch(data.license) {
    case "MIT":
      licenseBadge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
      licenseLink = `[MIT License](https://choosealicense.com/licenses/mit/)`
      break;
    case "Apache":
      licenseBadge = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
      licenseLink = `[Apache License 2.0]https://choosealicense.com/licenses/apache-2.0/`
      break;
    case "GNU GPLv3":
      licenseBadge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
      licenseLink = `[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)`
      break;
    default:
      licenseBadge = ``;
  }
    
  return (`#${data.title}
  ${licenseBadge}
  
  ${data.description}
  
  ## Table of Contents
  
  1. [ Installation ](#Installation)
  2. [ Usage tips ](#Usage)
  3. [ Contributing tips ](#Contributing)
  4. [ Tests ](#Tests)
  5. [ Questions ](#Questions)

  ## Installation

  To install necessary dependencies, run the following command:
  \`\`\`
  ${data.installation}
  \`\`\`

  ## Usage

  ${data.usage}

  This project is licensed under the terms of the ${data.license} license: ${licenseLink}

  ## Contributing
  ${data.contributing}

  ## Tests

  To run tests, run the following command:
  
  \`\`\`
  ${data.tests}
  \`\`\`

  ## Questions
  Questions? Send me an email at ${data.email}
  To see more of my work, visit me on Github: [${data.username}](https://github.com/${data.username})    
  `)
}


//Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
inquirer.prompt([
  //for QUESTIONS section:
  {type: "input", name: "username", message: "Your github username?"},
  {type: "input", name: "email", message:"EMAIL address for fielding questions?"},
  //Project Title and description
  {type: "input", name: "title", message: "TITLE of your project?"},
  {type: "input", name: "description", message: "DESCRIPTION of project?"},

  //Installation, Usage, Contributing
  {type: "input", name: "installation", message: "INSTALLATION: instructions for installing necessary packages?"},
  {type: "input", name: "usage", message: "USAGE: How does one use this project?"},
  {type: "input", name: "contributing", message: "CONTRIBUTING: How would you like users to become contributors?"},
  
  {type: "input", name: "tests", message: "TESTS:"},

  //License
  {type: "list", name: "license", message: "LICENSE: Select from the dropdown", choices: ["MIT", "Apache", "GNU GPLv3"]},
])
  .then((responses)=>{
    console.log(responses)

    fs.writeFileSync('genReadMe.md', generateMarkdown(responses), function(e){
      if(e){
        throw e
      };
      console.log("saved!")})
  })
  .catch(e=>console.error(e))

