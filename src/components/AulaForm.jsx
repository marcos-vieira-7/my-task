
import { useState } from "react";

export default function AulaForm({ turmaId, onAdicionarAula }) {
  const [data, setData] = useState("");

  function handleSubmit(evento) {
    evento.preventDefault();

    if (!data) return;

    onAdicionarAula(turmaId, data);
    setData("");
  }

  return (
    <section className="card">
      <h2 className="card-title">Registrar aula</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="data-aula">
            Data da aula
          </label>

          <input
            id="data-aula"
            className="form-input"
            type="date"
            value={data}
            onChange={(evento) => setData(evento.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Registrar aula
        </button>
      </form>
    </section>
  );
  
}

