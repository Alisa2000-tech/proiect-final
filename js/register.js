const reg_fname = document.querySelector("#register_fname");
const reg_lname = document.querySelector("#register_lname");
const reg_email = document.querySelector("#register_mail");
const reg_pass1 = document.querySelector("#register_pass1");
const reg_pass2 = document.querySelector("#register_pass2");
const reg_news = document.querySelector("#register_newsletter");
const reg_terms = document.querySelector("#register_terms");
const reg_submit = document.querySelector("#register_button");
const reg_error = document.querySelector("#register_error");

const messages = {
  fname_required: "First name is required",
  lname_required: "Last name is required",
  fname_length: "First name must be at least 3 characters",
  lname_length: "Last name must be at least 3 characters",
  email_required: "Email address is required",
  email_invalid: "Invalid email address",
  pass_length: "Password must be at least 8 characters",
  pass_match: "Password do not match",
  pass_invalid: "Password must contain one special character",
  terms_accepted: "You must agree to the terms and conditions",
};

const BASE_URL = "https://backend-curs.herokuapp.com";
const ENDPOINTS = {
  REGISTER: "/users/register",
};

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const pass_regex = /\D{1,}[!_#&]\D{1,}/;

const validateInput = (el, err, mesaj) => {
  el.style.border = "1px solid red";
  err.innerText = mesaj;
  err.style.color = "red";
  setTimeout(() => {
    el.style.border = "unset";
    err.innerText = "";
  }, 3000);
};

if (reg_submit !== null) {
  reg_submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (reg_fname.value === "") {
      validateInput(reg_fname, reg_error, messages.fname_required);
      return;
    }

    if (reg_lname.value === "") {
      validateInput(reg_lname, reg_error, messages.lname_required);
      return;
    }

    if (reg_fname.value.length < 3) {
      validateInput(reg_fname, reg_error, messages.fname_length);
      return;
    }

    if (reg_lname.value.length < 3) {
      validateInput(reg_lname, reg_error, messages.lname_length);
      return;
    }

    if (reg_email.value === "") {
      validateInput(reg_email, reg_error, messages.email_required);
      return;
    }

    if (emailRegex.test(reg_email.value) === false) {
      validateInput(reg_email, reg_error, messages.email_invalid);
      return;
    }

    if (reg_pass1.value.length < 8 || reg_pass2.value.length < 8) {
      validateInput(reg_pass1, reg_error, messages.pass_length);
      return;
    }

    if (reg_pass1.value !== reg_pass2.value) {
      validateInput(reg_pass1, reg_error, messages.pass_match);
      return;
    }

    if (pass_regex.test(reg_pass1.value) === false) {
      validateInput(reg_pass1, reg_error, messages.pass_invalid);
      return;
    }

    if (reg_terms.checked === false) {
      validateInput(reg_terms, reg_error, messages.terms_accepted);
      return;
    }
    try {
      fetch(BASE_URL + ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: reg_fname.value.trim(),
          last_name: reg_lname.value.trim(),
          email: reg_email.value.trim(),
          password: reg_pass1.value,
        }),
      })
        .then((response) => response.json())
        .then((prevResponse) => {
          if (prevResponse.id !== undefined) {
            alert("Account created. Please log in.");
          } else {
            validateInput(reg_error, reg_error, prevResponse.message);
          }
        });
    } catch (err) {
      validateInput(reg_error, reg_error, err.message);
    }
  });
}
