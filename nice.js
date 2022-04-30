function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}

var i = 0

setInterval(function(){ 
	i++
	document.body.style.backgroundColor = rgb(251, 142 - Math.abs((Math.sin(i / 100) * 20)), 79 - Math.abs((Math.sin(i / 100) * 20)))
}, 10);