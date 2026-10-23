
import { useState } from "react";

export default function TurmaList({
  turmas,
  onSelecionarTurma,
  onEditarTurma,
  onExcluirTurma,
}) {
  const [turmaEditandoId, setTurmaEditandoId] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");

  function iniciarEdicao(turma) {
    setTurmaEditandoId(turma.id);
    setNomeEditado(turma.nome);
  }

  function salvarEdicao(id) {
    const nome = nomeEditado.trim();

    if (!nome) return;

    onEditarTurma(id, { nome });
    setTurmaEditandoId(null);
    setNomeEditado("");
  }

  if (turmas.length === 0) {
    return (
      <p className="empty-state">
        Nenhuma turma cadastrada ainda.
      </p>
    );
  }

  return (
    <div className="list">
      {turmas.map((turma) => (
        <article className="list-item" key={turma.id}>
          {turmaEditandoId === turma.id ? (
            <div className="form-group">
              <label className="form-label">
                Nome da turma
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
                onClick={() => salvarEdicao(turma.id)}
              >
                Salvar
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setTurmaEditandoId(null)}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <>
              <div>
                <h3 className="list-item-title">
                  {turma.nome}
                </h3>

                <p className="text-muted">
                  Turma ativa
                </p>
              </div>

              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => onSelecionarTurma(turma.id)}
                >
                  Abrir turma
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => iniciarEdicao(turma)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Deseja excluir a turma ${turma.nome}?`
                      )
                    ) {
                      onExcluirTurma(turma.id);
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

