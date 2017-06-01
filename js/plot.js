
var lastFlow = [];
var firsPlot = true;
var flow_pattern = {
    'calci': 1,
    'ic': 1,
    'lpi': 1,
    'lpt': 1,
    'p1': 1,
    'vetorial': 1,
    'calcii': 2,
    'fisica-classica': 2,
    'grafos': 2,
    'lpii': 2,
    'mat-discreta': 2,
    'met-cientifica': 2,
    'pii': 2,
    'eda': 3,
    'fisica-moderna': 3,
    'gi': 3,
    'leda': 3,
    'tc': 3,
    'linear': 3,
    'loac': 4,
    'logica': 4,
    'oac': 4,
    'probabilidade': 3,
    'si1': 4,
    'bd1': 4,
    'es': 4,
    'metodos': 4,
    'plp': 4,
    'sea': "",
    'si2': 5,
    'atal': 5 ,
    'bd2': 5,
    'infosoc': 5,
    'les': 5,
    'redes': 5,
    'so': 6,
    'compiladores': 5,
    'direito': 6,
    'irc': 6,
    'lirc': 6,
    'projetoi': 7,
    'aval-desemp': 7,
    'ia': 6,
    'projetoii': 8,
    'met-soft-num': 7
};

function formata(f) {
    var semBrackets = f.substring(1, f.length - 2);
    var array = semBrackets.split(",");

    for (var i = 0; i < array.length; i++) {

        var disciplina = array[i];

        if (i === 0)
            disciplina = disciplina.substring(1, disciplina.length-1);
        else if (i === (array.length - 1))
            disciplina = disciplina.substring(2, disciplina.length);
        else
            disciplina = disciplina.substring(2, disciplina.length-1);

        array[i] = disciplina;
    }

    return array;
}

function isIn(c, array) {
    for (var i = 0; i< array.length; i++) if (array[i] === c) return true;
    return false;
}

function formataDisciplinas(d) {

    formatter = {
        'calci': "Cálculo I",
        'ic': "Int. à Comptação",
        'lpi': "LP I",
        'lpt': "LPT",
        'p1': "Programação I",
        'vetorial': "Álgebra Vetorial",
        'calcii': "Cálculo II",
        'fisica-classica': "Física Clássica",
        'grafos': "Teoria dos Grafos",
        'lpii': "LP II",
        'mat-discreta': "Mat. Discreta",
        'met-cientifica': "Met. Científica",
        'pii': "Programação II",
        'eda': "EDA",
        'fisica-moderna': "Física Moderna",
        'gi': "Gerência da Info.",
        'leda': "LEDA",
        'tc': "Teoria da Comput.",
        'linear': "Álgebra Linear",
        'loac': "LOAC",
        'logica': "Lógica",
        'oac': "OAC",
        'probabilidade': "Probabilidade",
        'si1': "SI I",
        'bd1': "Banco de Dados I",
        'es': "Eng. de Software",
        'metodos': "Métodos Estatísticos",
        'plp': "PLP",
        'sea': "SEA",
        'si2': "SI II",
        'atal': "ATAL",
        'bd2': "Banco de Dados II",
        'infosoc': "INFOSOC",
        'les': "LES",
        'redes': "Redes",
        'so': "SO",
        'compiladores': "Compiladores",
        'direito': "Direito e Cidadania",
        'irc': "IRC",
        'lirc': "LIRC",
        'projetoi': "Projeto I",
        'aval-desemp': "Aval. de Desemp.",
        'ia': "Intel. Artificial",
        'projetoii': "Projeto II",
        'met-soft-num': "Met. Soft. Numéricos"
    };

    return formatter[d];
}

function seleciona(chart) {
    var charts = {"1": "chart1", "2": "chart2", "3": "chart3", "4": "chart4", "5": "chart5",
        "6": "chart6", "7": "chart7", "8": "chart8", "9": "chart9", "10": "chart10"};
    var selectedChart;
    var hiddenChart;
    for (var c in charts) {
        if (chart === c) {
            document.getElementById(c).className += "btn-selected";
            selectedChart = document.getElementById(charts[c]);
            selectedChart.style.display = "block";
        } else {
            document.getElementById(c).className = document.getElementById(c).className.split("btn-selected").join("");
            hiddenChart = document.getElementById(charts[c]);
            hiddenChart.style.display = "none";
        }
    }

    var compare_with_pattern = false;

    limpa();
    plot(charts[chart], compare_with_pattern);
}

function limpa() {
    var tam = document.getElementsByClassName("row").length;
    for (var i = 1; i < tam; i++) {
        document.getElementsByClassName("row")[i].remove();
    }
}

function plot(chart, compare_with_pattern) {

    if (compare_with_pattern) console.log('oooiii');

    var width = 1265;
    var height = 550;

    var mycolor = {"chart1":1, "chart2":2, "chart3":3, "chart4":4, "chart5":5, "chart6":6, "chart7":7, "chart8":8, "chart9":9, "chart10":10};
    var flowsIndex = mycolor;

    var color = d3.scaleLinear()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .range(["#F4F8BB", "#DBECBB", "#C9D6C2", "#DADAA9", "#EEE8AA", "#F5DEB3", "#FFE7C8", "#E6E6FA", "#D8BFD8", "#EABDBC"]);
        //.range(["#e7fa72", "#9ae685", "#5acc99", "#35aea4", "#408d9f", "#556c89", "#5c4c67", "#523142"]);
        //.range(["#DB9C85", "#EDCDC2", "#D2B295", "#CD4A7D", "#F75B3B", "#F6D155", "#95DEE3", "#578CA9", "#92B457", "#6D8955"]);

    var contrastColor = d3.scaleLinear()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .range(["#917c00", "#575F4C", "#525052", "#636349", "#5A5543", "#665A51", "#7B6B62", "#646477", "#635063", "#614848"]);

    var svg = d3.select("#"+chart)
        .append("svg")
        .attr("class", "row")
        .attr("width", width)
        .attr("height", height);

    var periodo_width = 120,
        periodo_height = 60,
        periodo_padding = 20;

    var periodo_index_width = periodo_width,
        periodo_index_height = periodo_height / 2,
        periodo_index_padding = periodo_padding;

    var pers = [];
    var qntPorPeriodo = [];
    for (var periodo = 1; periodo <= 9; periodo++) {

        var per = svg.append("g")
            .attr("class", "per" + periodo);

        pers[periodo] = per;

        per.append("rect")
            .attr("width", periodo_index_width)
            .attr("height", periodo_index_height)
            .attr("x", (periodo-1) * (periodo_index_width + periodo_index_padding) + periodo_index_padding)
            .style("fill", color(mycolor[chart]));

        var texto = periodo +" periodo";
        var centralizar = (periodo-1) * (periodo_index_width + periodo_index_padding) + periodo_index_padding + periodo_width/2;

        per.append("text")
            .text(texto)
            .attr("x", centralizar)
            .attr("y", (periodo_index_height / 2) + 3.5)
            .attr("text-anchor","middle")
            .attr("alignment-baseline","central")
            .style("fill", contrastColor(mycolor[chart]))
            .style("stroke-width", 1)
            .style("font-size", "12px")
            .style("font-family", "Poppins, sans-serif");

        qntPorPeriodo[periodo] = 0;
    }

    var fluxogramas = [];
    d3.csv("data.csv", function (error, data) {

        if (error) throw error;

        var i = 0;
        data.forEach(function (d) {
            fluxogramas[++i] = formata(d.fluxograma);
        });

        var myFlowIndex = flowsIndex[chart];
        var myFlow = fluxogramas[myFlowIndex];
        var tam = myFlow.length;

        for (var i = 0; i < tam; i++) {

            var t = myFlow[i].length;
            var d = myFlow[i].substring(1, t);

            var meuPeriodo = myFlow[i].substring(0, 1);
            var myPerRef = pers[meuPeriodo];

            var y = ++qntPorPeriodo[meuPeriodo];
            var xCentralizar = (meuPeriodo - 1) * (periodo_width + periodo_padding) + periodo_padding + periodo_width/2;

            var rect = myPerRef.append("rect")
                .attr("width", periodo_width)
                .attr("height", periodo_height)
                .attr("x", (meuPeriodo - 1) * (periodo_width + periodo_padding) + periodo_padding)
                .attr("y", (periodo_height + 10) * y)
                .style("fill", color(mycolor[chart]));


            // comparing courses with flowchart pattern or among them
            if (compare_with_pattern && flow_pattern[d] != meuPeriodo) {

                rect.style("stroke", "#929292")
                    .style("stroke-width","3");

            } else if (!firsPlot && !isIn(myFlow[i], lastFlow)) {

                rect.style("stroke", contrastColor(mycolor[chart]))
                    .style("stroke-width","3");
            }

            var minhaDisc = formataDisciplinas(d);

            myPerRef
                .append("text")
                .text(minhaDisc)
                .attr("x", xCentralizar)
                .attr("y", (periodo_height + 10) * y + periodo_height / 2 + 2)
                .attr("text-anchor","middle")
                .attr("alignment-baseline","central")
                .style("fill", contrastColor(mycolor[chart]))
                .style("stroke-width", 1)
                .style("font-size", "12px")
                .style("font-family", "Poppins, sans-serif");
        }

        firsPlot = false;
        lastFlow = myFlow;
    });

}

function compare() {

    var charts = {"1": "chart1", "2": "chart2", "3": "chart3", "4": "chart4", "5": "chart5",
        "6": "chart6", "7": "chart7", "8": "chart8", "9": "chart9", "10": "chart10"};

    var selectedChart;
    for (var c in charts)
        if (document.getElementById(c).className === "btn-selected")
            selectedChart = charts[c];

    var compare_with_pattern = true;

    limpa();
    plot(selectedChart, compare_with_pattern);
}

var grafico_inicial = "chart1";
var compare_with_pattern = false;
plot(grafico_inicial, compare_with_pattern);