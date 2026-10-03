import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTeachers } from "../../api/teacherApi";
import type { Teacher } from "../../api/teacherApi";
import "./RegisterPage.css";

function RegisterPage() {

  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [validationError, setValidationError] = useState("");
  const [teachersLoading, setTeachersLoading] = useState(true);

  useEffect(() => {

    const loadTeachers = async () => {

      try {

        const teachers = await getTeachers();
        console.log("Teachers response:", teachers);

        setTeachers(teachers.teachers);

      } catch {

        setValidationError(
          "De docenten konden niet worden opgehaald."
        );

      } finally {

        setTeachersLoading(false);

      }
    };

    loadTeachers();

  }, []);

  const handleRegister = async () => {

    setValidationError("");

    if (!name || !email || !password || !confirmPassword || !teacherId) {
      setValidationError("Vul alle velden in.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("De wachtwoorden komen niet overeen.");
      return;
    }

    try {
      await register(name, email, password, teacherId);
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
        <div>

          <label htmlFor="teacher">
            Docent
          </label>

          <select
            id="teacher"
            value={teacherId}
            onChange={(event) =>
              setTeacherId(event.target.value)
            }
            disabled={teachersLoading}
          >

            <option value="">
              {teachersLoading
                ? "Docenten laden..."
                : "Kies je docent"}
            </option>

            {teachers.map((teacher) => (
              <option
                key={teacher.id}
                value={teacher.id}
              >
                {teacher.name}
              </option>
            ))}

          </select>

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
            <Link to="/login" onClick={clearError}>
             Log hier in 
            </Link> 
          </p> 
      </div >
    </div >
  );
}

export default RegisterPage;