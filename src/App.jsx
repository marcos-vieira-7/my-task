
import { useState } from "react";
import TurmaForm from "./components/TurmaForm";
import TurmaList from "./components/TurmaList";
import AlunoForm from "./components/AlunoForm";
import AlunoList from "./components/AlunoList";

export default function App() {

  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);

  function adicionarAluno(novoAluno) {
    setAlunos((atuais) => [...atuais, novoAluno]);
  }
  
  function adicionarTurma(novaTurma) {
    setTurmas((turmasAtuais) => [
      ...turmasAtuais,
      novaTurma,
    ]);
  }

  return (
    <main className="app-container">
      <header className="page-header">
        <h1 className="page-title">Gestão de turmas</h1>
        <p className="page-description">
          Gerencie seus alunos e organize suas turmas.
        </p>
      </header>

      <section>
        <AlunoForm onAdicionarAluno={adicionarAluno} />

        <div className="section-spacing">
          <h2 className="card-title">
            Alunos cadastrados ({alunos.length})
          </h2>

          <AlunoList alunos={alunos} />
        </div>
      </section>

      <section className="section-spacing">
        <TurmaForm onAdicionarTurma={adicionarTurma} />

        <div className="section-spacing">
          <h2 className="card-title">
            Turmas cadastradas ({turmas.length})
          </h2>

          <TurmaList
            turmas={turmas}
            onSelecionarTurma={(id) =>
              console.log("Turma selecionada:", id)
            }
          />
        </div>
      </section>

    </main>
  );
}
