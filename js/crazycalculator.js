document.querySelector("#CalculateScore").addEventListener('click', CalculateScore);


const redFlags = ["are they self absorbed?", "do they have an inflated ego?", "do they get angry over minor things?", "do they storm off when upset?", "are they judgy?", "are they rude to service workers?", "do they talk like a gangster?", "is their name kyle?", "are they prejudiced (sexist/racist/homophobic)?", "do they gaslight?", "are they unwilling to compromise?", "do they act different around their friends?", "are they only interested in sexual acts?", "do they have a drug/alcohol problem?", "are they scared to be in public with you?", "do they lack interests?", "are they on their phone all the time?", "do they lie?", "are they indecisive?", "are they unable to communicate?", "do they flirt with other people?", "do they never offer to pay?", "are they always on snap?", "do they make fun of your interests?", "do they punch walls?", "are they aggressive physically?", "do they wear adidas pants all the time?", "do they take days to respond?", "do they wear wife beaters?", "do they hide their phone?", "do they dislike a lot of people?", "are they a conservative?"];

const greenFlags = ["do they have good hygiene?", "do they hold the door for you?", "are they willing to try new things?", "do they do nice things unprompted?", "can cook?"];

let answered = {};

CreateQuestions();

function CreateQuestions()
{
    for (let flag in redFlags) {
        let label = document.createElement("label");
        label.innerText = redFlags[flag];

        let btn = document.createElement("button");
        btn.innerText = "yes";
        btn.type = "button";
        btn.id = redFlags[flag];
        btn.addEventListener('click', function(){
            Negative(redFlags[flag]);
        });

        let btn1 = document.createElement("button");
        btn1.innerText = "no";
        btn1.type = "button";
        btn1.id = "Neutral" + redFlags[flag];
        btn1.addEventListener('click', function(){
            Neutral(redFlags[flag]);
        });

        let parentDiv = document.querySelector("form");
        parentDiv.appendChild(label);
        parentDiv.appendChild(document.createElement("br"))
        parentDiv.appendChild(btn);
        parentDiv.appendChild(btn1);
        parentDiv.appendChild(document.createElement("br"))
        parentDiv.appendChild(document.createElement("br"))

    }
    for (let flag in greenFlags) {
        let label = document.createElement("label");
        label.innerText = greenFlags[flag];

        let btn = document.createElement("button");
        btn.innerText = "yes";
        btn.type = "button";
        btn.id = greenFlags[flag];
        btn.addEventListener('click', function(){
            Positive(greenFlags[flag]);
        });

        let btn1 = document.createElement("button");
        btn1.innerText = "no";
        btn1.type = "button";
        btn1.id = "Neutral" + greenFlags[flag];
        btn1.addEventListener('click', function(){
            Neutral(greenFlags[flag]);
        });

        let parentDiv = document.querySelector("form");
        parentDiv.appendChild(label);
        parentDiv.appendChild(document.createElement("br"))
        parentDiv.appendChild(btn);
        parentDiv.appendChild(btn1);
        parentDiv.appendChild(document.createElement("br"))
        parentDiv.appendChild(document.createElement("br"))

    }
}

function Negative(flag)
{
    answered[flag] = 1;

    document.getElementById(flag).className = "Selected";
    document.getElementById("Neutral" + flag).classList.remove("Selected");

}
function Positive(flag)
{
    answered[flag] = -1;

    document.getElementById(flag).className = "Selected";
    document.getElementById("Neutral" + flag).classList.remove("Selected");

}
function Neutral(flag)
{
    answered[flag] = 0;

    document.getElementById(flag).classList.remove("Selected");
    document.getElementById("Neutral" + flag).className = "Selected";
}

function CalculateScore()
{
    if(answered.length < redFlags.length + greenFlags.length)
        return;

    console.log(answered);

    let netCrazy = greenFlags.length;

    for (let key in answered) {
        netCrazy += answered[key];
    }

    let score = (netCrazy / (redFlags.length+greenFlags.length)) * 10;
    score = score.toFixed(2);
    score = parseFloat(score).toFixed(2);
    document.querySelector("#Score").innerHTML = "Crazy Score: " + score;



    let rating = "";
    if(score <= 0)
        rating = "the least toxic mf ever";
    else if (score < 4)
        rating = "they have very few faults";
    else if(score < 6)
        rating = "ok a bit manipulative - probably listens to weezer";
    else if(score < 8)
        rating = "oh just a little psycho";
    else if(score <= 10)
        rating = "nate jacobs type beat";

    document.querySelector("#Rating").innerHTML = rating;
}

