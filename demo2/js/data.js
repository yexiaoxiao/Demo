
d3.csv("data/EventHistory20160108090139.csv",type,function(data) {
	var width = 400,
		height = 250,
		margin = {left:30, top:30, right:30,bottom:30},
		svg_width = width + margin.left + margin.right,
		svg_height = height + margin.top + margin.bottom;

	var scale = d3.scale.linear()//构建一个线性比例尺(缩放比例)
	.domain([0,d3.max(data,function(d){return Math.ceil(d.population);})])//缩放定义域(输入域)
	.range([height,0]); //输出范围

	var scale_x = d3.scale.ordinal()//构造一个序列比例尺
.domain(data.map(function(d){return d.year;}))//比例尺输入域
.rangeBands([0,width],0.1);//指定输出范围为连续区间

	var svg = d3.select("#container").append('svg').attr("width",svg_width).attr("height",svg_height);

	var chart = svg.append('g').attr("transform","translate("+margin.left+","+margin.top+")");

	var x_axis =  d3.svg.axis().scale(scale_x),
		y_axis = d3.svg.axis().scale(scale).orient("left");

	chart.append("g").call(x_axis).attr("transform","translate(0,"+height+")"); //调用一个函数
	chart.append("g").call(y_axis);


	var bar = chart.selectAll('.bar')
	.data(data)//设置一组元素
	.enter()//为缺失的元素返回占位符
	.append("g")
	.attr("class","bar")
	.append('g').attr("transform",function(d,i){console.log(scale_x(d.year)); return "translate("+scale_x(d.year)+",0)";});//加入g并且平移



	bar.append('rect').attr({'y':function(d){return scale(d.population);},//设置y(定位)使得图形向上延伸
	"width":scale_x.rangeBand(),"height":function(d){return height-scale(d.population);}}).style("fill",'blue');//生成柱,并且填充

	bar.append('text').text(function(d){return d.population;}).attr({'x':scale_x.rangeBand()/2,'y':function(d){return scale(d.population);},'dy':'15','text-anchor':'middle'}); //dy设置垂直方向偏移量
});

function type (d) {
	d.population= +d.population; //字符串转换数据形式
	d.year = +d.year;
	return d;
}