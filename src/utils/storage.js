
export function carregarDados(chave) {
  const dadosSalvos = localStorage.getItem(chave);

  if (!dadosSalvos) {
    return [];
  }

  try {
    return JSON.parse(dadosSalvos);
  } catch {
    return [];
  }
}

export function salvarDados(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}
