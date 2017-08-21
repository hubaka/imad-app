console.log('Loaded!');


// chanding the main text printed in the page
var element = document.getElementById("main-text");
element.innerHTML = "A new value";


// going to make the image move on click
var image = document.getElementById('madipic');
var marginLeft = 0;
function moveRight() {
    marginLeft += 10;
    image.style.marginLeft = marginLeft + 'px';
}
image.onclick = function() {
   var interval = setInterval(moveRight, 100);
};