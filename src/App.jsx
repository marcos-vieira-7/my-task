
import { useState } from "react";
import "./styles/global.css";

import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import Turmas from "./pages/Turmas";

import TurmaForm from "./components/TurmaForm";
import TurmaList from "./components/TurmaList";
import AlunoForm from "./components/AlunoForm";
import AlunoList from "./components/AlunoList";

import DetalhesTurma from "./pages/DetalhesTurma";

export default function App() {
  
  const [paginaAtual, setPaginaAtual] = useState("dashboard");
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [matriculas, setMatriculas] = useState([]);

  function adicionarAluno(novoAluno) {
    setAlunos((atuais) => [...atuais, novoAluno]);
  }
  
  function adicionarTurma(novaTurma) {
    setTurmas((turmasAtuais) => [
      ...turmasAtuais,
      novaTurma,
    ]);
  }

  function adicionarAlunoNaTurma(turmaId, alunoId) {
    setMatriculas((atuais) => {
      const jaMatriculado = atuais.some(
        (item) =>
          item.turmaId === turmaId &&
          item.alunoId === alunoId
      );

      if (jaMatriculado) return atuais;

      return [...atuais, { turmaId, alunoId }];
    });
  }

  function abrirTurma(id) {
    const turma = turmas.find((item) => item.id === id);
    setTurmaSelecionada(turma);
  }

  function renderizarPagina() {
    
    if (turmaSelecionada) {
      return (
        <DetalhesTurma
          turma={turmaSelecionada}
          alunos={alunos}
          matriculas={matriculas}
          onAdicionarAluno={adicionarAlunoNaTurma}
          onVoltar={() => setTurmaSelecionada(null)}
        />
      );
    }
    switch (paginaAtual) {
      case "alunos":
        return (
          <Alunos
            alunos={alunos}
            onAdicionarAluno={adicionarAluno}
          />
        );

      case "turmas":
        return (
          <Turmas
            turmas={turmas}
            onAdicionarTurma={adicionarTurma}
            onSelecionarTurma={abrirTurma}
          />
        );

      default:
        return (
          <Dashboard alunos={alunos} turmas={turmas} />
        );
    }
  }


  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">G</span>
          <span>Gestão de Turmas</span>
        </div>

        <Menu
          paginaAtual={paginaAtual}
          onNavegar={setPaginaAtual}
        />
      </aside>

      <main className="main-content">
        {renderizarPagina()}
      </main>
    </div>
  );
  
}
