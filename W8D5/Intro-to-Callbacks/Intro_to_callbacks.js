const readline = require('readline');

class Clock {
  constructor() {
    const date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    let clock = `${this.hours}::${this.minutes}::${this.seconds}`;
    console.log(clock);
  }

  _tick() {
    if (this.seconds >= 60) {
      this.minutes += 1;
      this.seconds -= 60;
    } else {
      this.seconds += 1;
    }
    this.printTime();
  }
}
// const clock = new Clock ();
// clock.printTime();
// clock._tick();

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers (sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Please enter a number!", function (num) {
      let int = parseInt(num);
      sum += int;
      console.log(sum);
      return addNumbers (sum, numsLeft - 1, completionCallback);
    });
  } else if (numsLeft === 0) {
    reader.close();
    return completionCallback(sum);
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));



function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}: yes or no?`, function (answer) {
    if (answer === 'yes') {
      // reader.close();
      return callback(true);
    } else {
      return callback(false);
    }
  });
}

// askIfGreaterThan(2, 1, function (answer) {
//   console.log(answer);
// });

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], function (isGreaterThan) {
      if (isGreaterThan) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        madeAnySwaps = true;
      }
      return innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else if (i == (arr.length - 1)){
    return outerBubbleSortLoop(madeAnySwaps);
  }
}

// function outerBubbleSortLoop (madeAnySwaps) {
//   console.log(madeAnySwaps);
//   reader.close();
// }

// innerBubbleSortLoop ([1, 5, 3, 6], 0, false, outerBubbleSortLoop);

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      return sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}

// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });


Function.prototype.myBind = function (cont, ...args) {
  return () => {
    return this.apply(cont, args);
  };
};

// class Lamp {
//   constructor() {
//     this.name = "a lamp";
//   }
// }

// const turnOn = function () {
//   console.log("Turning on " + this.name);
//   return 7;
// };

// const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"


Function.prototype.myThrottle = function (interval) {
  let tooSoon;
  return () => {
    if (tooSoon) {
    } else {
      tooSoon = true;
      setTimeout(function () { tooSoon = false; }, interval);
      this();
    }
  };
  // returns new version of function
  // 
};

class Neuron {
  fire() {
    console.log("Firing!");
  }
}

const neuron = new Neuron();
// When we create a new Neuron,
// we can call #fire as frequently as we want

console.log(neuron.fire);
neuron.fire = neuron.fire.myThrottle(500);

console.log(neuron.fire);