import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    login("Thijs Vernooij", "student");
    navigate("/home");
  };

  const handleTeacherLogin = () => {
    login("Mvr. Janssen", "docent");
    navigate("/docent");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Inloggen</h1>

        <p>Log in om Libri te gebruiken.</p>

        <div className="login-buttons">
          <button onClick={handleStudentLogin}>Inloggen als student</button>

          <button onClick={handleTeacherLogin}>Inloggen als docent</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
