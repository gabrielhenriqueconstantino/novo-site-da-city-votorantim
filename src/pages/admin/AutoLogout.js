import { useEffect } from "react";

const AutoLogout = () => {
  useEffect(() => {
    const logout = () => {
      alert("Sessão expirada por inatividade. Você será desconectado.");
      localStorage.clear();
      window.location.href = "/login";
    };

    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 15 * 60 * 1000); // 15 minutos
    };

    // Eventos que reiniciam o timer
    const eventos = ["mousemove", "keydown", "click", "scroll"];
    eventos.forEach((e) => window.addEventListener(e, resetTimer));

    // Inicia o timer pela primeira vez
    resetTimer();

    // Cleanup ao desmontar
    return () => {
      eventos.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default AutoLogout;
