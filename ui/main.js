console.log('Loaded!');


// chanding the main text printed in the page
var element = document.getElementById("main-text");
element.innerHTML = "A new value";


// going to make the image move on click
var image = document.getElementById('madipic');

image.onClick = function() {
   image.style.marginLeft = '100px'; 
};