import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import { api } from "../../services/api";

import "./styles.css";

import heroesImg from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";

export default () => {
  const [id, setId] = useState("");

  const history = useHistory();

  const handleLogon = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (error) {
      console.error(error);
      alert("Falha ao fazer logon, tente novamente!");
    }
  };

  return (
    <div className="container logon-container">
      <div className="row p-5">
        <div className="col-md-6">
          <section className="form">
            <img src={logo} alt="Be The Hero" className="img-fluid mt-5" />
            <form onSubmit={handleLogon} className="ml-dm-5 mr-md-5">
              <h1>Faça seu logon</h1>
              <input
                placeholder="Sua ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <button className="button" type="submit">
                Entrar
              </button>
              <Link className="back-link" to="/register">
                <FiLogIn size={16} color="#E02041" />
                Não tenho cadastro
              </Link>
            </form>
          </section>
        </div>

        <div className="col-md-6 py-4 mt-3">
          <img src={heroesImg} alt="Heroes" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};
