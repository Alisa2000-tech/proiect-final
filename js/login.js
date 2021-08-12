const log_email = document.querySelector("#log_email");
const log_pass = document.querySelector("#log_pass");
const log_submit = document.querySelector("#log_button");
const log_error = document.querySelector("#log_error");

const messages = {
  email_required: "Email address is required",
  email_invalid: "Invalid email address",
  pass_length: "Password must be at least 8 characters",
};

const BASE_URL = "https://backend-curs.herokuapp.com";
const ENDPOINTS = {
  LOGIN: "/users/login",
};

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateInput = (el, err, mesaj) => {
  el.style.border = "1px solid red";
  err.innerText = mesaj;
  err.style.color = "red";
  setTimeout(() => {
    el.style.border = "unset";
    err.innerText = "";
  }, 3000);
};

if (log_submit !== null) {
  log_submit.addEventListener("click", (event) => {
    event.preventDefault();

    if (log_email.value === "") {
      validateInput(log_email, log_error, messages.email_required);
      return;
    }

    if (emailRegex.test(log_email.value) === false) {
      validateInput(log_email, log_error, messages.email_invalid);
      return;
    }

    if (log_pass.value === "" && log_pass.value.length < 8) {
      validateInput(log_pass, log_error, messages.pass_length);
      return;
    }

    const request_data = {
      email: log_email.value.trim(),
      password: log_pass.value,
    };

    fetch(BASE_URL + ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message !== undefined) {
          validateInput(log_error, log_error, json.message);
        } else {
          localStorage.setItem("token", json.token);
          localStorage.setItem("account", JSON.stringify(json.user));
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      });
  });
}
