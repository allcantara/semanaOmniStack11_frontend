import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { api } from "../../services/api";

import "./styles.css";

import logo from "../../assets/logo.svg";

export default () => {
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const handleNewIncident = async (event) => {
    event.preventDefault();
    try {
      const data = { title, description, value };
      await api.post("/incidents", data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push("/profile");
    } catch (error) {
      console.error(error);
      alert("Falha ao cadastrar, tente novamente!");
    }
  };

  return (
    <div className="container new-incident-container">
      <div className="row content">
        <section className="col-md-6">
          <img src={logo} alt="Be The Hero" className="img-fluid" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleNewIncident} className="col-md-6 mt-3">
          <input
            placeholder="Título do caso"
            value={title.toUpperCase()}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description.toUpperCase()}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="button mb-3">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
