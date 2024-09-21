window.onload = function () {

    let nameInput = document.getElementById('name');
    let usernameInput = document.getElementById('userName');
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let passwordRepeatInput = document.getElementById('repeatPassword');
    let checkboxInput = document.getElementById('myCheckbox');

    const nameError = document.getElementById('nameError');
    const userError = document.getElementById('userError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const repeatError = document.getElementById('repeatError');
    const errorCheckbox = document.getElementById('errorCheckbox');

    let form = document.getElementById('myForm');

    let clients = JSON.parse(localStorage.getItem('clients')) || [];

    function hideErrors() {
    nameError.style.display = 'none';
    userError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = "none";
    repeatError.style.display = "none";
    }

    function setError (element, errorText){
        element.textContent = errorText;
        element.style.display = 'block';
    }

    //  Full Name может содержать только буквы и пробел
    nameInput.onkeydown = (e) => {

        let key = e.key;
        let isLetter = /^[a-zA-Z]$/i.test(key);
        let isSpace = key === ' ';
        let isSpecialKey = key === 'Backspace' || key === 'Delete' || key === 'Tab' || key === 'ArrowLeft' || key === 'ArrowRight';

        if (!isLetter && !isSpecialKey && !isSpace) {
            e.preventDefault();
        }
    }

    //   Your username - может содержать только буквы, цифры, символ подчеркивания и тире
    usernameInput.onkeydown = (e) => {

        let key = e.key;
        let isLetter = /^[a-zA-Z]$/i.test(key);
        let isDigit = /^[0-9]$/i.test(key);
        let isSpecialKey = key === '_' || key === '-' || key === 'Backspace' || key === 'Delete' || key === 'Tab' || key === 'ArrowLeft' || key === 'ArrowRight';

        if (!isLetter && !isDigit && !isSpecialKey) {
            e.preventDefault();
            }
    }

    // Реализовать проверку введенного E-mail на корректность
    emailInput.onkeydown = (e) => {
        let key = e.key;
        let isLetter = /^[a-zA-Z]$/i.test(key);
        let isDigit = /^[0-9]$/i.test(key);
        let isSpecialChar = key === '@' || key === '.' || key === '_' || key === '-';
        let isSpecialKey = key === 'Tab' || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight';

        if (!isLetter && !isDigit && !isSpecialKey && !isSpecialChar) {
            e.preventDefault();
        }
    }

    // Проверка пароля: разрешаем ввод только допустимых символов и специальных клавиш
    passwordInput.onblur = () => {
        let isLetter = /^[a-zA-Z]$/;
        let isDigit = /^[0-9]$/;
        let isSpecialCharacter = /[!@#$%^&*]/;

        if (!isLetter && !isDigit && !isSpecialCharacter ) {
           setError(passwordError,"Недопустимые символы в поле Password");
        }

        isPasswordInvalid();

    }

    function isPasswordInvalid() {
        let hasUpperCase = /[A-Z]/.test(passwordInput.value);
        let hasDigit = /\d/.test(passwordInput.value);
        let hasSpecialCharacter = /[!@#$%^&*]/.test(passwordInput.value);
        let hasMinimumLength = passwordInput.value.length >= 8;

        let isIssue = false;

        passwordError.style.display = "none";

            if (!passwordInput.value) {
                setError(passwordError, "Заполните поле Password");
                isIssue = true;
            }
            if (!hasUpperCase) {
                setError(passwordError, "Password должен содержать хотя бы одна буква в верхнем регистре");
                isIssue = true;
            }

            if (!hasDigit) {
                setError(passwordError, "Password должен содержать хотя бы одну цифру");
                isIssue = true;
            }

            if (!hasSpecialCharacter) {
                setError(passwordError, "Password должен содержать хотя бы один специальный символ");
                isIssue = true;
            }

            if (!hasMinimumLength) {
                setError(passwordError, "Password должен быть не менее 8 символов");
                isIssue = true;
            }

        return isIssue;
    }

    function isRepeatPasswordInvalid(){
        let isIssue = false;

        if (!passwordRepeatInput.value) {
            setError(repeatError,"Заполните поле Repeat password");
            isIssue = true;
        }

        if (passwordInput.value !== passwordRepeatInput.value) {
            setError(repeatError,"Repeat password не совпадает с password");
            isIssue = true;
        }

        return isIssue;
    }

    passwordRepeatInput.onblur = (e) => {
        isRepeatPasswordInvalid();
    }

    // При нажатии на кнопку “Sign Up”:Все поля должны быть заполнены
    function validateForm(event) {

        let isIssues = false;
        let hasAtAndDot = emailInput.value.includes('@') && emailInput.value.includes('.');

        let user = clients.find(client => client.userNameCookie === usernameInput.value);

        hideErrors();

        if (!checkboxInput.checked) {
            errorCheckbox.style.color = "#DD3142";
            isIssues = true;

        } if (!nameInput.value) {
            setError(nameError,"Заполните поле Full name");
            isIssues = true;

        } if (!usernameInput.value) {
            setError(userError,"Заполните поле User name");
            isIssues = true;

        } if (!hasAtAndDot) {
            setError(emailError,"Email должен содержать символы . и @");
            isIssues = true;

        }if (!emailInput.value) {
            setError(emailError,"Заполните поле Email");
            isIssues = true;

        } if ( isPasswordInvalid()) {
            isIssues = true;

        } if (isRepeatPasswordInvalid()) {
            isIssues = true;

        } if (!isIssues) {

            // создание массива localstorage

            if (user) {
                alert("Пользователь с таким user name уже существует");
                return;

            } else {

                clients.push({
                nameInputCookie: nameInput.value,
                userNameCookie: usernameInput.value,
                passwordCookie: passwordInput.value
                });
            }

            localStorage.setItem('clients', JSON.stringify(clients));
            alert('На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию')
            console.log('Form submitted successfully!');
            accountLogin();
        }
    }

    function validateLoginForm() {
        let user = clients.find(client => client.userNameCookie === usernameInput.value);

        userError.style.display = 'none';
        emailError.style.display = 'none';

        if (!usernameInput.value) {
            setError(userError,"Заполните поле User name");
        }

        if (!passwordInput.value) {
            setError(passwordError,"Заполните поле Password");
        }

           else {

        if (!user) {
            setError(userError,"Такой пользователь не зарегистрирован");
            }

        if (user.passwordCookie !== passwordInput.value) {
            setError(passwordError,"Неверный пароль");
            }

        else {
           userAccount(user);
                 }
            }
    }

    function userAccount(user) {

        document.getElementById('titleH1').innerText = 'Welcome, ' + user.nameInputCookie;
        usernameInput.parentElement.remove();
        passwordInput.parentElement.remove();
        document.getElementById('exist').parentElement.remove();
        document.getElementById('trial').style.visibility = 'hidden';
        document.getElementById('signIn').value = 'Exit';

        form.removeEventListener('submit', validateForm);
        document.getElementById('signIn').addEventListener('click', function () {
            location.reload();
        })
    }

    function accountLogin() {

        hideErrors();
        
        nameInput.parentElement.remove();
        emailInput.parentElement.remove();
        passwordRepeatInput.parentElement.remove();
        checkboxInput.parentElement.remove();
        usernameInput.value = '';
        passwordInput.value = '';

        document.getElementById('signIn').value = 'Sign in';
        document.getElementById('titleH1').innerText = 'Log in to the system';
        document.getElementById('exist').innerText = "Registration";
        document.getElementById('exist').onclick = function () {
            location.reload();
        };

        form.removeEventListener('submit', validateForm);
        form.addEventListener('submit', validateLoginForm);
    }

    form.addEventListener('submit', validateForm);
    document.getElementById('exist').onclick = accountLogin;
}

