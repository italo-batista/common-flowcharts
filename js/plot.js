
function seleciona(fluxograma) {
    var fluxogramas = {"1": "chart1", "2": "chart2", "3": "chart3", "4": "chart4", "5": "chart5",
        "6": "chart6", "7": "chart7", "8": "chart8", "9": "chart9", "10": "chart10"};
    var chart;
    var hiddenChart;
    for (var f in fluxogramas) {
        if (fluxograma === f) {
            document.getElementById(f).className += "btn-selected";
            chart = document.getElementById(fluxogramas[f]);
            chart.style.display = "block";
        } else {
            document.getElementById(f).className = document.getElementById(f).className.split("btn-selected").join("");
            hiddenChart = document.getElementById(fluxogramas[f]);
            hiddenChart.style.display = "none";
        }
    }

    var tam = document.getElementsByClassName("row").length;
    for (var i = 1; i < tam; i++) {
        document.getElementsByClassName("row")[i].remove();
    }

    plot(fluxogramas[fluxograma]);
}

function plot(chart) {

    var width = 1300;
    var height = 600;

    var mycolor = {"chart1":1, "chart2":2, "chart3":3, "chart4":4, "chart5":5, "chart6":6, "chart7":7, "chart8":8, "chart9":9, "chart10":10}

    var color = d3.scaleLinear()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .range(["#F4F8BB", "#DBECBB", "#C9D6C2", "#DADAA9", "#EEE8AA", "#F5DEB3", "#FFE7C8", "#E6E6FA", "#D8BFD8", "#EABDBC"]);
        //.range(["#e7fa72", "#9ae685", "#5acc99", "#35aea4", "#408d9f", "#556c89", "#5c4c67", "#523142"]);
        //.range(["#DB9C85", "#EDCDC2", "#D2B295", "#CD4A7D", "#F75B3B", "#F6D155", "#95DEE3", "#578CA9", "#92B457", "#6D8955"]);

    var colorBorder = d3.scaleOrdinal(d3.schemeCategory20b);

    var svg = d3.select("#"+chart)
        .append("svg")
        .attr("class", "row")
        .attr("width", width)
        .attr("height", height);

    var periodo_index_width = 100,
        periodo_index_height = 60,
        periodo_index_padding = 20;

    for (var periodo = 0; periodo <= 7; periodo++) {

        svg.append("g")
            .attr("class", "col-lg-1")
            .append("rect")
            .attr("width", periodo_index_width)
            .attr("height", periodo_index_height)
            .attr("x", periodo * (periodo_index_width + periodo_index_padding) + 25)
            .style("fill", color(mycolor[chart]));

        svg.append("g")
            .attr("class", "col-lg-1")
            .append("rect")
            .attr("width", periodo_index_width)
            .attr("height", periodo_index_height)
            .attr("x", periodo * (periodo_index_width + periodo_index_padding) + 25)
            .attr("y", periodo_index_height + 10)
            .style("fill", color(mycolor[chart]));
    }

/*    d3.csv("data.csv", function (error, data) {

        if (error) throw error;

        data.forEach(function (d) {
            d.mat = +d.mat,
                d.periodo = +d.periodo,
                d.freq = +d.freq,
                d.semestre = +d.semestre
        });

        max_mat = d3.max(data, function (d) {
            return d.mat;
        });
        min_mat = d3.min(data, function (d) {
            return d.mat;
        });

        for (periodo = 1; periodo <= 8; periodo++) {

            var x0;
            var mysvg;
            var quinto_periodo = 5;
            var primeiro_periodo = 1;

            mysvg = "svg.svg1";
            x0 = box_width * (periodo - primeiro_periodo);

            var box = d3.select(mysvg)
                .append("g")
                .attr("width", box_width)
                .attr("height", box_height)
                .attr("transform", "translate(" + x0 + "," + 0 + ")");

            var mydata = data.filter(function (d) {
                return d.periodo === periodo;
            });

            box.selectAll("circle")
                .data(mydata)
                .enter()
                .append("circle")
                .attr("r", circle_radius)
                .style("fill", function (d) {
                    return color(d.periodo);
                });

            box.append("text")
                .attr("class", "label")
                .attr("y", box_height - 6)
                .attr("x", box_width / 2 - 20)
                .attr("font-family", "Verdana")
                .attr("font-size", "12")
                .text(periodo + " periodo");

            d3.select(mysvg)
                .append("rect")
                .attr("class", "frame")
                .attr("x", x0 + padding_box)
                .attr("y", 14.3)
                .attr("width", box_width - padding_box)
                .attr("height", height - 35);

            d3.select(mysvg)
                .append("line")
                .attr("id", "top")
                .attr("x1", x0 + padding_x0)
                .attr("x2", x0 + box_width);
        }

    }); // close read data*/

}

var grafico_inicial = "chart1";
plot(grafico_inicial);

