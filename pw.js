const input = document.getElementById("password");
const text = document.getElementById("text");

input.addEventListener("input", () => {
  const value = input.value;
  if (value != "") {
    const re = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{8,13}$/;
    testRegEx(input, re);
  } else {
    input.classList.remove("invalid");
  }
});

function testRegEx(input, re) {
  if (re.test(input.value)) {
    console.log("valid");
    input.classList.remove("invalid");
  } else {
    console.log("invalid");
    input.classList.add("invalid");
  }
}
