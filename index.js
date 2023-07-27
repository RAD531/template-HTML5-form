window.onload = function () {
    let form = document.getElementById("payment-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get all input and select elements within the form
        let inputsAndSelects = form.querySelectorAll("input, select, textarea");
        let errors = [];

        for (elem of inputsAndSelects) {
            if (elem.id === "card") {
                errors.push(checkCard(elem));
            }

            else if (elem.id === "cvc") {
                errors.push(changeBackgroundColur(checkValidityOfText(elem, "number", 3, 3), elem));
            }

            else if (elem.id === "amount") {
                errors.push(checkAmount(elem));
            }

            else if (elem.id === "first-name"){
                errors.push(checkName(elem));
            }

            else if (elem.id === "last-name"){
                errors.push(checkName(elem));
            }

            else if (elem.id === "city"){
                errors.push(changeBackgroundColur(checkValidityOfText(elem, "string",1, 50), elem));
            }

            else if (elem.id === "state"){
                errors.push(changeBackgroundColur(checkDropDown(elem), elem));
            }

            else if (elem.id === "post-code"){
                errors.push(changeBackgroundColur(checkValidityOfText(elem, "string",1, 50), elem));
            }
            
            else if (elem.id === "message"){
                errors.push(changeBackgroundColur(checkValidityOfText(elem, "string",1, 50), elem));
            }
        }

        for (error of errors){
            if (!error){
                document.getElementById("validation-message").style.display = "block";
                return;
            }
        }

        document.getElementById("validation-message").style.display = "none";
        //if all good, send the request
        form.submit();

    })
};

function checkCard(elem) {
    return changeBackgroundColur(checkValidityOfText(elem, "number", 8, 12), elem);
}

function checkAmount(elem) {
    
    // Remove commas from the input value before parsing as a float
    elem.value = elem.value.replace(/,/g, '');

    //parse to float to retain dollar formatting
    elem.value = parseFloat(elem.value);
    
    if (!changeBackgroundColur(checkValidityOfText(elem, "number", 1, 10), elem)) {
        return false;
    };

    // Format the price above to USD using the locale, style, and currency.
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'decimal',
    });

    try {
        elem.value = USDollar.format(elem.value);
    }

    catch (err) {
        window.alert(err.message);
        return changeBackgroundColur(false, elem);
    }

    return true;
}

function checkName(elem){

    let regName = /^(?=.{1,50}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/;

    if (checkValidityOfText(elem, "string", 1, 50) && regName.test(elem.value)){
        return changeBackgroundColur(true, elem);
    }

    return changeBackgroundColur(false, elem);
}

function checkDropDown(elem) {
  
    if (elem === null || elem.options.selectedIndex <= 0 || elem.options.selectedIndex === undefined) {
        return false;
    }
  
    else {
        return true;
    }
  }

function checkValidityOfText(elem, dataType, minCharLength, maxCharLength) {

    let value = elem.value;

    if (dataType === "number"){
        value = parseInt(value);
    }

    else if (dataType === "string"){
        value = toString(value);
    }

    if (typeof value != dataType || elem.value.length < minCharLength ||  elem.value.length <= 0 || elem.value.length > maxCharLength || elem.value === undefined || elem.value === null) {
        return false;
    }

    return true;
}

function changeBackgroundColur(err, elem) {
    if (err) {
        elem.style.backgroundColor = "transparent";
        return true;
    }

    else {
        elem.style.backgroundColor = "rgb(252, 173, 199)";
        return false;
    }
}