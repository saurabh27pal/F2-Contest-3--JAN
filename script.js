const submitBtn = document.getElementById("button");
let nextId = 1;
const users = [];
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    validateForm();
});
localStorage.setItem("registeredEmails", JSON.stringify(["supddashing@gmail.com", "rudra.sro2@gmail.com"]));
const result = document.querySelector("#result");
function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm");
    const errorName = document.getElementById("name-error");
    const errorEmail = document.getElementById("email-error");
    const errorPassword = document.getElementById("password-error");
    const errorConfirm = document.getElementById("confirm-password-error");
    let errorMessage = 0;

    if (!/^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})*$/.test(name.value)) {
        errorName.innerHTML = "Name should be atleast two words or more. ";
    }

    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        errorEmail.innerHTML = "Invalid email. ";
        errorMessage++;
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])[0-9a-zA-Z!@#\$%\^&\*]{8,}$/.test(password.value)) {
        errorPassword.innerHTML = "Password should have at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 special characters. ";
        errorMessage++;
    }
    const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails"));
    if (registeredEmails.includes(email.value)) {
        result.innerHTML = "The email is already registered.";
        return false;
    } else {
        result.innerHTML = "The email is not registered.";
    }
    if (password.value !== confirmPassword.value) {
        errorConfirm.innerHTML = "Passwords do not match. ";
        errorMessage++;
    }

    if (errorMessage === 0) {
        const newUser = {
            id: nextId,
            name: name.value,
            email: email.value,
            password: password.value
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        nextId++;
        window.location.href = "login.html";
    } else {
        errorMessage++;
    }
}