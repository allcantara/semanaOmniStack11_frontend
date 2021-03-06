import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import { api } from "../../services/api";

import "./styles.css";

import logo from "../../assets/logo.svg";

export default () => {
  const history = useHistory();
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function getIncidens() {
      try {
        const response = await api.get("profile", {
          headers: {
            Authorization: ongId,
          },
        });
        setIncidents(response.data);
      } catch (error) {
        console.error(error);
        alert("Falha ao buscar os incidentes!");
      }
    }

    getIncidens();
  }, [ongId]);

  const handleDeleteIncident = async (id) => {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert("Falha ao excluir!");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="container profile-container">
      <header className="row text-center text-sm-left">
        <div className="col-sm-6 mb-4 mb-md-0">
          <img src={logo} alt="Be The Hero" className="img-fluid mb-1" />
          <br />
          <span>Bem vindo(a), {ongName}</span>
        </div>

        <div className="col-sm-6 d-sm-flex ml-sm-auto">
          <Link className="button incident-button" to="/incidents/new">
            Novo caso
          </Link>
          <button type="button" onClick={() => handleLogout()}>
            <FiPower size={18} color="#e02041" />
          </button>
        </div>
      </header>

      <h1>Casos cadastrados</h1>

      <ul className="row">
        {incidents.map((item) => (
          <li key={item.id} className="col-sm-12 col-md-6 mt-3">
            <div>
              <strong>CASO:</strong>
              <p>{item.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{item.description}</p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.value)}
              </p>

              <button
                type="button"
                onClick={() => handleDeleteIncident(item.id)}
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
