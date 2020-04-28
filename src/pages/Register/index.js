import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { api } from "../../services/api";

import "./styles.css";

import logo from "../../assets/logo.svg";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const data = { name, email, whatsapp, city, uf };
      const response = await api.post("/ongs", data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push("/");
    } catch (error) {
      console.error(error);
      alert("Falha ao registrar a ONG!");
    }
  };

  return (
    <div className="container register-container">
      <div className="row content">
        <section className="col-md-6">
          <img src={logo} alt="Be The Hero" className="img-fluid" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude a encontrarem os
            casos da sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleRegister} className="col-md-6 mt-3">
          <input
            placeholder="Nome da ONG"
            value={name.toUpperCase()}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp.toUpperCase()}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city.toUpperCase()}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf.toUpperCase()}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>
          <button type="submit" className="button mb-4">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
