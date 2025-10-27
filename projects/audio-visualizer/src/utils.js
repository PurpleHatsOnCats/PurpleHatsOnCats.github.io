const makeColor = (red, green, blue, alpha = 1) => {
  return `rgba(${red},${green},${blue},${alpha})`;
};

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomColor = () => {
  const floor = 35; // so that colors are not too bright or too dark 
  const getByte = () => getRandom(floor, 255 - floor);
  return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};

const getLinearGradient = (ctx, startX, startY, endX, endY, colorStops) => {
  let lg = ctx.createLinearGradient(startX, startY, endX, endY);
  for (let stop of colorStops) {
    lg.addColorStop(stop.percent, stop.color);
  }
  return lg;
};

// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
const goFullscreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullscreen) {
    element.mozRequestFullscreen();
  } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  // .. and do nothing if the method is not supported
};

// Create a node object froma string
const createElementFromString = (string) => {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

const createBlurWeightMatrix = (standardDev = 1, radius = 2) => {
  let weightMatrix = [];
  let weightFunc = (x, y, s) => Math.exp(-(x * x + y * y) / (2 * s * s))

  // Initalize matrix
  let column = [];
  for (let i = 0; i < radius * 2 + 1; i++) {
    column.push(0);
  }
  for (let i = 0; i < radius * 2 + 1; i++) {
    weightMatrix.push(Array.from(column));
  }

  // Calculate initial weights
  for (let i = 0; i < radius + 1; i++) {
    for (let j = 0; j < radius + 1; j++) {
      weightMatrix[i][j] = weightFunc(i - radius, j - radius, standardDev);
    }
  }
  // Mirror
  for (let i = radius + 1; i < radius * 2 + 1; i++) {
    for (let j = 0; j < radius + 1; j++) {
      weightMatrix[i][j] = weightMatrix[2 * radius - i][j];
    }
  }
  for (let i = 0; i < radius * 2 + 1; i++) {
    for (let j = radius + 1; j < radius * 2 + 1; j++) {
      weightMatrix[i][j] = weightMatrix[i][2 * radius - j];
    }
  }

  // Find total
  let total = 0;
  for (let i = 0; i < radius * 2 + 1; i++) {
    for (let j = 0; j < radius + 1; j++) {
      total += weightMatrix[i][j];
    }
  }

  // Standardize
  for (let i = 0; i < radius * 2 + 1; i++) {
    for (let j = 0; j < radius + 1; j++) {
      weightMatrix[i][j] /= total;
    }
  }
  return weightMatrix;
}

// Return the index of an array as if it were 2D
const get2DIndex = (array, x, y, width, height, size = 1, offset = 0) => {
  // Loop around when beyond bounds
  x = (x < 0) ? x + width : (x > width) ? x - width : x;
  y = (y < 0) ? y + height : (y > height) ? y - height : y;
  return array[x * size + width * size * y + offset];
}
// Set a certain value in an array as if it were 2D
const set2DIndex = (value, array, x, y, width, height, size = 1, offset = 0) => {
  // Loop around when beyond bounds
  x = (x < 0) ? x + width : (x > width) ? x - width : x;
  y = (y < 0) ? y + height : (y > height) ? y - height : y;
  array[x * size + width * size * y + offset] = value;
}

export { makeColor, getRandomColor, getLinearGradient, goFullscreen, createElementFromString, createBlurWeightMatrix, get2DIndex, set2DIndex };