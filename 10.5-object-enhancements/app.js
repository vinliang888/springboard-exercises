
/* Write an ES2015 Version - ## ****Same keys and values ES2015**** */
function createInstructor(firstName, lastName){
  return {
    firstName,
    lastName
  };
}

/* Write an ES2015 Version - Computed Property Names ES2015*/
let favoriteNumber = 42;

let instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!"
};


/* Write an ES2015 Version - ## ****Object Methods ES2015**** */
let instructor2 = {
  firstName: "Colt",
  sayHi() {
    return "Hi!";
  },
  sayBye() {
    return this.firstName + " says bye!";
  }
}

function createAnimal(species, verb, noise) {
  return {
    species: species,
    [verb]() {return noise}
  };
}
