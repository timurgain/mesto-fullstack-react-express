import AuthForm from "./AuthForm";

function Login({ onLogin, ...props }) {
  return (
    <AuthForm headerText="Вход" btnText="Войти" onSubmit={onLogin} />
  )
}

export default Login;
