import { useNavigate, Link} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const { login, isLoading, error} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("")

  const handleLogin = async () => { 

    if (!email || !password) { 
      return; 
    } 

    try { 

      await login( email, password ); 
      navigate("/profile"); 

    } catch { 
      // AuthContext handelt de fout af. 
    } 
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Log in</h1>

        <p>Log in om Libri te gebruiken.</p>

        <div> 
          <label htmlFor="email">
             E-mailadres 
          </label> 
          <input id="email" type="email" value={email} 
            onChange={(event) => setEmail(event.target.value) } placeholder="jouw@email.nl" />
        </div> 
        <div> 
          <label htmlFor="password"> 
            Wachtwoord 
          </label> 
          <input id="password" type="password" value={password}
           onChange={(event) => setPassword(event.target.value) } placeholder="Wachtwoord" />
        </div> 
        {error && ( 
          <p className="login-error"> 
            {error} 
          </p> )} 
        <button onClick={handleLogin} disabled={isLoading} > 
          {isLoading ? "Inloggen..." : "Inloggen"} 
        </button> 
        <p> 
          Nog geen account?{" "} 
          <Link to="/register"> 
            Registreer hier 
          </Link> 
        </p> 
      </div>
    </div>
  );
}

export default LoginPage;
