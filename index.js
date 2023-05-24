const inquirer = require('inquirer');
const fs = require('fs');


class Shape {
    constructor(color) {
      this.color = color;
    }
  
    render() {
      throw new Error('The render() method must be implemented in the child class.');
    }
  }
  
  class Triangle extends Shape {
    constructor(color) {
      super(color);
    }
  
    render() {
      return `<polygon points="100,180 200,180 150,80" fill="${this.color}" />`;
    }
  }
  
  class Circle extends Shape {
    constructor(color) {
      super(color);
    }
  
    render() {
      return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
    }
  }
  
  class Square extends Shape {
    constructor(color) {
      super(color);
    }
  
    render() {
      return `<rect x="50" y="50" width="200" height="100" fill="${this.color}" />`;
    }
  }

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
    const svgContent = generateSVGMarkup(logoText, textColor, shape, shapeColor);

    //writes SVG content to file
    fs.writeFileSync('logo.svg', svgContent);

    console.log('Generated logo.svg');

  });

//helper function to generate chosen shape
function generateSVGMarkup(logoText, textColor, shape, shapeColor) {
    const shapeInstance = createShapeInstance(shape, shapeColor);
  
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
                  <style>
                    text { font-family: sans-serif; font-size: 40px; fill: ${textColor}; text-anchor: middle; dominant-baseline: middle; }
                  </style>
                  ${shapeInstance.render()}
                  <text x="150" y="100">${logoText}</text>
                </svg>`;
    return svg;
  }
  
  // Helper function to create the shape instance based on user input
  function createShapeInstance(shape, shapeColor) {
    switch (shape) {
      case 'circle':
        return new Circle(shapeColor);
      case 'triangle':
        return new Triangle(shapeColor);
      case 'square':
        return new Square(shapeColor);
      default:
        throw new Error(`Invalid shape: ${shape}`);
    }

}

  
