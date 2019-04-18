var dataset = [
   5, 10, 13, 19, 21,
  25, 22, 18, 15, 13,
  11, 12, 15, 20, 18,
  17, 16, 18, 23, 25,
  22, 18, 15, 18, 10
];

var gridMax = Math.sqrt(dataset.length);
var content = d3.select("#helloworld");

// not in use
var arPlaneWidth = d3.select("arBase").width;
var arPlaneHeight = d3.select("arBase").height;

// we use d3's enter/update/exit pattern to draw and bind our dom elements
var myBars = content.selectAll("a-cylinder.bar")
  .data(dataset)
  .enter()
  .append("a-cylinder")
  .classed("bar", true)
  .attr("cursor-listener", true);  // we set attributes on our cubes to determine how they are rendered

var x = 1;
var y = 1;
var z = 1;
var m = 0;

myBars.attr({
  position: function(d, i) {
    x = i % gridMax;
    z = Math.floor(i/gridMax);
    y = d/8;
    m++;
    console.log("Count: " + m + " - " + "x: " + x + "y: " + y + "z: " + z);
    return x + " " + y + " " + z;
  },
  height: function(d) {
    return d/4;
  },
  width: function(d) {
    return 0.9;
  },
  radius: function(d) {
    return 0.9/2;
  },
  color: function(d, i) {
    var colorScale = d3.scale.linear().domain([0, dataset.length]).range(['#fff', 'blue']);
    return colorScale(d);
    // var letters = '0123456789ABCDEF'.split('');
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
  }
});
