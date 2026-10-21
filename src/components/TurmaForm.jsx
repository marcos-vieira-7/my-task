import { useState } from "react";

export default function TurmaForm({ onAdicionarTurma }) {

  const [nome, setNome] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!nome.trim()) return;

    onAdicionarTurma({
      id: Date.now(),
      nome: nome.trim(),
      ativa: true,
    });

    setNome("");
  }

  return (
    <section className="card">
      <h2 className="card-title">Nova turma</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="nomeTurma">
            Nome da turma
          </label>

          <input
            className="form-input"
            id="nomeTurma"
            type="text"
            placeholder="Ex.: Turma de domingo"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Cadastrar turma
        </button>
      </form>
    </section>
  );
}
