var timeClock = document.getElementsByClassName("timeclock");

var x;
var y;

//functie voor het ophalen van de x en y coördinaten van de speler(s)
function getCoords(event)
{
    x = event.clientX;
    y = event.clientY;

    myBody.position.x = x;
    myBody.position.y = y;
}


var Engine = Matter.Engine, //vertelt waar alles zit
    Render = Matter.Render, //zet alles op de goede plek neer
    Runner = Matter.Runner, //hier zit een .tick event in (voor spellekes etc)
    Composites = Matter.Composites, //voor het maken van een stack van bodies
    Common = Matter.Common, //standaard javascript functies in matter.js
    MouseConstraint = Matter.MouseConstraint, //voor het slepen
    Mouse = Matter.Mouse, //voor het creeren van een muis in de world
    World = Matter.World, //de wereld zelf
    Bodies = Matter.Bodies; //de elementen (bladeren in ons geval)


//functie voor het aftellen van de speeltijd
function start(time) {
    if (time <= 0) {
        clearTimeout(timeKeep);
        World.clear(engine.world, {keepStatic: true});
        checkscore();
    }
    else {
        timeKeep = setTimeout(function() {
            time = time - .01;
            timeClock[0].innerText = time.toFixed(2);
            start(time);
        }, 10);
    }

}

//speeltijd van de game (1 minuut)
start(30);

// create engine
var engine = Engine.create(),
    world = engine.world;

//het muis element
/**
 * @todo koppel dit met de Kinect
 * @todo meerdere 'muis' elementen (multiplayer)
 */
var myBody = Bodies.circle(10, 10, 50);
World.add(world, myBody);

//gravity op 0 zetten zodat het lijkt alsof de bladeren zweven
engine.world.gravity.scale = 0;

//grootte van het canvas (speelveld)
var canvasHeight = window.innerHeight - 3.5;
var canvasWidth = window.innerWidth - 3.5;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: canvasWidth,
        height: canvasHeight,
        background: 'img/aarde-achtergrond.png',
        showAngleIndicator: false,
        wireframes: false

    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

//creating walls
groundWidth = canvasWidth * 2 ;

//opties voor de style van de buiten randen
var wallOptions = {
    isStatic: true,
    render: {
        fillstyle: 'black',
        strokeStyle: 'black'
    }
};

//x, y, w, h, angle
World.add(world, [
    //de buitenranden om de bladeren niet van het veld te laten vallen
    //dit word gedaan door de isStatic
    Bodies.rectangle(0, 0, 5, groundWidth, wallOptions), //links
    Bodies.rectangle(canvasHeight, canvasHeight, groundWidth, 5, wallOptions), //onder
    Bodies.rectangle(canvasHeight, 0, groundWidth, 5, wallOptions), //boven
    Bodies.rectangle(canvasWidth, 0, 5, groundWidth, wallOptions), //rechts

    //de lijnen die de hokken visualiseren
    Bodies.rectangle(0, canvasHeight / 2 - 2.5, groundWidth / 2, 5, {isStatic: true, collisionFilter: {category: 0}, render: {fillStyle: '#c71d11',strokeStyle: '#c71d11'}} ), //x-as balk links boven
    Bodies.rectangle(0, canvasHeight / 2 + 2.5 , groundWidth / 2, 5, { isStatic: true, collisionFilter: {category: 0}, render: {fillStyle: '#f86610',strokeStyle: '#f86610'}}),//x-as balk links onder
    Bodies.rectangle(canvasWidth, canvasHeight / 2 - 2.5, groundWidth / 2, 5, {isStatic: true, collisionFilter: {category: 0}, render: {fillStyle: '#70c138',strokeStyle: '#70c138'}} ), //x-as balk links boven
    Bodies.rectangle(canvasWidth, canvasHeight / 2 + 2.5 , groundWidth / 2, 5, { isStatic: true, collisionFilter: {category: 0}, render: {fillStyle: '#f7d230',strokeStyle: '#f7d230'}}),//x-as balk links onder

    Bodies.rectangle(canvasWidth / 2 - 2.5, 0, 5, canvasHeight, {isStatic: true, collisionFilter: {category: 0}, render: {fillStyle: '#c71d11' ,strokeStyle: '#c71d11'}}), //y-as balk links boven
    Bodies.rectangle(canvasWidth / 2 + 2.5, 0, 5, canvasHeight, {isStatic: true, collisionFilter: {category: 0}, render: {fillStyle: '#70c138',strokeStyle: '#70c138'}}), //y-as balk links boven
    Bodies.rectangle(canvasWidth / 2 - 2.5, canvasHeight, 5, canvasHeight, {isStatic: true, collisionFilter: {category: 0}, render: {fillStyle: '#f86610',strokeStyle: '#f86610'}}), //y-as balk links onder
    Bodies.rectangle(canvasWidth / 2 + 2.5, canvasHeight, 5, canvasHeight, {isStatic: true, collisionFilter: {category: 0}, render: {fillStyle: '#f7d230',strokeStyle: '#f7d230'}})//y-as balk rechts onder
]);


//xx, yy, columns, rows, columnGap, rowGap, callback
var stack = Composites.stack(10, 10, 20, 14, 46, 26, function(x, y) {
    var random = Common.random(0, 1);

    //ternary operator voor het random bepalen van de verschillende bladeren op het speelveld
    var chooseRandomTexture = random < 0.25 ? 'oranje.png' : (random > 0.25 && random < 0.50 ? 'geel.png' : (random > 0.50 && random < 0.75 ? 'groen.png' : (random > 0.75 ? 'rood.png' : 'onbekend.png')));

    return Bodies.rectangle(x, y, 50, 50, {
        render: {
            sprite: {
                texture: 'img/blad_' + chooseRandomTexture
            }
        }
    })
});


World.add(world, stack);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

//rood, groen, oranje, geel
// var scores = {rood: 0, geel: 0, groen: 0, oranje: 0};
var players = [ {color: 'Rood', score: 0 }, {color: 'Groen', score: 0}, {color: 'Oranje', score: 0}, {color: 'Geel', score: 0} ];


//functie om te kijken hoeveel bladeren er in een vak zitten en om hier de score aan toe te wijzen
function checkscore()
{
    for(var i = 0; i < stack.bodies.length; i++)
    {
        //alle bladeren in het vlak LINKSBOVEN
        if(stack.bodies[i].position.x <= (canvasWidth / 2) && stack.bodies[i].position.y <= (canvasHeight / 2))
        {
            if(stack.bodies[i].render.sprite.texture == "img/blad_rood.png")
            {
                players[0].score++;
            }
        }

        //alle bladeren in het vlak RECHTSBOVEN
        if(stack.bodies[i].position.x >= (canvasWidth / 2)  && stack.bodies[i].position.y <= (canvasHeight / 2))
        {
            if(stack.bodies[i].render.sprite.texture == "img/blad_groen.png")
            {
                players[1].score++;
            }
        }

        //alle bladeren in het vlak LINKSONDER
        if(stack.bodies[i].position.x <= (canvasWidth / 2) && stack.bodies[i].position.y >= (canvasHeight / 2))
        {
            if(stack.bodies[i].render.sprite.texture == "img/blad_oranje.png")
            {
                players[2].score++;
            }
        }

        //alle bladeren in het vlak RECHTSONDER
        if(stack.bodies[i].position.x >= (canvasWidth / 2) && stack.bodies[i].position.y >= (canvasHeight / 2))
        {
            if(stack.bodies[i].render.sprite.texture == "img/blad_geel.png")
            {
                players[3].score++;
            }
        }
    }

    players.sort(function(a,b){return b.score - a.score});

    highscore();

}

function highscore() {
    timeClock[0].innerText = "Highsore:" + "\n" + players[0].color +" aantal punten: " + players[0].score + "\n" + players[1].color + " aantal punten: " + players[1].score + "\n" + players[2].color + " aantal punten: " + players[2].score + "\n" + players[3].color + " aantal punten: " + players[3].score + "\n";

}
