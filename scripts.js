let inputs = document.getElementsByTagName('input');
addEventListnersToInputs(inputs);

function onKeyUp(e) {
    let validateParams = null;
    switch (e.target.id) {
        case 'number':
        {
            validateParams = {
                RegExpString: "[0-9]",
                UppedKeyCode: e.keyCode,
                Separator: ' ',
                MaxSymbolsCount: 16,
                NumbersBlockLenght: 4
            }
            break;
        }

        case 'name':
        {
            validateParams = {
                RegExpString: "[a-zA-Z\\s]",
                IsUpperCase: true
            }
            break;
        }

        case 'date':
        {
            validateParams = {
                RegExpString: "[0-9]",
                UppedKeyCode: e.keyCode,
                Separator: '/',
                MaxSymbolsCount: 4,
                NumbersBlockLenght: 2
            }
            break;
        }

        case 'ccv':
        {
            validateParams = {
                RegExpString: "[0-9]",
                MaxSymbolsCount: 3
            }
            break;
        }
    }

    e.target.value = validateParams ? inputValidate(e.target.value, validateParams) : '';
}

function inputValidate(value, validateParams) {
    var regexp = new RegExp(validateParams.RegExpString, 'g')
    let validInput = '';
    let backspaceKeyCode = 8;

    let validCharsArray = value.match(regexp);

    if (validCharsArray) {
        validCharsArray.forEach(function (char, index) {
            let currentCharNumber = index + 1;

            if (currentCharNumber > validateParams.MaxSymbolsCount) {
                return;
            }

            validInput += char;

            if (validateParams.Separator) {
                if (currentCharNumber % validateParams.NumbersBlockLenght == 0 &&
                    currentCharNumber != validateParams.MaxSymbolsCount) {
                    validInput += validateParams.Separator;
                }
            }
        });

        if (validateParams.Separator) {
            if (validateParams.UppedKeyCode == backspaceKeyCode &&
                validInput.slice(-1) == validateParams.Separator) {
                validInput = validInput.slice(0, validInput.length - 1);
            }
        }
    }

    return validateParams.IsUpperCase ? validInput.toUpperCase() : validInput;
}

function addEventListnersToInputs(inputs) {
    let inputsArray = Array.from(inputs);
    inputsArray.forEach(function (input) {
        input.addEventListener('keyup', {
            handleEvent: onKeyUp
        })
    });
}


function cardFlip() {
    let card = document.getElementById('card');
    card.classList.toggle('flip');
}