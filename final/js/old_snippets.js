
/**
 * @todo  this is NOT a TODO but we can keep old thrash here, but the @todo gives it a nice highlight ^^
 * @todo zo kunnen we de verbeterslagen laten zien
 */

/* @todo functies zitten nu in het server programma
functie om een range van getallen te berekenen naar een andere range. Dit gebruiken we om kinect waardes naar bruikbare pixel waardes om te zetten
function map (x,  in_min,  in_max,  out_min,  out_max){
    x = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    return (x);
}

//functie om de x waardes die uit de map functie komen binnen de resolutie van het scherm te houden
function limitX(x){
    if (x < 0 ){
        x = 0;
    }else if (x > canvasWidth){
        x = canvasWidth;
    }
    return(x = (Math.round(map(x, 0, 1, canvasWidth, 0))));
}

function limitY(y){
    if (y < 0 ){
        y = 0;
    }else if (y > canvasHeight){
        y = canvasHeight;
    }
    return(y = (Math.round(map(y, 0.4, 2.35, canvasHeight, 0))));
}
*/

// var parent;
// var element;
// var coorX;
// var coorY;
//
// function getMouseCoords(e) {
//     var e = e || window.event;
//     parent = document.body;
//     element = parent.getElementsByTagName('canvas')[0];
//
//     coorX = e.clientX;
//     coorY = e.clientY;
// }
//
//
// var followCursor = (function() {
//     var body = Bodies.circle(coorX, coorY, 50);
//     // var s = document.createElement('div');
//     // s.style.position = 'absolute';
//     // s.style.margin = '0';
//     // s.style.padding = '5px';
//     // s.style.border = '1px solid red';
//
//     return {
//         init: function() {
//             //var body = Bodies.circle(x, y, radius,);
//             World.add(world, body);
//             //document.body.appendChild(s);
//         },
//
//         run: function(e) {
//             var e = e || window.event;
//             body.x = (e.clientX);
//             body.y = (e.clientY);
//
//             //s.style.left  = (e.clientX - 5) + 'px';
//             //s.style.top = (e.clientY - 5) + 'px';
//             getMouseCoords(e);
//         }
//     };
// }());

/**
 * @todo We converted this big piece of code to a single row using a ternary operator
 */

// if (random < 0.25) {
//     return Bodies.rectangle(x, y, 50, 50, {
//         render: {
//             sprite: {
//                 texture: 'img/blad_oranje.png'
//             }
//         }
//     });
// }
// else if (random > 0.25 && random < 0.50)
// {
//     return Bodies.rectangle(x, y, 50, 50, {
//         render: {
//             sprite: {
//                 texture: 'img/blad_geel.png'
//             }
//         }
//     });
// }
// else if (random > 0.50 &&  random < 0.75)
// {
//     return Bodies.rectangle(x, y, 50, 50, {
//         render: {
//             sprite: {
//                 texture: 'img/blad_groen.png'
//             }
//         }
//     });
// }
// else
// {
//     return Bodies.rectangle(x, y, 50, 50, {
//         render: {
//             sprite: {
//                 texture: 'img/blad_rood.png'
//             }
//         }
//     });
// }
// });

/**
 * @todo made the walls we made easier to adjust using variables
 */

// Bodies.rectangle(canvasWidth, 0, 5, groundWidth, { isStatic: true, render: {fillStyle: 'black',strokeStyle: 'black'}  }), //rechts


/**
 * @todo we hebben een array gemaakt van bodies ipv 6 bodies apart toe te voegen aan de wereld, in deze array kunnen we straks ook de coordinaten makkelijker aanpassen
 */

// //het muis element
// var myBody = Bodies.circle(10, 10, 50, {render: {fillStyle: '#c71d11',strokeStyle: '#c71d11'}});
// var myBody1 = Bodies.circle(17, 170, 50, {render: {fillStyle: '#c71d11',strokeStyle: '#c71d11'}});
// var myBody2 = Bodies.circle(160, 160, 50, {render: {fillStyle: '#c71d11',strokeStyle: '#c71d11'}});
// var myBody3 = Bodies.circle(180, 180, 50, {render: {fillStyle: '#c71d11',strokeStyle: '#c71d11'}});
// var myBody4 = Bodies.circle(100, 100, 50, {render: {fillStyle: '#c71d11',strokeStyle: '#c71d11'}});
// var myBody5 = Bodies.circle(150, 150, 50, {render: {fillStyle: '#c71d11',strokeStyle: '#c71d11'}});
//
// World.add(world, myBody);
// World.add(world, myBody1);
// World.add(world, myBody2);
// World.add(world, myBody3);
// World.add(world, myBody4);
// World.add(world, myBody5);

//player0
// if(bodyFrame.bodies[0].joints !== undefined) {
//     myBody.position.x = limitX(bodyFrame.bodies[0].joints[limb].depthX);
//     myBody.position.y = limitY(bodyFrame.bodies[0].joints[limb].depthY);
// }

// //player1
// if(bodyFrame.bodies[1].joints !== undefined){
//     myBody1.position.x = limitX(bodyFrame.bodies[1].joints[limb].depthX);
//     myBody1.position.y = limitY(bodyFrame.bodies[1].joints[limb].depthY);
// }
//
// //player2
// if(bodyFrame.bodies[2].joints !== undefined){
//     myBody2.position.x = limitX(bodyFrame.bodies[2].joints[limb].depthX);
//     myBody2.position.y = limitY(bodyFrame.bodies[2].joints[limb].depthY);
// }
//
// //player3
// if(bodyFrame.bodies[3].joints !== undefined){
//     myBody3.position.x = limitX(bodyFrame.bodies[3].joints[limb].depthX);
//     myBody3.position.y = limitY(bodyFrame.bodies[3].joints[limb].depthY);
// }
//
// //player4
// if(bodyFrame.bodies[4].joints !== undefined){
//     myBody4.position.x = limitX(bodyFrame.bodies[4].joints[limb].depthX);
//     myBody4.position.y = limitY(bodyFrame.bodies[4].joints[limb].depthY);
// }
//
// //player5
// if(bodyFrame.bodies[5].joints !== undefined){
//     myBody5.position.x = limitX(bodyFrame.bodies[5].joints[limb].depthX);
//     myBody5.position.y = limitY(bodyFrame.bodies[5].joints[limb].depthY);
// }

/**
 * @todo old function to move a body
 */

/*   for (var i = 0; i <= bodies.length; i ++)
   {
       if(bodyFrame.bodies[i].joints !== undefined){
           bodies[i].position.x = limitX(bodyFrame.bodies[i].joints[limb].depthX);
           bodies[i].position.y = limitY(bodyFrame.bodies[i].joints[limb].depthY);
       }
   }*/