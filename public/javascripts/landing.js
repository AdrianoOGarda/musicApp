var i = 0;
var j = 0;
var txt = `Wouldn't you like to watch your favorite musicians live from home?`;
var speed = 20;

function typeWriter1() {
    if (i < txt.length) {
        document.getElementById("wouldnt").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter1, speed);
    }
}

function typeWriter2() {
    if (j < txt2.length) {
        document.getElementById("wegot").innerHTML += txt2.charAt(j);
        j++;
        setTimeout(typeWriter2, speed);
    }
}

typeWriter1()
setTimeout(typeWriter2, 2000)