const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const emailSubText = emailInput.nextElementSibling;
const passwordInput = document.getElementById("password");
const passwordSubText = passwordInput.nextElementSibling;
const confirmPWinput = document.getElementById("confirm-password");
const confirmPWsubText = confirmPWinput.nextElementSibling;
const numberInput = document.getElementById("postcode");
const numberSubText = numberInput.nextElementSibling;
const submitButton = document.getElementById("submit");
const title = document.getElementById("title");

function testRegEx(value, re) {
  if (re.test(value)) {
    return true;
  } else {
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

function showSubText(element) {
  let height = element.scrollHeight;
  element.style.maxHeight = `${height}px`;
  element.style.padding = "0.5rem";
}

function hideSubText(element) {
  element.style.maxHeight = null;
  element.style.padding = null;
}

const liveChecks = (() => {
  emailInput.addEventListener("input", () => {
    if (emailInput.value != "") {
      if (emailInput.validity.typeMismatch) {
        emailSubText.innerHTML = emailInput.validationMessage;
        showSubText(emailSubText);
        toggleValidStyle(emailInput, false);
      } else {
        hideSubText(emailSubText);
        toggleValidStyle(emailInput, true);
      }
    } else {
      hideSubText(emailSubText);
      toggleValidStyle(emailInput, "none");
    }
  });

  const pwInputEvent = new Event("pwInputEvent");

  passwordInput.addEventListener("input", () => {
    passwordInput.dispatchEvent(pwInputEvent);
    confirmPWinput.dispatchEvent(pwInputEvent);
  });

  confirmPWinput.addEventListener("input", () => {
    passwordInput.dispatchEvent(pwInputEvent);
    confirmPWinput.dispatchEvent(pwInputEvent);
  });

  passwordInput.addEventListener("pwInputEvent", () => {
    const value = passwordInput.value;
    if (value != "") {
      const re = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[!?+*#$@\-a-zA-Z0-9]{8,64}$/;
      if (testRegEx(value, re)) {
        toggleValidStyle(passwordInput, true);
        hideSubText(passwordSubText);
        passwordInput.setCustomValidity("");
      } else {
        toggleValidStyle(passwordInput, false);
        passwordSubText.innerHTML =
          "Password should be between 8 and 64 characters, and contain at least one lower case letter, one upper case letter, and one digit.";
        passwordInput.setCustomValidity(
          "Password should be between 8 and 64 characters, and contain at least one lower case letter, one upper case letter, and one digit."
        );
        showSubText(passwordSubText);
      }
    } else {
      toggleValidStyle(passwordInput, "none");
      hideSubText(passwordSubText);
    }
  });

  confirmPWinput.addEventListener("pwInputEvent", () => {
    if (confirmPWinput.value != "") {
      if (confirmPWinput.value === passwordInput.value) {
        toggleValidStyle(confirmPWinput, true);
        hideSubText(confirmPWsubText);
        confirmPWinput.setCustomValidity("");
      } else {
        toggleValidStyle(confirmPWinput, false);
        confirmPWsubText.innerHTML =
          "You have not re-entered the same password!";
        confirmPWinput.setCustomValidity(
          "You have not re-entered the same password!"
        );
        showSubText(confirmPWsubText);
      }
    } else {
      toggleValidStyle(confirmPWinput, "none");
      hideSubText(confirmPWsubText);
    }
  });

  numberInput.addEventListener("input", () => {
    if (numberInput.value != "") {
      if (!testRegEx(numberInput.value, /^[0-9]{4,10}$/)) {
        numberSubText.innerHTML = "Please enter a 4 to 10 digit post code";
        toggleValidStyle(numberInput, false);
        showSubText(numberSubText);
      } else {
        toggleValidStyle(numberInput, true);
        hideSubText(numberSubText);
      }
    } else {
      toggleValidStyle(numberInput, "none");
      hideSubText(numberSubText);
    }
  });
})();

form.addEventListener("submit", (event) => {
  title.innerHTML = "Form Submitted";
  event.preventDefault();
});
