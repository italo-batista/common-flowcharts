
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

    limpa();
    plot(charts[chart]);
}

function limpa() {
    var tam = document.getElementsByClassName("row").length;
    for (var i = 1; i < tam; i++) {
        document.getElementsByClassName("row")[i].remove();
    }
}

function plot(chart) {

    var width = 1300;
    var height = 600;

    var mycolor = {"chart1":1, "chart2":2, "chart3":3, "chart4":4, "chart5":5, "chart6":6, "chart7":7, "chart8":8, "chart9":9, "chart10":10};
    var flowsIndex = mycolor;

    var color = d3.scaleLinear()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .range(["#F4F8BB", "#DBECBB", "#C9D6C2", "#DADAA9", "#EEE8AA", "#F5DEB3", "#FFE7C8", "#E6E6FA", "#D8BFD8", "#EABDBC"]);
        //.range(["#e7fa72", "#9ae685", "#5acc99", "#35aea4", "#408d9f", "#556c89", "#5c4c67", "#523142"]);
        //.range(["#DB9C85", "#EDCDC2", "#D2B295", "#CD4A7D", "#F75B3B", "#F6D155", "#95DEE3", "#578CA9", "#92B457", "#6D8955"]);

    var fontColor = d3.scaleLinear()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .range(["#917c00", "#575F4C", "#525052", "#636349", "#5A5543", "#665A51", "#7B6B62", "#646477", "#635063", "#614848"]);

    var svg = d3.select("#"+chart)
        .append("svg")
        .attr("class", "row")
        .attr("width", width)
        .attr("height", height);

    var periodo_width = 100,
        periodo_height = 60,
        periodo_padding = 20;

    var periodo_index_width = periodo_width,
        periodo_index_height = periodo_height / 2,
        periodo_index_padding = periodo_padding;

    var N = 15; // tamanho máximo de palavra que cabe numa box de uma disciplina
    var yBoxScale = d3.scaleLinear()
        .domain([0, N])
        .range([0, periodo_width-3]);

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
        var centralizar = periodo_width/2 - yBoxScale(texto.length)/2;

        per.append("text")
            .attr("x", (periodo-1) * (periodo_index_width + periodo_index_padding) + periodo_index_padding + centralizar)
            .attr("y", (periodo_index_height / 2) + 3.5)
            .style("fill", fontColor(mycolor[chart]))
            .style("stroke-width", 1)
            .style("font-size", "12px")
            .style("font-family", "Poppins, sans-serif")
            .text(texto);

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
            var meuPeriodo = myFlow[i].substring(0, 1);
            var minhaDisc = myFlow[i].substring(1, t);
            var myPerRef = pers[meuPeriodo];
            var y = ++qntPorPeriodo[meuPeriodo];
            var centralizar = periodo_width/2 - yBoxScale(minhaDisc.length)/2;

            myPerRef.append("rect")
                .attr("width", periodo_width)
                .attr("height", periodo_height)
                .attr("x", (meuPeriodo - 1) * (periodo_width + periodo_padding) + periodo_padding)
                .attr("y", (periodo_height + 10) * y)
                .style("fill", color(mycolor[chart]));

            myPerRef
                .append("text")
                .attr("x", (meuPeriodo - 1) * (periodo_width + periodo_padding) + periodo_padding + centralizar)
                .attr("y", (periodo_height + 10) * y + periodo_height / 2 + 2)
                .style("fill", fontColor(mycolor[chart]))
                .style("stroke-width", 1)
                .style("font-size", "12px")
                .style("font-family", "Poppins, sans-serif")
                .text(minhaDisc);
        }
    });

}

var grafico_inicial = "chart1";
plot(grafico_inicial);