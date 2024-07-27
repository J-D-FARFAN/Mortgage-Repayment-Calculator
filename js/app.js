// Obtención de elementos del DOM
const elements = {
    activeChecked: document.querySelectorAll(".bx-inputRadio"),
    inputsRadio: document.querySelectorAll(".inputsRadio"),
    activeInputs: document.querySelectorAll(".inputsForm"),
    activeIcons: document.querySelectorAll(".bx--contentInputs-and-icons"),
    errorMessage: document.querySelectorAll(".errorMessage"),
    emptyForm: document.querySelector(".emptyResultForm"),
    resultForm: document.querySelector(".resultForm"),
    btnSubmitForm: document.querySelector(".submitForm"),
    valueInputs: {
        amount: document.querySelector("#mortgageAmount"),
        term: document.querySelector("#mortgageTerm"),
        rate: document.querySelector("#interestRate")
    },
    pagoMensual: document.querySelector(".numberResult"),
    totalP: document.querySelector(".numberResultTotal"),
    clearAll: document.querySelector(".clearContent")
};

// Función para manejar el estado de los inputs de radio
function handleRadioClicks() {
    elements.activeChecked.forEach((bxInputRadio, index) => {
        bxInputRadio.addEventListener("click", () => {
            elements.inputsRadio.forEach(radio => { radio.checked = false; });
            elements.activeChecked.forEach(c => { c.classList.remove("activeRadio"); });

            bxInputRadio.classList.add("activeRadio");
            elements.inputsRadio[index].checked = true;
        });
    });
}

// Función para manejar el enfoque y desenfoque de los inputs
function handleInputFocusBlur() {
    elements.activeInputs.forEach((input, index) => {
        const iconInput = elements.activeIcons[index];
        const errorInfo = elements.errorMessage[index];
        
        input.addEventListener("focus", () => {
            iconInput.classList.add("activeIcons");
            iconInput.classList.remove("errorValue");
            input.style.borderColor = "#D8DB2F"; 
            errorInfo.style.display = "none";
        });

        input.addEventListener("blur", () => {
            if (input.value === '') {
                iconInput.classList.remove("activeIcons");
                iconInput.classList.add("errorValue");
                input.style.borderColor = "#D73328";
                errorInfo.style.display = "block";
            } else {
                iconInput.classList.remove("errorValue");
                errorInfo.style.display = "none";
            }
        });
    });
}

// Función para calcular la hipoteca
function calculateMortgage() {
    let mAmount = parseInt(elements.valueInputs.amount.value);
    let mTerm = parseInt(elements.valueInputs.term.value);
    let mRate = parseInt(elements.valueInputs.rate.value) / 100 / 12;
    let nPagos = mTerm * 12;

    let pagoMonth = mAmount * (mRate * (1 + mRate)**nPagos) / ((1 + mRate)**nPagos - 1);
    let montoT = pagoMonth * nPagos;

    elements.pagoMensual.textContent = pagoMonth.toFixed(2);
    elements.totalP.textContent = montoT.toFixed(2);
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();
    let isValid = true;

    elements.activeInputs.forEach((input, index) => {
        if (input.value === '') {
            isValid = false;
            const iconInput = elements.activeIcons[index];
            const errorInfo = elements.errorMessage[index];
            
            iconInput.classList.remove("activeIcons");
            iconInput.classList.add("errorValue");
            input.style.borderColor = "#D73328";
            errorInfo.style.display = "block";
        }
    });

    if (isValid) {
        elements.emptyForm.style.display = "none";
        elements.resultForm.style.display = "block";
        calculateMortgage();
    }
}

// Función para limpiar el formulario
function clearForm() {
    elements.activeInputs.forEach((input, index) => {
        const iconInput = elements.activeIcons[index];
        const errorInfo = elements.errorMessage[index];
        
        iconInput.classList.remove("activeIcons", "errorValue");
        input.style.borderColor = "";
        errorInfo.style.display = "none";
        input.value = '';
    });

    elements.activeChecked.forEach(bxInputRadio => {
        bxInputRadio.classList.remove("activeRadio");
    });
    elements.inputsRadio.forEach(radio => { radio.checked = false; });

    elements.emptyForm.style.display = "flex";
    elements.resultForm.style.display = "none";
    elements.totalP.textContent = "0.00";
    elements.pagoMensual.textContent = "0.00";
}

// Inicialización de eventos
handleRadioClicks();
handleInputFocusBlur();
elements.btnSubmitForm.addEventListener("click", handleFormSubmit);
elements.clearAll.addEventListener("click", clearForm);
