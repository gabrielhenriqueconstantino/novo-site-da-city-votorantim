// components/HorarioEditor.jsx
import React, { useState, useEffect } from "react";
import "../styles/HorarioEditor.css";

const HorarioEditor = ({ linhaId, onClose }) => {
  const [dadosHorarios, setDadosHorarios] = useState(null);
  const [periodo, setPeriodo] = useState("dias_uteis");
  const [sentido, setSentido] = useState("BAIRRO");
  const [horarios, setHorarios] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingDados, setLoadingDados] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dados atualizados do backend quando o modal abrir ou linhaId mudar
  useEffect(() => {
    const fetchDados = async () => {
      setLoadingDados(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/api/horarios");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setDadosHorarios(data);

        // Após carregar os dados, setar horários do período e sentido atuais
        const linha = data.linhas[linhaId];
        if (linha) {
          setPeriodo("dias_uteis");
          setSentido(Object.keys(linha.dias_uteis || {})[0] || "BAIRRO");

          const horariosPeriodo = linha.dias_uteis?.[Object.keys(linha.dias_uteis || {})[0]];
          if (typeof horariosPeriodo === "string") {
            setHorarios([horariosPeriodo]);
          } else if (Array.isArray(horariosPeriodo)) {
            setHorarios([...horariosPeriodo]);
          } else {
            setHorarios([]);
          }
        } else {
          setError(`Linha ${linhaId} não encontrada.`);
        }
      } catch (err) {
        setError(`Erro ao carregar dados: ${err.message}`);
      } finally {
        setLoadingDados(false);
      }
    };

    fetchDados();
  }, [linhaId]);

  // Atualizar horários quando muda o período ou sentido
  useEffect(() => {
    if (!dadosHorarios) return;

    const linha = dadosHorarios.linhas[linhaId];
    if (!linha) return;

    const horariosPeriodo = linha[periodo]?.[sentido];

    if (typeof horariosPeriodo === "string") {
      setHorarios([horariosPeriodo]);
    } else if (Array.isArray(horariosPeriodo)) {
      setHorarios([...horariosPeriodo]);
    } else {
      setHorarios([]);
    }
  }, [periodo, sentido, linhaId, dadosHorarios]);

  const handleHorarioChange = (index, novoValor) => {
    const novosHorarios = [...horarios];
    novosHorarios[index] = novoValor;
    setHorarios(novosHorarios);
  };

  const adicionarHorario = () => {
    setHorarios([...horarios, ""]);
  };

  const removerHorario = (index) => {
    if (window.confirm("Tem certeza que deseja remover este horário?")) {
      const novosHorarios = [...horarios];
      novosHorarios.splice(index, 1);
      setHorarios(novosHorarios);
    }
  };

  const salvar = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/editar-horarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linha_id: linhaId,
          periodo,
          sentido,
          horarios,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Horários salvos com sucesso!");
        onClose();
      } else {
        alert(`Erro: ${data.erro}`);
      }
    } catch (error) {
      console.error("Erro ao salvar horários:", error);
      alert("Erro ao se comunicar com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingDados) {
    return (
      <div className="editor-modal-overlay">
        <div className="editor-modal">
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="editor-modal-overlay">
        <div className="editor-modal">
          <div className="editor-header">
            <h2>Erro</h2>
            <button onClick={onClose} className="close-button">&times;</button>
          </div>
          <div className="editor-content">
            <p>{error}</p>
            <button onClick={onClose} className="cancel-btn">Fechar</button>
          </div>
        </div>
      </div>
    );
  }

  const linha = dadosHorarios.linhas[linhaId];
  const periodosDisponiveis = Object.keys(linha).filter((key) =>
    ["dias_uteis", "sabados", "domingos_feriados"].includes(key)
  );
  const sentidosDisponiveis = linha[periodo] ? Object.keys(linha[periodo]) : [];

  return (
    <div className="editor-modal-overlay">
      <div className="editor-modal">
        <div className="editor-header">
          <h2>
            Edição de Horários - Linha {linhaId}: {linha.nome}
          </h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>

        <div className="editor-controls">
          <div className="control-group">
            <label htmlFor="periodo-select">Período:</label>
            <select
              id="periodo-select"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="periodo-select"
            >
              {periodosDisponiveis.map((p) => (
                <option key={p} value={p}>
                  {p === "dias_uteis"
                    ? "Dias Úteis"
                    : p === "sabados"
                    ? "Sábados"
                    : "Domingos/Feriados"}
                </option>
              ))}
            </select>
          </div>

          {sentidosDisponiveis.length > 0 && (
            <div className="direction-buttons">
              {sentidosDisponiveis.map((s) => (
                <button
                  key={s}
                  onClick={() => setSentido(s)}
                  className={`direction-btn ${sentido === s ? "active" : ""}`}
                >
                  {s === "BAIRRO"
                    ? "↻ Bairro"
                    : s === "CENTRO"
                    ? "↺ Centro"
                    : s === "SHOPPING"
                    ? "🛍️ Shopping"
                    : s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="horario-table-container">
          <table className="horario-table">
            <thead>
              <tr>
                <th>Horário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {horarios.length > 0 ? (
                horarios.map((horario, idx) => (
                  <tr key={idx}>
                    <td>
                      {typeof horario === "string" &&
                      horario.includes("NÃO HÁ CIRCULAÇÃO") ? (
                        <div className="no-circulation">{horario}</div>
                      ) : (
                        <input
                          type="text"
                          value={horario}
                          onChange={(e) =>
                            handleHorarioChange(idx, e.target.value)
                          }
                          className="time-input"
                          placeholder="HH:MM"
                        />
                      )}
                    </td>
                    <td>
                      {!horario.includes("NÃO HÁ CIRCULAÇÃO") && (
                        <button
                          onClick={() => removerHorario(idx)}
                          className="remove-btn"
                          aria-label="Remover horário"
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="empty-message">
                    Nenhum horário cadastrado para este período/sentido
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="editor-actions">
          {!horarios.some(
            (h) => typeof h === "string" && h.includes("NÃO HÁ CIRCULAÇÃO")
          ) && (
            <button
              onClick={adicionarHorario}
              className="add-btn"
              disabled={isSubmitting}
            >
              + Adicionar Horário
            </button>
          )}
          <div className="action-buttons">
            <button
              onClick={salvar}
              className="save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </button>
            <button
              onClick={onClose}
              className="cancel-btn"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorarioEditor;
