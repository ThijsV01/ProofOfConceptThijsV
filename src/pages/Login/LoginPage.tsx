import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    login("Thijs Vernooij","thijsvernooij01@gmail.com", "student");
    navigate("/home");
  };

  const handleTeacherLogin = () => {
    login("Mvr. Janssen","janssen@test.nl", "docent");
    navigate("/docent");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Log in</h1>

        <p>Log in to use Libri.</p>

        <div className="login-buttons">
          <button onClick={handleStudentLogin}>Log in as student</button>

          <button onClick={handleTeacherLogin}>Log in as teacher</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
