const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#solve-btn');
const soldisp = document.querySelector('#solution');
let submission = [];
const squares = 81;

//event listeners

solveButton.addEventListener('click', solve);

//functions

// appending input fields to the puzzle board
for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'number');
    inputElement.setAttribute('min', '1');
    inputElement.setAttribute('max', '9');
    inputElement.classList.add('h-m', 'w-m', 'border-1', 'border-solid', 'border-gray-300', 'text-center', 'font-sans', 'text-bold', 'text-xl', 'focus:outline-none');
    puzzleBoard.appendChild(inputElement);

    if (
        ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i < 21) ||
        ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i < 27) ||
        ((i % 9 === 3 || i % 9 === 4 || i % 9 === 5) && (i > 27 && i < 53)) ||
        ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i > 53) ||
        ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i > 53)
    ) {
        inputElement.classList.add('bg-blue-500', 'text-white');
    } else {
        inputElement.classList.add('text-blue-500');
    }
}

// joining the values of the input fields
function joinValues() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value);
        } else {
            submission.push('.');
        }
    })
    console.log(submission);
}

// populating the values of the input fields
function populateValues(solvable, solution) {
    const inputs = document.querySelectorAll('input');
    if (solvable && solution) {
        inputs.forEach((input, index) => {
            input.value = solution[index];
        })
        soldisp.innerText = 'Here you go!';
        soldisp.classList.add('font-mono', 'text-2xl', 'text-blue-500', 'text-center');
    } else {
        soldisp.innerText = 'Sorry, no solution :(';
    }
}


// solving the puzzle
function solve() {
    joinValues();
    const data = { numbers: submission.join('') };
    console.log('data', data);

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
            console.log(data)
            populateValues(data.solvable, data.solution);
            submission = [];
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}
