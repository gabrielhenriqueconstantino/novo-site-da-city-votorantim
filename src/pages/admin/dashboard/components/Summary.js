import React, { useState, useEffect } from "react";
import "../styles/Summary.css";
import { FaBusAlt, FaRegIdCard, FaUsers, FaBell } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Summary = () => {
  const [horariosData, setHorariosData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/horarios")
      .then((res) => res.json())
      .then((data) => {
        setHorariosData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados de horários:", err);
        setLoading(false);
      });
  }, []);

  const totalLinhas = horariosData ? Object.keys(horariosData.linhas).length : 0;

  const data = [
    {
      title: "LINHAS MUNICIPAIS",
      value: totalLinhas,
      icon: <FaBusAlt />,
      className: "summary-card summary-blue",
    },
    {
      title: "SOLICITAÇÕES DE CARTÃO",
      value: 25,
      icon: <FaRegIdCard />,
      className: "summary-card summary-orange",
    },
    {
      title: "RECLAMAÇÕES",
      value: 1500,
      icon: <FaBell />,
      className: "summary-card summary-green",
    },
    {
      title: "ACESSOS",
      value: 56,
      icon: <FaUsers />,
      className: "summary-card summary-red",
    },
  ];

  const acessosLinhas = [
    { linha: "3118", acessos: 120 },
    { linha: "3120", acessos: 95 },
    { linha: "3105", acessos: 80 },
    { linha: "3200", acessos: 75 },
    { linha: "3102", acessos: 60 },
  ];

  const tiposCartao = [
    { tipo: "Comum", valor: 40 },
    { tipo: "Estudante", valor: 25 },
    { tipo: "Idoso", valor: 20 },
    { tipo: "VT", valor: 15 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (loading || !horariosData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="summary-container">
      <h2 className="summary-title">DASHBOARD</h2>

      <div className="summary-grid">
        {data.map((item, index) => (
          <div key={index} className={item.className}>
            <div className="summary-text">
              <p className="summary-label">{item.title}</p>
              <p className="summary-value">{item.value.toLocaleString()}</p>
            </div>
            <div className="summary-icon">{item.icon}</div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3 className="chart-title">Linhas Mais Acessadas (Últimos 30 dias)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={acessosLinhas}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis
                type="number"
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                dataKey="linha"
                type="category"
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={{ stroke: '#E5E7EB' }}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  background: '#1F2937',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#F9FAFB',
                }}
              />
              <Bar
                dataKey="acessos"
                fill="#3B82F6"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Distribuição de Solicitações de Cartões</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tiposCartao}
                dataKey="valor"
                nameKey="tipo"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={60}
                paddingAngle={2}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {tiposCartao.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} solicitações`, name]}
                contentStyle={{
                  background: '#1F2937',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#F9FAFB',
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Summary;
