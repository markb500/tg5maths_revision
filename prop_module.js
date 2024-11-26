var sumarrprop = [], sumq, suma;
function stats() {
    //Produces randomly selected problems in statistics
    var sum, k, engspeed, propspeed, engspeedadj, propspeedadj, drag, dragadj, velocity, veladj, friction, frictionadj, weight, weightadj;
    var volume, pressure, volumeadj, pressureadj, current, resistance, currentadj, resistanceadj, intensity, distance, intensityadj, distanceadj;
    sumq = "";
    suma = "";
    // sumarrprop = QLimitRepeats(sumarrprop, 12);   //Ensures no repeat question until at least 50% of questions shown
    // sum = sumarrprop[sumarrprop.length - 1];
    sum = 1;
    switch(sum) {
        case 1:
            do {
                engspeed = rndgen(15000, 16000, 0, 250, -1);
                do {
                    engspeedadj = rndgen(-750, 750, 0, 250, -1);
                } while (engspeedadj === 0 || engspeed + engspeedadj < 15000 || engspeed + engspeedadj > 16000);
                propspeed = rndgen(2000, 3000, 0, 50, -1);
                k = engspeed / propspeed;
            } while (k - dp(k, 4, -1) !== 0 || k === 1)  //Ensures k has no more than 4 decimal places and isn't 1
            sumq += "The engine speed of an aircraft is directly proportional to the propeller speed.<br>";
            sumq += "a. If the engine rotates at " + thouSep(engspeed, "&nbsp;") + "&nbsp;rpm and the propeller rotates at " + thouSep(propspeed, "&nbsp;") + "&nbsp;rpm, " + 
                        "find the constant of proportionality (k) for the reduction gearbox.<br>";
            sumq += "b. Using the constant of proportionality calculated above, find the propeller speed when the engine speed " + 
                        "is " + thouSep((engspeed + engspeedadj), "&nbsp;") + "&nbsp;rpm, rounding your answer to 2 decimal places.";
            suma += "$$\\begin{aligned}a.\\ \\ engspeed&\\propto propspeed\\\\[5pt]";
            suma += "engspeed&=k\\ propspeed\\\\[5pt]";
            suma += "\\frac{engspeed}{propspeed}&=k\\\\[5pt]";
            suma += "\\frac{" + thouSep(engspeed, "\\ ") + "}{" + thouSep(propspeed, "\\ ") + "}&=k\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + k + "}}&=k\\\\[5pt]";
            suma += "b.\\ \\ engspeed&=k\\ propspeed\\\\[5pt]";
            suma += "\\frac{engspeed}{k}&=propspeed\\\\[5pt]";
            suma += "\\frac{" + thouSep((engspeed + engspeedadj), "\\ ") + "}{" + k + "}&=propspeed\\\\[5pt]";
            suma += "\\underline{\\mathbf{" + thouSep(dp((engspeed + engspeedadj) / k, 2, 2), "\\ ") + "\\ rpm}}&=propspeed\\ (2\\ dp)";
            suma += "\\end{aligned}$$";
            break;
    }
    var notesLink = "images/20230706-MathsBook08Proportionv1_6-APO.pdf#page=4";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}