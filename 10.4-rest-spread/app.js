function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}

function filterOutOdds2(...nums) {
   return nums.filter((num) =>  num % 2 === 0);
}

function findMin(...nums) {
  return nums.reduce((accum,val) => val < accum ? val : accum);
}

function mergeObjects(obj1,obj2) {
  return {...obj1, ...obj2};
}

function doubleAndReturnArgs(arr, ...args) {
  let newArr = [...arr, ...args];
  return newArr.map((val) => val *2);
  
}

const removeRandom = (items) => {
  let newArr = [...items];
  const randomIndex = Math.round(Math.random() * (newArr.length-1));
  console.log(randomIndex)
  return newArr.filter((val,i) => i !== randomIndex);
};

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => ([...array1, ...array2]);

const addKeyVal = (obj, key, val) => {
  let newObj = {...obj};
  newObj[key] = val;
  return newObj;
};

const removeKey = (obj, key) => {
  let newObj = {...obj};
  delete newObj[key];
  return newObj;
};

const combine = (obj1, obj2) => ({...obj1, ...obj2});

const update = (obj, key, val) => {
  let newObj = {...obj};
  newObj[key] = val;
  return newObj;
};
