
import { useState } from "react";
import TurmaForm from "./components/TurmaForm";
import TurmaList from "./components/TurmaList";

export default function App() {

  const [turmas, setTurmas] = useState([]);

  function adicionarTurma(novaTurma) {
    setTurmas((turmasAtuais) => [
      ...turmasAtuais,
      novaTurma,
    ]);
  }

  return (
    <main className="app-container">
      <header className="page-header">
        <h1 className="page-title">Minhas turmas</h1>
        <p className="page-description">
          Gerencie suas turmas, alunos e presenças.
        </p>
      </header>

      <TurmaForm onAdicionarTurma={adicionarTurma} />

      <section style={{ marginTop: "28px" }}>
        <h2 className="card-title">
          Turmas cadastradas ({turmas.length})
        </h2>

        <TurmaList turmas={turmas} />
      </section>
    </main>
  );
}
