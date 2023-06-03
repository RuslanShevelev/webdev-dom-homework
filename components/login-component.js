import { loginUser, registerUser } from "../api.js";
export function renderLoginComponent(element) {
  let isLoginMode = true;
  const renderForm = () => {
    const loginHTML = `
    <div class="login-form" id="loginForm">
    <h2 class= "title">Форма ${isLoginMode ? 'входа' : 'регистрации'}</h2>
    ${isLoginMode ? "" : '<input type="text" class="login-form-input" placeholder="Введите ваше имя" id="name" />'}
    <input type="text" class="login-form-input" placeholder="Введите логин" id="login" />
    <input type="password" class="login-form-input" placeholder="Введите пароль" id="password" />
    <div class="login-form-row">
      <a href="#" id = "toggle-link" class="link">${isLoginMode ? 'Перейти к регистрации' : 'Вернуться к авторизации'}</a>
      <button id="loginButton" class="login-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
    </div>
  </div>`
    element.innerHTML = loginHTML;

    document.getElementById("loginButton").addEventListener("click", () => {
      if (isLoginMode) {
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;

        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        loginUser({
          login: login,
          password: password,
        })
          .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchTodosAndRender();
          })
          .catch((error) => {
            // TODO: Выводить алерт красиво
            alert(error.message);
          });
      } else {
        const login = document.getElementById("login").value;
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        if (!name) {
          alert("Введите имя");
          return;
        }
        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        registerUser({
          login: login,
          name: name,
          password: password,
        })
          .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchTodosAndRender();
          })
          .catch((error) => {
            // TODO: Выводить алерт красиво
            alert(error.message);
          });

      }
    });
    document.getElementById("toggle-link").addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };
  renderForm();
}