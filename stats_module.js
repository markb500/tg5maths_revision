var sumq, suma;
function stats(ctx) {
    //Produces randomly selected problems in statistics
    var sum, a, b, c, d, e;
    sumq = "";
    suma = "";
    // sumarrprop = QLimitRepeats(sumarrprop, 12);   //Ensures no repeat question until at least 50% of questions shown
    // sum = sumarrprop[sumarrprop.length - 1];
    sum = 1;
    switch(sum) {
        case 1:
            do{
                a = rndgen(2, 36, 0, 1, -1);
                b = rndgen(2, 36, 0, 1, -1);
                c = rndgen(2, 36, 0, 1, -1);
                d = rndgen(2, 36, 0, 1, -1);
                e = rndgen(2, 36, 0, 1, -1);
            }while (a === b || a === c || a === d || a === e || b === c || b === d || b === e || c === d || c === e || d === e || 
                        dp(360 / (a + b + c + d + e), 0, -1) !== (360 / (a + b + c + d + e)));
            sumq += "a = " + a + " b = " + b + " c = " + c + " d = " + d + " e = " + e + " total = " + (a + b + c + d + e) + 
                                                                                " per deg = " + (360 / (a + b + c + d + e)) + "<br>";

            var startx = 200;
            var starty =200;
            var x, y;
            radius = 120;
            var angleScale = 360 / (a + b + c + d + e);
            var angles = [["a", a, a / 2 * angleScale * Math.PI / 180], 
                        ["b", b, (a * angleScale + (b / 2) * angleScale) * Math.PI / 180], 
                        ["c", c, ((a + b) * angleScale + (c / 2) * angleScale) * Math.PI / 180], 
                        ["d", d, ((a + b + c) * angleScale + (d / 2) * angleScale) * Math.PI / 180], 
                        ["e", e, ((a + b + c + d) * angleScale + (e / 2) * angleScale) * Math.PI / 180]];    //Angles for label positions
            ctx.strokeStyle = '#0000ff';
            ctx.arc(200, 200, radius, 0, 2 * Math.PI);
            ctx.moveTo(startx, starty);
            ctx.lineTo(startx + radius * Math.cos(0 * (Math.PI / 180)), 
                            starty + radius * Math.sin(0 * (Math.PI / 180)));
            ctx.moveTo(startx, starty);
            ctx.lineTo(startx + radius * Math.cos((a * angleScale) * (Math.PI / 180)), 
                            starty + radius * Math.sin((a * angleScale) * (Math.PI / 180)));
            ctx.moveTo(startx, starty);
            ctx.lineTo(startx + radius * Math.cos(((a + b) * angleScale) * (Math.PI / 180)), 
                            starty + radius * Math.sin(((a + b) * angleScale) * (Math.PI / 180)));
            ctx.moveTo(startx, starty);
            ctx.lineTo(startx + radius * Math.cos(((a + b + c) * angleScale) * (Math.PI / 180)), 
                            starty + radius * Math.sin(((a + b + c) * angleScale) * (Math.PI / 180)));
            ctx.moveTo(startx, starty);
            ctx.lineTo(startx + radius * Math.cos(((a + b + c + d) * angleScale) * (Math.PI / 180)), 
                            starty + radius * Math.sin(((a + b + c + d ) * angleScale) * (Math.PI / 180)));
            ctx.stroke();
            // ctx.moveTo(startx + (radius + 10) * Math.sin(a / 2 * (Math.PI / 180)), starty + (radius + 10) * Math.cos(a / 2 * (Math.PI / 180)))
            ctx.font = "20px Comic Sans MS";
            ctx.textAlign = "left";
            for (let i = 0; i < 5; i++) {
                x = startx + (radius + 20) * Math.cos(angles[i][2]);
                y = starty + (radius + 20) * Math.sin(angles[i][2]);
                if (Math.cos(angles[i][2]) > 0) {
                    ctx.textAlign = "left";
                } else {
                    ctx.textAlign = "right";
                }
                ctx.fillText(angles[i][0] + " = " + angles[i][1], x, y);
                ctx.stroke();
            }



            // ctx.fillText("a", startx + (radius + 10) * Math.cos(a / 2 * angleScale * (Math.PI / 180)), starty + (radius + 10) * Math.sin(a / 2 * angleScale * (Math.PI / 180)));
            // ctx.fillText("a = " + a, x, y);
            // ctx.fillText("d = " + d, startx + (radius + 10) * Math.cos(45 * Math.PI / 180), starty + 10 - (radius + 10) * Math.sin(45 * Math.PI / 180));
            // ctx.textAlign = "right";
            // ctx.fillText("b = 45", startx - (radius + 10) * Math.cos(45 * Math.PI / 180), starty + (radius + 10) * Math.sin(45 * Math.PI / 180));
            // ctx.fillText("c = 45", startx - (radius + 10) * Math.cos(45 * Math.PI / 180), starty + 10 - (radius + 10) * Math.sin(45 * Math.PI / 180));
            // ctx.stroke();
            break;
    }
    var notesLink = "images/20230706-MathsBook08Proportionv1_6-APO.pdf#page=4";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}