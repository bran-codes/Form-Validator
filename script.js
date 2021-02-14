const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//**FUNCTIONS**
//Show input error message if entries are incorrect or non-existent
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//Changes input box borders to green if entry parameters are correct
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//Check if entered email address is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${capitalizeFieldNameFirstLetter(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//Check if passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value || input2.value === "") {
    showError(input2, "Passwords do not match");
  }
}

//Check input lengths
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${capitalizeFieldNameFirstLetter(
        input
      )} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${capitalizeFieldNameFirstLetter(
        input
      )} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//Get fieldname, capitalize the first letter and send it back to checkRequired() function
function capitalizeFieldNameFirstLetter(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//**EVENT LISTENERS**
//Upon submit button click/tap, call the functions listed below the event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
