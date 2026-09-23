import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./RegisterPage.css";

function RegisterPage() {

  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleRegister = async () => {

    setValidationError("");

    if (!name || !email || !password || !confirmPassword) {
      setValidationError("Vul alle velden in.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("De wachtwoorden komen niet overeen.");
      return;
    }

    try {
      await register(name, email, password);
      navigate("/login");
    } catch {
      // AuthContext handelt de fout af. 
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Registreer</h1>

        <p>Registreer om Libri te kunnen gebruiken.</p>

        <div> 
          <label htmlFor="name"> 
            Naam 
          </label> 
          <input id="name" type="text" value={name} 
            onChange={(event) => setName(event.target.value)} placeholder="Je naam" /> 
        </div> 
        <div> 
          <label htmlFor="email">
             E-mailadres 
          </label> 
          <input id="email" type="email" value={email} 
            onChange={(event) => setEmail(event.target.value)} placeholder="jouw@email.nl" />
        </div> 
        <div> 
          <label htmlFor="password"> 
            Wachtwoord 
          </label> 
          <input id="password" type="password" value={password} 
            onChange={(event) => setPassword(event.target.value)} placeholder="Wachtwoord" />
        </div> 
        <div> 
          <label htmlFor="confirmPassword">
            Wachtwoord bevestigen 
          </label> 
          <input id="confirmPassword" type="password" value={confirmPassword} 
            onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Herhaal je wachtwoord" />
        </div> 
        
        {(validationError || error) && (
          <p className="register-error"> 
            {validationError || error} 
          </p>
        )} 
          <button onClick={handleRegister} disabled={isLoading} >
            {isLoading ? "Registreren..." : "Registreren"} 
          </button> 
          <p> Heb je al een account?{" "} 
            <Link to="/login">
             Log hier in 
            </Link> 
          </p> 
      </div >
    </div >
  );
}

export default RegisterPage;