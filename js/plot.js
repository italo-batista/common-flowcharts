
function seleciona(area) {
    var areas = {"1": "chart1", "2": "chart2", "3": "chart3", "4": "chart4", "5": "chart5",
        "6": "chart6", "7": "chart7", "8": "chart8", "9": "chart9", "10": "chart10"};
    var chart;
    var hiddenChart;
    for (var a in areas) {
        if (area === a) {
            document.getElementById(a).className += "btn-selected";
            chart = document.getElementById(areas[a]);
            chart.style.display = "block";
        } else {
            document.getElementById(a).className = document.getElementById(a).className.split("btn-selected").join("");
            hiddenChart = document.getElementById(areas[a]);
            hiddenChart.style.display = "none";
        }
    }
}

function plot(chart) {

    var box_width = 300,
        box_height = box_width,
        box_padding = 5;

    var width = box_width * 4 + 2,
        height = box_height,
        padding = 25;

    var color = d3.scale.category10();

    var circle_radius = 1.7;
    var padding_line = 0.18;
    var padding_x0 = 22;
    var padding_box = 23;
    var top = 5;

    var yAxisPadding = 20;

    var svg1 = d3.select(".below")
        .append("svg")
        .attr("class", "svg1")
        .attr("width", width)
        .attr("height", height);

    svg1.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + yAxisPadding + ",0)");

    d3.csv("data.csv", function (error, data) {

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

    }); // close read data
}