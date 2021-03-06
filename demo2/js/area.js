/**
 * 面积图
 * @type {Number}
 */
var width = 500,
	height = 250,
	margin = {left:50, top:30,right:20,bottom:20},
	c_width = width - margin.left - margin.right,
	c_height = height - margin.top - margin.bottom,
	data = [1,10,1,7,4];

var svg = d3.select("#container")
.append("svg")
.attr("width",width)
.attr("height",height);

var g = d3.select("svg")
.append("g")
.attr("transform","translate("+margin.left+","+margin.top+")"); //设置位移(曲线原点)

//定量变换
var scale_x = d3.scale.linear() //创建一个线性定量变换
.domain([0,data.length-1])//X轴输出范围(get或set定义域)
.range([0,c_width]);//get或set值域

var scale_y = d3.scale.linear()
.domain([d3.max(data),0])//Y轴输出范围(get或set定义域)
.range([0,c_height]);//get或set值域

var area_generator = d3.svg.area() //创建新的区域生成器
.x(function(d,i) {	return scale_x(i);}) //第几位 key
.y0(c_height) //下限，对齐x轴
.y1(function(d) {return scale_y(d);})//上边  对应值 value
.interpolate("cardinal")//折线变曲线


var path = d3.select("g") //创建一个新的地理路径生成器(点)
.append("path")
.attr("d",area_generator(data))//点位置
.style("fill",'steelblue')//设置面积颜色

//坐标轴
var x_axis = d3.svg.axis()//创建一个axis(轴)生成器
.scale(scale_x);//get或set坐标轴的scale尺度变换，该尺度变换设定了数值和像素位置的转换规则。
var y_axis = d3.svg.axis().scale(scale_y)
.orient("left");//get或set坐标轴刻度方向

g.append("g").call(x_axis)//加入x轴
.attr("transform","translate(0,"+c_height+")");//x轴位移定位(默认在页面上方)
g.append("g").call(y_axis)//加入y轴
.append('text').text("Price($)").attr({'transform':'rotate(-90)','text-anchor':'end','dy':'1em'})
