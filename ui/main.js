console.log('Loaded!');


// chanding the main text printned in the page
// var element = document.getElementById("main-text");
// element.innerHTML = "A new value";


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

var counter = 0;
var buttonclick = document.getElementById("counter");
buttonclick.onclick = function() {
    
    var request = new XMLHttpRequest();
    request.open('GET', 'http://aillanan.imad.hasura-app.io/counter', true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                    var counter = request.responseText;
                    var span = document.getElementById("count");
                    span.innerHTML = counter.toString();
            }
        }
    }
}

var submit = document.getElementById("submitbutton");
submit.onclick = function() {
    
    var inputvalue = document.getElementById("name");
    var name = inputvalue.value;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://aillanan.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                    var inputvalue = request.responseText;
                    var namevar = JSON.prase(inputvalue.value);
                    var list = '';
                    for (var i=0; i<names.length; i++) {
                        list += '<li>' + names[i] + '</li>';
                    }
                    var ulist = document.getElementById("namelist");
                    ulist.innerHTML = list;           
            }
        }
    }
}