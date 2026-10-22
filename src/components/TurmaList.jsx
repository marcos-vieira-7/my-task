

export default function TurmaList({ turmas, onSelecionarTurma }) {
  
  //renderiza uma mensagem caso não haja turmas cadastradas
  if (turmas.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhuma turma cadastrada.</p>
        <p>Comece criando sua primeira turma acima.</p>
      </div>
    );
  }

  return (
    <div className="list">
      {turmas.map((turma) => (
        <article className="list-item" key={turma.id}>
          <div>
            <h3 className="list-item-title">{turma.nome}</h3>
            <p className="text-muted">
              Turma ativa
            </p>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => onSelecionarTurma(turma.id)}>
            Abrir turma →
          </button>
        </article>
      ))}
    </div>
  );

}


