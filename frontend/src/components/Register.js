import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

function Register({onRegister, ...props}) {


  return (
    <>
      <AuthForm
        headerText="Регистрация"
        btnText="Зарегистрироваться"
        onSubmit={onRegister}
      />
      <p className="auth__footnote">
        Уже зарегистрированы? <Link className="link" to="/sign-in">Войти</Link>
      </p>

    </>
  );
}

export default Register;
