/******************
Median Sort solution

Google Code Jam Qualification Round 2021
https://codingcompetitions.withgoogle.com/codejam/round/000000000043580a/00000000006d1284

******************/

var readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function question() {
    return (await rl[Symbol.asyncIterator]().next()).value;
}

require('events').EventEmitter.prototype._maxListeners = 30100;

//Median sort
async function medianSort(numberOfElements2, numberOfQuestions2) {
    var numbers = [1, 2];
    for (var i = 3; i < numberOfElements2 + 1; i++) {
        //Ternary Search
        var l = 0;
        var r = numbers.length - 1;
        while ((r - l) >= 1 && numberOfQuestions2 > 0) {

            // Find the leftPivot and ritghtPivot
            var leftPivot = l + parseInt(((r - l) / 3));
            var rightPivot = r - parseInt(((r - l) / 3));

            var left = numbers[leftPivot];
            var right = numbers[rightPivot];

            var median = await askGoogle(left, right, i);

            numberOfQuestions2 -= 1;

            if (median == numbers[leftPivot]) {
                r = leftPivot - 1;
                if (l == r) {
                    r += 1;
                }
            } else if (median == numbers[rightPivot]) {
                l = rightPivot + 1;
                if (l == r) {
                    l -= 1;
                }
            } else {
                l = leftPivot + 1;
                r = rightPivot - 1;
                if (l == r) {
                    l -= 1;
                }
            }
        }
        numbers.splice(l, 0, i);
    }
    return await checkResult(numbers);
}

async function checkResult(numbers) {
    console.log(numbers.join(" "));
    var number = await question()
    return parseInt(number) == 1
}

async function askGoogle(a, b, c) {
    console.log(a, b, c);
    var number = await question();
    return parseInt(number);
}

async function main() {
    var input = await question();
    var numberArray = input.split(' ').map(function (item) {
        return parseInt(item, 10);
    });
    var testCases = numberArray[0];
    var numberOfElements = numberArray[1];
    var numberOfQuestions = numberArray[2];
    while (testCases > 0) {
        let v = await medianSort(numberOfElements, numberOfQuestions); 
        if (!v) {
            break;
        }
        testCases--;
    }
}

main()
    .then(text => {
        rl.close();
        return;
    })
    .catch(err => {
        console.log("fail");
        return;
    });