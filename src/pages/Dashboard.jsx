

export default function Dashboard({ alunos, turmas }) {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Visão geral</h1>
        <p className="page-description">
          Bem-vindo ao sistema de gestão de turmas.
        </p>
      </header>

      <div className="stats-grid">
        <article className="card">
          <p className="text-muted">Alunos cadastrados</p>
          <h2 className="stat-number">{alunos.length}</h2>
        </article>

        <article className="card">
          <p className="text-muted">Turmas cadastradas</p>
          <h2 className="stat-number">{turmas.length}</h2>
        </article>
      </div>
    </>
  );
}

