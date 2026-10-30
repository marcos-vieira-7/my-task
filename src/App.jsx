
import { useState, useEffect } from "react";
import "./styles/global.css";
import { carregarDados, salvarDados } from "./utils/storage";

import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import Turmas from "./pages/Turmas";

import TurmaForm from "./components/TurmaForm";
import TurmaList from "./components/TurmaList";
import AlunoForm from "./components/AlunoForm";
import AlunoList from "./components/AlunoList";

import DetalhesTurma from "./pages/DetalhesTurma";
import ChamadaAula from "./pages/ChamadaAula";

export default function App() {
  
  const [paginaAtual, setPaginaAtual] = useState("dashboard");

  const [alunos, setAlunos] = useState(
    () => carregarDados("alunos")
  );
  const [turmas, setTurmas] = useState(
    () => carregarDados("turmas")
  );
  const [matriculas, setMatriculas] = useState(
    () => carregarDados("matriculas")
  );

  const [aulas, setAulas] = useState(
  () => carregarDados("aulas")
  );
  const [presencas, setPresencas] = useState(
    () => carregarDados("presencas")
  );

  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [aulaSelecionada, setAulaSelecionada] = useState(null);
  
  useEffect(() => {
    salvarDados("alunos", alunos);
  }, [alunos]);

  useEffect(() => {
    salvarDados("turmas", turmas);
  }, [turmas]);

  useEffect(() => {
    salvarDados("matriculas", matriculas);
  }, [matriculas]);

  useEffect(() => {
    salvarDados("aulas", aulas);
  }, [aulas]);

  useEffect(() => {
    salvarDados("presencas", presencas);
  }, [presencas]);


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

  function adicionarAula(turmaId, data) {
    const novaAula = {
      id: crypto.randomUUID(),
      turmaId,
      data,
    };

    setAulas((atuais) => [...atuais, novaAula]);
  }

  function navegarParaPagina(id) {
    setTurmaSelecionada(null);
    setPaginaAtual(id);
  }

  function salvarPresencas(aulaId, listaPresenca) {
    setPresencas((atuais) => {
      const outrasPresencas = atuais.filter(
        (item) => item.aulaId !== aulaId
      );

      const novasPresencas = listaPresenca.map((item) => ({
        aulaId,
        alunoId: item.alunoId,
        presente: item.presente,
      }));

      return [...outrasPresencas, ...novasPresencas];
    });
  }

  function renderizarPagina() {
    
    if (aulaSelecionada) {
      const matriculasDaTurma = matriculas.filter(
        (item) => item.turmaId === aulaSelecionada.turmaId
      );

      const alunosDaTurma = alunos.filter((aluno) =>
        matriculasDaTurma.some(
          (matricula) => matricula.alunoId === aluno.id
        )
      );

      return (
        <ChamadaAula
          aula={aulaSelecionada}
          alunos={alunosDaTurma}
          presencas={presencas}
          onSalvarPresencas={salvarPresencas}
          onVoltar={() => setAulaSelecionada(null)}
        />
      );
    }

    if (turmaSelecionada) {
      return (
        <DetalhesTurma
          turma={turmaSelecionada}
          alunos={alunos}
          matriculas={matriculas}
          onAdicionarAluno={adicionarAlunoNaTurma}
          onRemoverAluno={removerAlunoDaTurma}
          onVoltar={() => setTurmaSelecionada(null)}
          aulas={aulas}
          onAdicionarAula={adicionarAula}
          onAbrirAula={(aula) => setAulaSelecionada(aula)}
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
