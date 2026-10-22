
import TurmaForm from "../components/TurmaForm";
import TurmaList from "../components/TurmaList";

export default function Turmas({
  turmas,
  onAdicionarTurma,
  onSelecionarTurma,
}) {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Turmas</h1>
        <p className="page-description">
          Organize suas turmas em um só lugar.
        </p>
      </header>

      <TurmaForm onAdicionarTurma={onAdicionarTurma} />

      <section className="section-spacing">
        <h2 className="card-title">
          Turmas cadastradas ({turmas.length})
        </h2>

        <TurmaList
          turmas={turmas}
          onSelecionarTurma={onSelecionarTurma}
        />
      </section>
    </>
  );
}

