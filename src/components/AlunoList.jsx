

export default function AlunoList({ alunos }) {
  if (alunos.length === 0) {
    return (
      <div className="empty-state">
        Nenhum aluno cadastrado.
      </div>
    );
  }

  return (
    <div className="list">
      {alunos.map((aluno) => (
        <article className="list-item" key={aluno.id}>
          <div className="student-info">
            <div className="student-avatar">
              {aluno.nome.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="list-item-title">
                {aluno.nome}
              </h3>

              <p className="text-muted">
                {aluno.ativo ? "Aluno ativo" : "Aluno inativo"}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}


