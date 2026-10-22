
import AlunoForm from "../components/AlunoForm";
import AlunoList from "../components/AlunoList";

export default function Alunos({ alunos, onAdicionarAluno }) {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Alunos</h1>
        <p className="page-description">
          Gerencie os alunos cadastrados no sistema.
        </p>
      </header>

      <AlunoForm onAdicionarAluno={onAdicionarAluno} />

      <section className="section-spacing">
        <h2 className="card-title">
          Todos os alunos ({alunos.length})
        </h2>
        <AlunoList alunos={alunos} />
      </section>
    </>
  );
}

