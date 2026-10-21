

export default function Menu({ paginaAtual, onNavegar }) {
  const paginas = [
    { id: "dashboard", nome: "Dashboard", icone: "⌂" },
    { id: "alunos", nome: "Alunos", icone: "♙" },
    { id: "turmas", nome: "Turmas", icone: "▤" },
  ];

  return (
    <nav className="main-menu">
      {paginas.map((pagina) => (
        <button
          key={pagina.id}
          className={`menu-item ${
            paginaAtual === pagina.id ? "active" : ""
          }`}
          onClick={() => onNavegar(pagina.id)}
        >
          <span>{pagina.icone}</span>
          {pagina.nome}
        </button>
      ))}
    </nav>
  );
}

