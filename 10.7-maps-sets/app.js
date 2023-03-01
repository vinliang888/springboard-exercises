//Quick Question #1
new Set([1,1,2,2,3,4]) // A set with 4 entries {1, 2, 3, 4}

//Quick Question #2
[...new Set("referee")].join("") // 'ref'

//Quick Question #3
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);

// m will have 2 entries. One entry will have key/value pair of [1,2,3], true and the other entry will have key/value pair of [1,2,3], false.

const hasDuplicate = (arr) => {return arr.length !== new Set(arr).size }

const vowelCount = (word) => {
  let vowels = new Set('aeiou');
  let m = new Map()
  Array.from(word.toLowerCase()).forEach((char) => {
    if(vowels.has(char)) {
      if (m.has(char)){
        m.set(char, m.get(char)+1);
      } else {
        m.set(char, 1);
      }
    }
  });
  return m;
};
