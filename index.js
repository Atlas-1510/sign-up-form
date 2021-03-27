const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const emailSubText = emailInput.nextElementSibling;
const passwordInput = document.getElementById("password");
const passwordSubText = passwordInput.nextElementSibling;
const confirmPWinput = document.getElementById("confirm-password");
const confirmPWsubText = confirmPWinput.nextElementSibling;

function testRegEx(value, re) {
  if (re.test(value)) {
    console.log("valid");
    return true;
  } else {
    console.log("invalid");
    return false;
  }
}

function toggleValidStyle(input, validState) {
  if (validState === "none") {
    input.classList.remove("invalid");
    input.classList.remove("valid");
  } else if (validState) {
    input.classList.remove("invalid");
    input.classList.add("valid");
  } else if (!validState) {
    input.classList.add("invalid");
    input.classList.remove("valid");
  }
}

const liveChecks = (() => {
  emailInput.addEventListener("input", () => {
    if (emailInput.value != "") {
      if (emailInput.validity.typeMismatch) {
        emailSubText.innerHTML = emailInput.validationMessage;
        toggleValidStyle(emailInput, false);
      } else {
        emailSubText.innerHTML = "";
        toggleValidStyle(emailInput, true);
      }
    } else {
      toggleValidStyle(emailInput, "none");
      emailSubText.innerHTML = "";
    }
  });

  const pwInputEvent = new Event("pwInput");

  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    if (value != "") {
      const re = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[!?+*#$@\-a-zA-Z0-9]{8,64}$/;
      if (testRegEx(value, re)) {
        toggleValidStyle(passwordInput, true);
        passwordSubText.innerHTML = "";
      } else {
        toggleValidStyle(passwordInput, false);
        passwordSubText.innerHTML =
          "Password should be between 8 and 64 characters, and contain at least one lower case letter, one upper case letter, and one digit.";
      }
    } else {
      toggleValidStyle(passwordInput, "none");
      passwordSubText.innerHTML = "";
    }
  });

  confirmPWinput.addEventListener("input", () => {
    if (confirmPWinput.value != "") {
      if (confirmPWinput.value === passwordInput.value) {
        toggleValidStyle(confirmPWinput, true);
        confirmPWsubText.innerHTML = "";
      } else {
        toggleValidStyle(confirmPWinput, false);
        confirmPWsubText.innerHTML =
          "You have not entered the same password as above!";
      }
    } else {
      toggleValidStyle(confirmPWinput, "none");
      confirmPWsubText.innerHTML = "";
    }
  });
})();
