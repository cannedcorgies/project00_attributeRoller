//// building

const defaultAttributes = [15, 14, 13, 12, 10, 8];  // scoped for entire program

class Player {

    constructor(characterName = 'fern') {   // start character

        this.name = characterName;
        this.attributes = {

            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0

        };

        let shuffledResult = shuffleArray(defaultAttributes);  // get random order of defaults
        for (const [key, value] of Object.entries(this.attributes)) {   // one by one plop them in

            let attributeValue = shuffledResult.pop();
            this.attributes[key] = attributeValue;

        }

    }

    rollAttributes() {  // assign to character class

        console.log('Rolling da dice...')

        for (const key in this.attributes) {

            let results = diceRoller(4, 6);
            results.sort(function(a, b){return a - b});
            results.shift();
            let sum = sumArrayElements(results);
            this.attributes[key] = sum;

        }

    }

    printPlayer() {     // describe character

        console.log(`NAME: ${this.name}`);
        for (const [key, value] of Object.entries(this.attributes)) {
            console.log(`${key.slice(0, 3).toUpperCase()}: ${value}`);
        }
        

    }

}

//// functions

function diceRoller(times, sides) {

    let results = [];
    for (let i = 0; i < times; i++) {   // roll "times" number of times
        results.push(Math.floor(Math.random() * sides + 1));    // get random number up to dice limit
    }

    return results; // return your array of random dice rolls

}

function sumArrayElements(array) {

    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }

    return sum;

}

// Nathan Altice's algorithm adapted from Fisher-Yates' for randomly sorting array
// from: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
// adapted to JS and reconfigured to return anew (non-mutated) array

function shuffleArray(targetArray) {

    let shuffled = Array.from(targetArray); // creates COPY to avoid overwriting

    for (let i = shuffled.length - 1; i > 0; i--) { // for each elem...

        const j = Math.floor(Math.random() * (i+1));    // get random up to i
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];                      // shuffle around...
        shuffled[j] = temp;                             // and reinsert

    }

    return shuffled

}

// testing

const player01 = new Player();
player01.printPlayer();

const player02 = new Player("fern's son");
player02.rollAttributes();
player02.printPlayer();