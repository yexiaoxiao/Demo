/**
 * 饼状图
 */

d3.csv("data/EventHistory20160108090139.csv",type,function(data) {
	var width = 400;
	var height = 400;
	var svg = d3.select("#container").append("svg").attr("width",width).attr("height",height);

	var g = svg.append("g").attr("transform","translate(200,200)");

	var arc_generator = d3.svg.arc()//新建一个弧度生成器
	.innerRadius(100)//设置内半径
	.outerRadius(200);//设置外半径

	var angle_data = d3.layout.pie()//构造一个新的默认的饼布局
	.value(function(d) {return d.population;});//设置值访问器函数(每块扇形起始)

	var color = d3.scale.category10();// 构造一个有10种颜色的序数比例尺

	g.selectAll("path").data(angle_data(data)).enter().append("path").attr("d",arc_generator).style("fill",function(d,i) {return color(i);});

	g.selectAll("text").data(angle_data(data)).enter().append("text").text(function(d){return d.data.year;})
	.attr("transform",function(d){return "translate("+arc_generator.centroid(d)+")"}).attr("text-anchor","middle");
	
});

function type(d) {
	d.population = + d.population;
	return d;
}