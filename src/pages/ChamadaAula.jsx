
import { useState } from "react";

export default function ChamadaAula({
  aula,
  alunos,
  presencas,
  onSalvarPresencas,
  onVoltar,
}) {
  const [listaPresenca, setListaPresenca] = useState(() =>
    alunos.map((aluno) => {
      const registro = presencas.find(
        (item) =>
          item.aulaId === aula.id &&
          item.alunoId === aluno.id
      );

      return {
        alunoId: aluno.id,
        presente: registro ? registro.presente : true,
      };
    })
  );

  function alterarPresenca(alunoId, presente) {
    setListaPresenca((atuais) =>
      atuais.map((item) =>
        item.alunoId === alunoId
          ? { ...item, presente }
          : item
      )
    );
  }

  function salvarChamada(evento) {
    evento.preventDefault();
    onSalvarPresencas(aula.id, listaPresenca);
    onVoltar();
  }

  return (
    <>
      <button
        className="btn btn-secondary back-button"
        onClick={onVoltar}
      >
        ← Voltar para turma
      </button>

      <header className="page-header">
        <h1 className="page-title">Chamada da aula</h1>
        <p className="page-description">
          {new Date(`${aula.data}T00:00:00`).toLocaleDateString("pt-BR")}
        </p>
      </header>

      <section className="card">
        <h2 className="card-title">Lista de presença</h2>

        <p className="text-muted">
          Todos começam marcados como presentes.
          Desmarque quem faltou.
        </p>

        {alunos.length === 0 ? (
          <p className="empty-state">
            Não há alunos matriculados nesta turma.
          </p>
        ) : (
          <form onSubmit={salvarChamada}>
            <div className="list">
              {alunos.map((aluno) => {
                const registro = listaPresenca.find(
                  (item) => item.alunoId === aluno.id
                );

                return (
                  <label
                    className="list-item"
                    key={aluno.id}
                  >
                    <span className="list-item-title">
                      {aluno.nome}
                    </span>

                    <input
                      type="checkbox"
                      checked={registro?.presente ?? true}
                      onChange={(evento) =>
                        alterarPresenca(
                          aluno.id,
                          evento.target.checked
                        )
                      }
                    />
                  </label>
                );
              })}
            </div>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Salvar chamada
            </button>
          </form>
        )}
      </section>
    </>
  );
}


