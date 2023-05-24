// Import necessary libraries and modules
const inquirer = require('inquirer'); 
const fs = require('fs'); 

inquirer.prompt([
    {
      type: 'input',
      name: 'logoText',
      message: 'Enter up to three characters for logo text:',
      validate: function (input) {
        if (input.length > 3) {
          return 'Enter up to three characters only.';
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'textColor',
      message: 'Select color:',
      choices: ['red', 'blue', 'green', 'other'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select shape for logo:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter color keyword:',
    },
  ]).then(function (answers) {
    const logoText = answers.logoText;
    const textColor = answers.textColor;
    const shape = answers.shape;
    const shapeColor = answers.shapeColor;
  
    //for testing
    console.log('Logo Text:', logoText);
    console.log('Text Color:', textColor);
    console.log('Shape:', shape);
    console.log('Shape Color:', shapeColor);
  });