import { useState } from "react";
import AulaForm from "../components/AulaForm";


export default function DetalhesTurma({
  turma,
  alunos,
  matriculas,
  onAdicionarAluno,
  onRemoverAluno,
  aulas,
  onAdicionarAula,
  onVoltar,
  onAbrirAula,
}) {
  const [alunoSelecionadoId, setAlunoSelecionadoId] = useState("");

  const idsMatriculados = matriculas
    .filter((item) => item.turmaId === turma.id)
    .map((item) => item.alunoId);

  const alunosMatriculados = alunos.filter((aluno) =>
    idsMatriculados.includes(aluno.id)
  );

  const alunosDisponiveis = alunos.filter(
    (aluno) => !idsMatriculados.includes(aluno.id)
  );

  function handleSubmit(evento) {
    evento.preventDefault();

    if (!alunoSelecionadoId) return;

    onAdicionarAluno(turma.id, alunoSelecionadoId);
    setAlunoSelecionadoId("");
  }

  return (
    <>
      <button
        className="btn btn-secondary back-button"
        onClick={onVoltar}
      >
        ← Voltar para turmas
      </button>

      <header className="page-header">
        <h1 className="page-title">{turma.nome}</h1>
        <p className="page-description">
          Gerencie os alunos desta turma.
        </p>
      </header>

      <AulaForm
        turmaId={turma.id}
        onAdicionarAula={onAdicionarAula}
      />

      <section className="section-spacing">
        <h2 className="card-title">
          Aulas registradas (
          {aulas.filter((aula) => aula.turmaId === turma.id).length}
          )
        </h2>

        {aulas.filter((aula) => aula.turmaId === turma.id).length === 0 ? (
          <p className="empty-state">
            Nenhuma aula registrada ainda.
          </p>
        ) : (
          <div className="list">
            {aulas
              .filter((aula) => aula.turmaId === turma.id)
              .sort((a, b) => b.data.localeCompare(a.data))
              .map((aula) => (
                <article className="list-item" key={aula.id}>
                  <h3 className="list-item-title">
                    Aula de{" "}
                    {new Date(`${aula.data}T00:00:00`).toLocaleDateString("pt-BR")}
                  </h3>

                  <button
                    className="btn btn-secondary"
                    onClick={() => onAbrirAula(aula)} >
                    Fazer chamada
                  </button>
                </article>
              ))}
          </div>
        )}
      </section>
        &nbsp;
      <section className="card">
        <h2 className="card-title">Adicionar aluno</h2>

        {alunos.length === 0 ? (
          <p className="text-muted">
            Cadastre alunos na seção Alunos primeiro.
          </p>
        ) : alunosDisponiveis.length === 0 ? (
          <p className="text-muted">
            Todos os alunos cadastrados já estão nesta turma.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                Selecione um aluno
              </label>

              <select
                className="form-input"
                value={alunoSelecionadoId}
                onChange={(evento) =>
                  setAlunoSelecionadoId(evento.target.value)
                }
                required
              >
                <option value="">Escolha um aluno</option>

                {alunosDisponiveis.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary" type="submit">
              Adicionar à turma
            </button>
          </form>
        )}
      </section>

      <section className="section-spacing">
        <h2 className="card-title">
          Alunos matriculados ({alunosMatriculados.length})
        </h2>

        {alunosMatriculados.length === 0 ? (
          <p className="empty-state">
            Nenhum aluno associado ainda.
          </p>
        ) : (
          <div className="list">
            {alunosMatriculados.map((aluno) => (
              <article className="list-item" key={aluno.id}>
                <h3 className="list-item-title">
                  {aluno.nome}
                </h3>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Deseja remover ${aluno.nome} desta turma?`
                      )
                    ) {
                      onRemoverAluno(turma.id, aluno.id);
                    }
                  }}>
                  Remover da turma
                </button>

              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

