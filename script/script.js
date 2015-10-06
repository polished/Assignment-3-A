
//Set up the drawing environment here
var margin = {t:20,r:20,b:20,l:20};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
	height = document.getElementById('plot').clientHeight-margin.t-margin.b;

var plot = d3.select('.canvas')
	.append('svg')
	.attr('width',width+margin.l+margin.r)
	.attr('height',height+margin.t+margin.b)
	.append('g')
	.attr('class','plot')
	.attr('transform','translate('+margin.l+','+margin.t+')');


//Start with 100 symbols
var numOfSymbols = 100;

//Create an array, generate objects to push into the array
//Attributes of these symbols are
// --> x position: between 0 and width
// --> y position: between 0 and height
// --> size: between 0 and 100x100
// --> type: circle or square
// --> color
var symbols = [];
var types = [
	'circle',
	'rect'
];

for(var i=0; i <numOfSymbols; i++) {
	var tempObject = {};
	tempObject.x_pos = Math.random()*width;
	tempObject.y_pos = Math.random()*height;
	tempObject.size = Math.random()*100;
	tempObject.type = types[Math.floor(Math.random()*types.length)];
	tempObject.color ='rgb(' + (127+(Math.floor(Math.random() * 127))) + ',' + (127+(Math.floor(Math.random() * 127))) + ',' + (127+(Math.floor(Math.random() * 127))) + ')';// inspired by: http://www.sitepoint.com/generating-random-color-values/ and http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
	//console.log(tempObject.color);
	symbols.push(tempObject);
}

//With the array you've created and populated, draw circles to represent these symbols
symbols.forEach(function(symbol){
	console.log(symbol.type);

	if (symbol.type === 'circle'){

	plot
		.append(symbol.type)
		.style('fill',symbol.color)
		.attr('cx', symbol.x_pos)
		.attr('cy', symbol.y_pos)
		.attr('r',symbol.size/4)
		.transition()
		.ease("linear")
		.delay(1)
		.attr('r',symbol.size/2);


	}else if (symbol.type === 'rect'){
		plot
			.append(symbol.type)
			.attr('x', symbol.x_pos)
			.attr('y', symbol.y_pos)
			.style('fill',symbol.color)
			.attr('width',symbol.size/2)
			.attr('height',symbol.size/2)
			.transition()
			.ease("linear")
			.delay(1)
			.attr('width',symbol.size)
			.attr('height',symbol.size);
	};

});
plot
	.append('text')
	.attr('x',width-500)
	.attr('y',height-25)
	.attr('font-family', "Roboto")
	.attr('font-size', 80)
	.text('pretty, eh?')
	.transition()
	.delay(500)
	.duration(1000)
	.ease("elastic")
	.attr('x',width-900)
	.attr('font-size', 200);

//setInterval(3000);