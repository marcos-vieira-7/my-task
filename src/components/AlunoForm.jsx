
import { useState } from "react";

export default function AlunoForm({ onAdicionarAluno }) {
  const [nome, setNome] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const nomeFormatado = nome.trim();

    if (!nomeFormatado) return;

    onAdicionarAluno({
      id: crypto.randomUUID(),
      nome: nomeFormatado,
      ativo: true,
    });

    setNome("");
  }

  return (
    <section className="card">
      <h2 className="card-title">Cadastrar aluno</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="nomeAluno">
            Nome completo
          </label>

          <input
            className="form-input"
            id="nomeAluno"
            type="text"
            placeholder="Digite o nome do aluno"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          + Cadastrar aluno
        </button>
      </form>
    </section>
  );
}
