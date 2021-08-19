const getDescAreaModulo = (areaModulo) => {

    let descricao = ""

    if (areaModulo === "A1") descricao = "A - Administrativa / 1 - Contabilidade/Custos"
    if (areaModulo === "A2") descricao = "A - Administrativa / 2 - Fiscal"
    if (areaModulo === "A3") descricao = "A - Administrativa / 3 - Suprimentos"
    if (areaModulo === "A4") descricao = "A - Administrativa / 4 - Financeiro"
    if (areaModulo === "A5") descricao = "A - Administrativa / 5 - R.H."
    if (areaModulo === "A6") descricao = "A - Administrativa / 6 - Tecnologia"
    if (areaModulo === "C1") descricao = "C - Comercial / 1 - Vendas"
    if (areaModulo === "C2") descricao = "C - Comercial / 2 - Exportação"
    if (areaModulo === "C3") descricao = "C - Comercial / 3 - E-Commerce"
    if (areaModulo === "C4") descricao = "C - Comercial / 4 - Varejo"
    if (areaModulo === "C5") descricao = "C - Comercial / 5 - Faturamento/Logística"
    if (areaModulo === "C6") descricao = "C - Comercial / 6 - Estoques"
    if (areaModulo === "I1") descricao = "I - Industrial / 1 - Planejamento"
    if (areaModulo === "I2") descricao = "I - Industrial / 2 - Confecção"
    if (areaModulo === "I3") descricao = "I - Industrial / 3 - Têxtil"
    if (areaModulo === "I4") descricao = "I - Industrial / 4 - Serviços"
    if (areaModulo === "I5") descricao = "I - Industrial / 5 - Eficiência"
    if (areaModulo === "I6") descricao = "I - Industrial / 6 - Manutenção"
    if (areaModulo === "P1") descricao = "P - Produto / 1 - Projetos"
    if (areaModulo === "P2") descricao = "P - Produto / 2 - Engenharia"

    return descricao;
}

const normalizeProgramas = (dados) => {
    return dados.map((c) => {
        return {
            id: c.id,
            areaModulo: `${getDescAreaModulo(c.areaModulo)}`,
            atividade: c.atividade,
            descricao: c.descricao,
            ferramenta: c.ferramenta,
            frequencia: c.frequencia,
            planilha: c.planilha,
            extrator: c.extrator,
            help:c.help
        };
    });
};

export default normalizeProgramas;