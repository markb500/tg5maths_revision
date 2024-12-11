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

            var startx = 250;
            var starty =250;
            var x, y;
            radius = 100;
            var angleScale = 360 / (a + b + c + d + e);
            var angles = [["Crisps", a * angleScale, a / 2 * angleScale * Math.PI / 180], 
                        ["Peanuts", b * angleScale, (a * angleScale + (b / 2) * angleScale) * Math.PI / 180], 
                        ["Choc bar", c * angleScale, ((a + b) * angleScale + (c / 2) * angleScale) * Math.PI / 180], 
                        ["Apple", d * angleScale, ((a + b + c) * angleScale + (d / 2) * angleScale) * Math.PI / 180], 
                        ["Banana", e * angleScale, ((a + b + c + d) * angleScale + (e / 2) * angleScale) * Math.PI / 180]];
                            //Labels, sector angles in degrees, angle from zero to each sector centre in radians
            sumq += "The favourite snacks of " + (a + b + c + d + e) + " students are shown in the pie chart below. From the chart<br>";
            sumq += "a. How many students prefer peanuts.<br>b. How many students prefer a chocolate bar.";
            suma += "<br>".repeat(9);
            suma += "$$\\begin{aligned}a. \\frac{360}{" + (a + b + c + d + e) + "}=" + (360/(a+b+c+d+e)) + "\\ degrees\\ per\\ student.\\\\[5pt]";
            suma += "For\\ peanuts,\\ \\frac{" + (b * angleScale) + "}{" + (360/(a+b+c+d+e)) + "}&=\\underline{\\mathbf{" + ((b * angleScale) / (360/(a+b+c+d+e))) + 
                        "\\ students\\ prefer\\ peanuts}}\\\\[5pt]";
            suma += "b.\\frac{360-(" + angles[0][1] + "+" + angles[1][1] + "+" + angles[3][1] + "+" + angles[4][1] + ")}{" + (360/(a+b+c+d+e)) + 
                        "}&=\\underline{\\mathbf{" + (360 - (angles[0][1] + angles[1][1] + angles[3][1] + angles[4][1])) / (360/(a+b+c+d+e)) + 
                        "\\ students\\ prefer\\ a\\ chocolate\\ bar.}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            ctx.strokeStyle = '#0000ff';
            ctx.arc(startx, starty, radius, 0, 2 * Math.PI);
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
                if (i === 2) {
                    ctx.fillText(angles[i][0], x, y);
                } else {
                    ctx.fillText(angles[i][0] + " = " + angles[i][1] + "\xB0", x, y);
                }
                ctx.stroke();
            }
            break;
    }
    var notesLink = "images/20230706-MathsBook08Proportionv1_6-APO.pdf#page=4";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}