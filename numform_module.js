function numform() {
    //Generates 2 numbers with x10 exponents. These must either be multiplied or divided
    //and then given in both sci and eng notation form. No calculator.
    //Uses sciengnot & pwrzero functions in utils_maths_module
    sumq = "";
    suma = "";
    var tmp = rndgen(1, 3, 0, 1, -1);
    switch(tmp) {
        case 1: //multiply the numbers
            do {
                var num1 = rndgen(10.5, 500, 1, 0.1, -1);
                var num2 = rndgen(0.5, 4.5, 1, 0.1, -1);
            }while(num1 === 1 || num2 - dp(num2, 0, -1) === 0)
            var pwr1 = rndgen(-5, 5, 0, 1, -1);
            var pwr2 = rndgen(-5, 5, 0, 1, -1);
            var num = dp(num1 * num2, 2, -1);
            var pwr = pwr1 + pwr2;
            var results = sciengnot(num, pwr);  //returns array[scinum, scipwr, engnum, engpwr]
            sumq += "Without using a calculator, calculate the following, giving your answer in Standard Form (Scientific Notation) ";
            sumq += "and Preferred Standard Form (Engineering Notation). Show all your working<BR>";
            sumq += "$$" + pwrzero(num1, pwr1) + "\\ \\ \\times\\ \\ " + pwrzero(num2, pwr2) + "$$<BR>";

            suma += "$$\\begin{aligned}&=" + num1 + "\\times" + num2 + "\\times 10^{" + pwr1 + "\\ +\\ " + pwr2 + "}\\\\[5pt]";
            suma += "&=" + num + "\\times 10^{" + pwr + "}\\\\[5pt]";
            suma += "In\\ Scientific\\ Notation &=\\underline{\\mathbf{" + results[0] + "\\times 10^{" + results[1] + "}}}\\\\[5pt]";
            suma += "In\\ Engineering\\ Notation &=\\underline{\\mathbf{" + results[2] + "\\times 10^{" + results[3] + "}}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
        case 2: //divide the numbers
            do {
                var num1 = rndgen(10.5, 500, 1, 0.1, -1);
                var num2 = rndgen(0.5, 4.5, 1, 0.1, -1);
            }while(num1 === 1 || num2 - dp(num2, 0, -1) === 0 || (num1 / num2) - dp(num1 / num2, 0, -1) === 0 || (num1 / num2) - dp(num1 / num2, 2, -1) !== 0)
            var pwr1 = rndgen(-5, 5, 0, 1, -1);
            var pwr2 = rndgen(-5, 5, 0, 1, -1);
            var num = dp(num1 / num2, 2, -1);
            var pwr = pwr1 - pwr2;
            var results = sciengnot(num, pwr);  //returns array[scinum, scipwr, engnum, engpwr]
            sumq += "Without using a calculator, calculate the following, giving your answer in Standard Form (Scientific Notation) ";
            sumq += "and Preferred Standard Form (Engineering Notation). Show all your working<BR>";
            sumq += "$$\\frac{" + pwrzero(num1, pwr1) + "}{" + pwrzero(num2, pwr2) + "}$$<BR>";

            suma += "$$\\begin{aligned}&=\\frac{" + num1 + "}{" + num2 + "}\\times 10^{" + pwr1 + "\\ -\\ " + pwr2 + "}\\\\[5pt]";
            suma += "&=" + num + "\\times 10^{" + pwr + "}\\\\[5pt]";
            suma += "In\\ Scientific\\ Notation &=\\underline{\\mathbf{" + results[0] + "\\times 10^{" + results[1] + "}}}\\\\[5pt]";
            suma += "In\\ Engineering\\ Notation &=\\underline{\\mathbf{" + results[2] + "\\times 10^{" + results[3] + "}}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
        case 3: //approximate & solve, using sci notation (a x b)/c
            do {
                var a = rndgen(0.101, 1.989, 3, 0.001, -1);
                var b = rndgen(2111, 600111, 0, 1, -1);
                var c = rndgen(201, 802, 0, 1, -1);
                var asoln = sciengnot(a, 0);
                var bsoln = sciengnot(b, 0);
                var csoln = sciengnot(c, 0);
            }while(dp(dp(asoln[0], 0, -1) * dp(bsoln[0], 0, -1) / dp(csoln[0], 0, -1), 2, -1) !== dp(asoln[0], 0, -1) * dp(bsoln[0], 0, -1) / dp(csoln[0], 0, -1) 
                    || dp(asoln[0], 0, -1) === dp(csoln[0], 0, -1) || dp(bsoln[0], 0, -1) === dp(csoln[0], 0, -1)
                    || (dp(asoln[0], 0, -1) * dp(bsoln[0], 0, -1)) === dp(csoln[0], 0, -1));
            sumq += "Without using a calculator, use Standard Form to approximate the following, giving your answer as a number.";
            sumq += "$$\\frac{" + a + "\\times" + b + "}{" + c + "}$$<BR>";
            suma += "$$\\begin{aligned}&=\\frac{" + dp(asoln[0], 0, -1) + "\\times 10^{" + asoln[1] + "}\\times" + dp(bsoln[0], 0, -1) + 
                                    "\\times 10^" + bsoln[1] + "}{" + dp(csoln[0], 0, -1) + "\\times 10^" + csoln[1] + "}\\\\[5pt]";
            suma += "&=\\frac{" + dp(asoln[0], 0, -1) * dp(bsoln[0], 0, -1) + "\\times 10^{" + (asoln[1] + bsoln[1]) + "}}{" + dp(csoln[0], 0, -1) + 
                                    "\\times 10^" + csoln[1] + "}\\\\[5pt]";
            suma += "&=" + (dp(asoln[0], 0, -1) * dp(bsoln[0], 0, -1) / dp(csoln[0], 0, -1)) + "\\times 10^" + (asoln[1] + bsoln[1] - csoln[1]) + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + ((dp(asoln[0], 0, -1) * dp(bsoln[0], 0, -1) / dp(csoln[0], 0, -1)) * Math.pow(10, (asoln[1] + bsoln[1] - csoln[1]))) + "}}";
            suma += "\\end{aligned}$$";
            suma += "Note: calculated answer = " + dp(a * b / c, 2, 2) + " (2 dp)";
            break;
    }
    var notesLink = "images/20240924-TG5MathsBook1-NumeracyV1_0-APO.pdf#page=46";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}