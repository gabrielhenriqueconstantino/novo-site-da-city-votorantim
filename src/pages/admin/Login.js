import React, { useState, useEffect } from "react";
import "./Login.css";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [clicked, setClicked] = useState(false);

  const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
  setClicked(true);
  setTimeout(() => setClicked(false), 500);
  };

  useEffect(() => {
    // Rolando para o topo quando o componente é montado
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="login-container">
      <img src='/img/city_bg.jpg' alt="background" />
      <div className="login-card">
        {/* Lado esquerdo - Novo Login */}
        <div className="login-left">
          <h2>BEM VINDO!</h2>
          <p>Acesso ao painel administrativo da City Transportes.</p>
          <img src="/img/dashboard.png" alt="dashboard" />
        </div>

        {/* Lado direito - Fazer Login */}
        <div className="login-right">
          <h2>FAÇA LOGIN</h2>
          <div className="input-group">
            <span className="input-icon">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="USUÁRIO"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-with-icon"
            />
          </div>
          <div className="input-group">
            <span className="input-icon">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="SENHA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-with-icon"
            />
           <span
            className={`eye-icon ${clicked ? 'clicked' : ''}`}
            onClick={togglePasswordVisibility}
            >
            {showPassword ? (
              <FaEyeSlash size={14} className="eye-icon-svg" />
            ) : (
            <FaEye size={14} className="eye-icon-svg" />
            )}
          </span>
          </div>
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" className="custom-checkbox" />
              <span className="checkmark"></span>
              Lembrar de mim
            </label>
              <a href="#" className="forgot-password">Esqueceu a senha?</a>
          </div>
          <button className="login-button">ENTRAR</button>
          <div className="social-icons">
            <i className="icon facebook"></i>
            <i className="icon tiktok"></i>
            <i className="icon instagram"></i>
            <i className="icon twitter"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;