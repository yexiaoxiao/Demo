/**
 * 水平柱状


var data = [1,4,7,2,9,6,5,16],
	bar_height = 26,
	bar_padding = 5,
	svg_height = (bar_height+bar_padding)*data.length,
	svg_width = 500;

var scale = d3.scale.linear()//构建一个线性比例尺(缩放比例)
.domain([0,d3.max(data)])//缩放定义域(输入域)
.range([0,svg_width]); //输出范围

var svg = d3.select("#container").append('svg').attr("width",svg_width).attr("height",svg_height);

var bar = svg.selectAll('g')
.data(data)//设置一组元素
.enter()//为缺失的元素返回占位符
.append('g').attr("transform",function(d,i){return 'translate(0,'+i*(bar_height+bar_padding)+')';});//加入g并且平移

bar.append('rect').attr({"width":function(d){return scale(d);},"height":bar_height}).style("fill",'blue');//生成柱,并且填充

bar.append('text').text(function(d){return d;}).attr({'x':function(d){return scale(d);},'y':(bar_height+bar_padding)/2,'text-anchor':'end'});
 */

/**
 * 垂直柱状
 */

var data = [1,4,7,2,9,6,5,16],
	bar_width = 36,
	bar_padding = 10,
	svg_width = (bar_width+bar_padding)*data.length,
	svg_height = 250;

var scale = d3.scale.linear()//构建一个线性比例尺(缩放比例)
.domain([0,d3.max(data)])//缩放定义域(输入域)
.range([svg_height,0]); //输出范围

var svg = d3.select("#container").append('svg').attr("width",svg_width).attr("height",svg_height);

var bar = svg.selectAll('g')
.data(data)//设置一组元素
.enter()//为缺失的元素返回占位符
.append('g').attr("transform",function(d,i){return 'translate('+i*(bar_width+bar_padding)+',0)';});//加入g并且平移

bar.append('rect').attr({'y':function(d){return scale(d);},//设置y(定位)使得图形向上延伸
"width":bar_width,"height":function(d){return svg_height-scale(d);}}).style("fill",'blue');//生成柱,并且填充

bar.append('text').text(function(d){return d;}).attr({'x':bar_width/2,'y':function(d){return scale(d);},'dy':'15','text-anchor':'middle'}); //dy设置垂直方向偏移量