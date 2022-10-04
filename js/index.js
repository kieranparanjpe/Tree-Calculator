document.querySelector("#crazy").addEventListener('change', Crazy);
document.querySelector("#hot").addEventListener('change', Hot);
document.querySelector("#personalityWeight").addEventListener('change', Personality);
document.querySelector("#CalculateScore").addEventListener('click', AddScore);
document.querySelector("#name").addEventListener('change', Name);
document.querySelector("#RemovePerson").addEventListener('click', Remove);


//crazy = x, hot = y

let point = {};
let slope = 1;
let crazy = 5;
let hot = 5;
let personalityWeight = 5;
let graph = document.querySelector("#graph");
graph.addEventListener('click', ClickCanvas);
let upperY;
let hasDrawn = false;
let name = "your person";

document.querySelector("#RemovePerson").style.display = "none";

function Name()
{
    name = document.querySelector("#name").value;
    if(name == "")
        name = "your person"
    document.querySelector("#crazyLabel").innerHTML = "how crazy is " + name + "?";
    document.querySelector("#hotLabel").innerHTML = "how hot is " + name + "?";

    refreshName();
}

function Crazy()
{
    crazy = document.querySelector("#crazy").value / 2;
    document.querySelector("#crazyNumber").innerHTML = crazy;
}

function Hot()
{
    hot = document.querySelector("#hot").value / 2;
    document.querySelector("#hotNumber").innerHTML = hot;
}

function Personality()
{
    personalityWeight = document.querySelector("#personalityWeight").value / 2;
    document.querySelector("#personalityNumber").innerHTML = personalityWeight;
}

function AddScore()
{
    document.querySelector("#RemovePerson").style.display = "inline";

    if(personalityWeight == 0)
        personalityWeight = 0.5;
    else if(personalityWeight == 10)
        personalityWeight = 9.5;

    slope = (personalityWeight) / (10-personalityWeight);

    point[name] = {crazy, hot};

    CalculateScore(crazy, hot);
}

function CalculateScore(c, h)
{
    refreshName();
    let score = h - (slope * c);
    upperY = (slope * 10);

    score = Math.min(Math.max(score, -100), 100);

    score += 10;
    score /= 20;
    score *= 100;


    score = score.toFixed(2);
    score = parseFloat(score).toFixed(2);
    document.querySelector("#Score").innerHTML = name + "'s score: " + score + "%";

    let rating = "";

    if(score < 0)
        rating = "run. you should run.";
    else if (score < 25)
        rating = name + " fucking sucks.";
    else if(score < 50)
        rating = "mid";
    else if(score < 65)
        rating = name + " is passable.";
    else if(score < 85)
        rating = "you should date " + name;
    else if(score < 101)
        rating = "zoo wee mama " + name + "'s a keeper!";


    document.querySelector("#Rating").innerHTML = rating;

    hasDrawn = true;
    drawCanvas();
}

function drawCanvas() {
    const canvasWidth = graph.width;
    const canvasHeight = graph.height;

    let ctx = graph.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.moveTo(mathToCanvasX(canvasWidth, 0), mathToCanvasY(canvasHeight, 0));
    ctx.lineTo(canvasWidth * 100, mathToCanvasY(canvasHeight, upperY * 100));
    ctx.lineTo(mathToCanvasX(canvasWidth, 0), 0);
    ctx.closePath();

    ctx.fillStyle = "#90ee90 ";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(mathToCanvasX(canvasWidth, 0), mathToCanvasY(canvasHeight, 0));
    ctx.lineTo(canvasWidth, mathToCanvasY(canvasHeight, upperY));
    ctx.lineTo(canvasWidth, mathToCanvasY(canvasHeight, 0));
    ctx.closePath();

    ctx.fillStyle = "#FF7F7F ";
    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(0, canvasHeight * 0.9);
    ctx.lineTo(canvasWidth, canvasHeight * 0.9);

    ctx.moveTo(canvasWidth * 0.1, 0);
    ctx.lineTo(canvasWidth * 0.1, canvasHeight);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();

    ctx.moveTo(canvasWidth * 0.1, canvasHeight * 0.9);
    ctx.lineTo(canvasWidth, mathToCanvasY(canvasHeight, upperY));

    ctx.lineWidth = 3;
    ctx.stroke();

    let f = 30 * (innerWidth / 1920);
    if (f < 15)
        f = 15;

    if (innerWidth <= 700)
        f = 25;

    for (let key in point) {
        let value = point[key];


        ctx.beginPath();
        ctx.arc(mathToCanvasX(canvasWidth, value.crazy), mathToCanvasY(canvasHeight, value.hot), 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#B2BEB5";
        ctx.fill();
        ctx.textAlign = "center";
        ctx.font = "bold 22px Helvetica";
        ctx.lineWidth = 2;

        if (innerWidth <= 700)
        {
            ctx.font = "bold 15px Helvetica";
            ctx.lineWidth = 1.75;
        }

        ctx.strokeStyle = 'black';
        ctx.strokeText(key, mathToCanvasX(canvasWidth, value.crazy - 0.8), mathToCanvasY(canvasHeight, value.hot - 0.8));

        ctx.fillText(key, mathToCanvasX(canvasWidth, value.crazy - 0.8), mathToCanvasY(canvasHeight, value.hot - 0.8));
    }


    ctx.font = f + "px Helvetica";
    ctx.fillStyle = 'black';

    ctx.fillText("craziness", mathToCanvasX(canvasWidth, 5), mathToCanvasY(canvasHeight, -0.75));

    ctx.save();
    ctx.translate(mathToCanvasX(canvasWidth, -0.5), mathToCanvasY(canvasHeight, 5));
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("hotness", 0, 0);
    ctx.restore();
}

function refreshName()
{
    document.querySelector("#RemovePerson").innerHTML = "remove " + name;
    document.querySelector("#name").value = name;
    document.querySelector("#crazyLabel").innerHTML = "how crazy is " + name + "?";
    document.querySelector("#hotLabel").innerHTML = "how hot is " + name + "?";
}


function mathToCanvasY(height, point)
{
    return (height*0.9) - ((height * 0.9) * (point / 10));
}

function mathToCanvasX(width, point)
{
    return (width*0.1) + ((width * 0.9) * (point / 10));
}

function ClickCanvas(event)
{
    const canvasWidth = graph.width;
    const canvasHeight = graph.height;

    let x = event.pageX - graph.getBoundingClientRect().left;
    let y = event.pageY - (graph.getBoundingClientRect().top+ window.scrollY);

    let ctx = graph.getContext("2d");

    for (let key in point) {
        let value = point[key];

        console.log(distance(x, y, mathToCanvasX(canvasWidth, value.crazy), mathToCanvasY(canvasHeight, value.hot)));

        if(distance(x, y, mathToCanvasX(canvasWidth, value.crazy), mathToCanvasY(canvasHeight, value.hot)) < 10)
        {
            name = key;
            CalculateScore(value.crazy, value.hot);
        }

        refreshName();
    }
}

function distance(x1, y1, x2, y2)
{
    let a = x1 - x2;
    let b = y1 - y2;

    return Math.sqrt( a*a + b*b );
}

function Remove()
{
    delete point[name];
    console.log(point);
    if(Object.keys(point).length > 0)
    {
        name = Object.keys(point)[0];
        CalculateScore();
    }
    else
    {
        name = "your person";
        hasDrawn = false;
        const canvasWidth = graph.width;
        const canvasHeight = graph.height;

        let ctx = graph.getContext("2d");
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        document.querySelector("#RemovePerson").style.display = "none";

        document.querySelector("#Score").innerHTML = "";
        document.querySelector("#Rating").innerHTML = "";
    }

    refreshName();
}


window.onload = function()
{
    graph = document.querySelector("#graph");
    resizeCanvas();
}

window.onresize = function()
{
    resizeCanvas();
    if(hasDrawn)
        drawCanvas();
}

function resizeCanvas()
{
    if(window.innerWidth > 700)
    {
        graph.width = window.innerWidth * 0.3;
        graph.height = window.innerWidth * 0.3;
    }
    else
    {
        graph.width = window.innerWidth * 0.8;
        graph.height = window.innerWidth * 0.8;
    }

}