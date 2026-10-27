
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


  function removerAlunoDaTurma(turmaId, alunoId) {
    setMatriculas((atuais) =>
      atuais.filter(
        (matricula) =>
          !(
            matricula.turmaId === turmaId &&
            matricula.alunoId === alunoId
          )
      )
    );
  }

  function adicionarAluno(novoAluno) {
    setAlunos((atuais) => [...atuais, novoAluno]);
  }

  function editarAluno(id, dadosAtualizados) {
    setAlunos((atuais) =>
      atuais.map((aluno) =>
        aluno.id === id
          ? { ...aluno, ...dadosAtualizados }
          : aluno
      )
    );
  }

  function excluirAluno(id) {
    setAlunos((atuais) =>
      atuais.filter((aluno) => aluno.id !== id)
    );

    setMatriculas((atuais) =>
      atuais.filter((matricula) => matricula.alunoId !== id)
    );
  }
  
  function adicionarTurma(novaTurma) {
    setTurmas((turmasAtuais) => [
      ...turmasAtuais,
      novaTurma,
    ]);
  }

  function editarTurma(id, dadosAtualizados) {
    setTurmas((atuais) =>
      atuais.map((turma) =>
        turma.id === id
          ? { ...turma, ...dadosAtualizados }
          : turma
      )
    );
  }

  function excluirTurma(id) {
    setTurmas((atuais) =>
      atuais.filter((turma) => turma.id !== id)
    );

    setMatriculas((atuais) =>
      atuais.filter((matricula) => matricula.turmaId !== id)
    );

    if (turmaSelecionada?.id === id) {
      setTurmaSelecionada(null);
    }
  }

  function adicionarAlunoNaTurma(turmaId, alunoId) {
    //checa se o aluno já está matriculado na turma antes de adicionar
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

  function navegarParaPagina(id) {
    setTurmaSelecionada(null);
    setPaginaAtual(id);
  }

  function renderizarPagina() {
    
    if (turmaSelecionada) {
      return (
        <DetalhesTurma
          turma={turmaSelecionada}
          alunos={alunos}
          matriculas={matriculas}
          onAdicionarAluno={adicionarAlunoNaTurma}
          onRemoverAluno={removerAlunoDaTurma}
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
            onEditarAluno={editarAluno}
            onExcluirAluno={excluirAluno}
          />
        );

      case "turmas":
        return (
          <Turmas
            turmas={turmas}
            onAdicionarTurma={adicionarTurma}
            onSelecionarTurma={abrirTurma}
            onEditarTurma={editarTurma}
            onExcluirTurma={excluirTurma}
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
          onNavegar={navegarParaPagina}
        />
      </aside>

      <main className="main-content">
        {renderizarPagina()}
      </main>
    </div>
  );
  
}
