const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'logoText',
      message: 'Enter up to three characters for the logo text:',
      validate: function (input) {
        if (input.length > 3) {
          return 'Please enter up to three characters only.';
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'textColor',
      message: 'Select a color or enter a hexadecimal number for the text color:',
      choices: ['red', 'blue', 'green', 'other'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape for the logo:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter a color keyword or hexadecimal number for the shape color:',
    },
  ])
  .then(function (answers) {
    const logoText = answers.logoText;
    const textColor = answers.textColor;
    const shape = answers.shape;
    const shapeColor = answers.shapeColor;

    //generates SVG content
    const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      <text x="50" y="100" fill="${textColor}" font-size="24">${logoText}</text>
      ${generateShapeMarkup(shape, shapeColor)}
    </svg>
    `;

    //writes SVG content to file
    fs.writeFileSync('logo.svg', svgContent);

    console.log('Generated logo.svg');
  });

//helper function to generate chosen shape
function generateShapeMarkup(shape, shapeColor) {
  if (shape === 'circle') {
    return `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
  } else if (shape === 'triangle') {
    return `<polygon points="150,20 275,180 25,180" fill="${shapeColor}" />`;
  } else if (shape === 'square') {
    return `<rect x="50" y="50" width="200" height="100" fill="${shapeColor}" />`;
  }
}
