
import { useState } from "react";

function AlunoList({ alunos, onEditarAluno, onExcluirAluno }) {
  const [alunoEditandoId, setAlunoEditandoId] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");

  function iniciarEdicao(aluno) {
    setAlunoEditandoId(aluno.id);
    setNomeEditado(aluno.nome);
  }

  function salvarEdicao(id) {
    const nome = nomeEditado.trim();

    if (!nome) return;

    onEditarAluno(id, { nome });
    setAlunoEditandoId(null);
    setNomeEditado("");
  }

  if (alunos.length === 0) {
    return (
      <p className="empty-state">
        Nenhum aluno cadastrado ainda.
      </p>
    );
  }

  return (
    <div className="list">
      {alunos.map((aluno) => (
        <article className="list-item" key={aluno.id}>
          {alunoEditandoId === aluno.id ? (
            <div className="form-group">
              <label className="form-label">
                Nome do aluno
              </label>

              <input
                className="form-input"
                value={nomeEditado}
                onChange={(evento) =>
                  setNomeEditado(evento.target.value)
                }
              />

              <button
                className="btn btn-primary"
                onClick={() => salvarEdicao(aluno.id)}
              >
                Salvar
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setAlunoEditandoId(null)}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <>
              <div>
                <h3 className="list-item-title">
                  {aluno.nome}
                </h3>
              </div>

              <div className="turma-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => iniciarEdicao(aluno)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Deseja excluir o aluno ${aluno.nome}?`
                      )
                    ) {
                      onExcluirAluno(aluno.id);
                    }
                  }}
                >
                  Excluir
                </button>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
}

export default AlunoList;
