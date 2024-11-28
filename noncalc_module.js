var sumarrnoncalc = [], a, b, c, d, e;

function noncalc() {
//Creates questions in 1 of 4 randomly chosen forms to be solved without use of calculator.
//type1 - a * ((b + c) / d)
//type2 - ((a + b) / c) * d
//type3 - (a / (b + c)) * d
//type4 - a + b(c + d) / e
//type5 - a / b + c(d + e)
    sumq = "";
    suma = "";
    sumarrnoncalc = QLimitRepeats(sumarrnoncalc, 7);   //Ensures no repeat question until at least 50% of questions shown
    sum = sumarrnoncalc[sumarrnoncalc.length - 1];
    switch (sum) {
        case 1:
            //a x b + c / d
            do {
                a = rndgen(-10, 10, 2, 0.01, -1);
                b = rndgen(0.1, 9.9, 2, 0.01, -1);
                c = rndgen(-10, 10, 2, 0.01, -1);
                d = rndgen(-0.9, 0.9, 1, 0.1, -1);
            }while (a * b * c * d === 0 ||
                a === 1 ||
                Math.abs(d) === 0.1 ||
                Math.abs(b + c) === Math.abs(d) ||
                (b + c) / d - dp((b + c) / d, 3, -1) !== 0 ||
                (b + c) / d === 0 ||
                (a * (b + c) / d) - dp(a * (b + c) / d, 2, -1) !== 0)
        
            sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
            sumq += "$$" + a + "\\times\\frac {" + b + cfchk(c, "", 0, 0) + "}{" + d + "}$$<br />";            
            
            suma += "$$\\begin{aligned}&=" + a + "\\times\\frac {" + dp(b + c, 2, -1) + "}{" + d + "} \\\\[5pt]";
            suma += "&=" + a + "\\times" + dp((b + c) / d, 3, -1) + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(a *(b + c) / d, 2, -1) + "}}\\end{aligned}$$";
            var notesLink = "images/20240924-TG5MathsBook1-NumeracyV1_0-APO.pdf#page=14";
            break;
        case 2:
            //a + b / c x d
            do {
                a = rndgen(0.1, 9.9, 2, 0.01, -1);
                b = rndgen(-10, 10, 2, 0.01, -1);
                c = rndgen(-0.9, 0.9, 1, 0.1, -1);
                d = rndgen(-10, 10, 2, 0.01, -1);
            }while (a * b * c * d === 0 ||
                Math.abs(c) === 0.1 ||
                d === 1 ||
                Math.abs(a + b) === Math.abs(c) ||
                (a + b) / c - dp((a + b) / c, 3, -1) !== 0 ||
                (a + b) / c === 0 ||
                (a + b) / c * d - dp((a + b) / c * d, 2, -1) !== 0)
        
            sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
            sumq += "$$\\frac {" + a + cfchk(b, "", 0, 0) + "}{" + c + "}\\times" + d + "$$<br />";            
        
            suma += "$$\\begin{aligned}&=\\frac {" + dp(a + b, 2, -1) + "}{" + c + "}\\times" + d + " \\\\[5pt]";
            suma += "&=" + dp((a + b) / c, 3, -1) + "\\times" + d + " \\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp((a + b) / c * d, 2, -1) + "}}\\end{aligned}$$";
            var notesLink = "images/20240924-TG5MathsBook1-NumeracyV1_0-APO.pdf#page=14";
            break;
        case 3:
            //a / b + c x d
            do {
                a = rndgen(0.1, 9.9, 2, 0.01, -1);
                b = rndgen(-10, 10, 1, 0.1, -1);
                c = rndgen(-0.9, 0.9, 1, 0.1, -1);
                d = rndgen(-10, 10, 2, 0.01, -1);
            }while (a * b * c * d === 0 ||
                d === 1 ||
                Math.abs(b + c) === 0.1 ||
                Math.abs(b + c) === 1 ||
                Math.abs(a) === Math.abs(b + c) ||
                a / (b + c) - dp(a / (b + c), 3, -1) !== 0 ||
                a / (b + c) === 0 ||
                a / (b + c) * d - dp(a / (b + c) * d, 2, -1) !== 0)
        
            sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
            sumq += "$$\\frac {" + a + "}{" + b + cfchk(c, "", 0, 0) + "}\\times" + d + "$$<br />";            
        
            suma += "$$\\begin{aligned}&=\\frac {" + a + "}{" + dp(b + c, 2, -1) + "}\\times" + d + " \\\\[5pt]";
            suma += "&=" + dp(a / (b + c), 3, -1) + "\\times" + d + " \\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(a / (b + c) * d, 2, -1) + "}}\\end{aligned}$$";
            var notesLink = "images/20240924-TG5MathsBook1-NumeracyV1_0-APO.pdf#page=14";
            break;
        case 4:
            //a + b(c + d) / e
            do {
                a = rndgen(1, 20, 0, 1, -1);
                b = rndgen(-10, 10, 0, 1, -1);
                c = rndgen(1, 10, 2, 0.01, -1);
                d = rndgen(-10, 10, 2, 0.01, -1);
                e = rndgen(-0.99, 0.99, 2, 0.01, -1);
            }while (a * b * c * d * e === 0 ||
                    b === 1 ||
                    c + d === 0 ||
                    b * (c + d) === 0 ||
                    b * (c + d) / e === 0 ||
                    b * (c + d) - dp(b *(c + d), 2, -1) !== 0 ||
                    b * (c + d) / e - dp(b *(c + d) / e, 2, -1) !== 0 ||
                    (c + d) / e - dp((c + d) / e, 2, -1) !== 0 ||
                    (c + d) / e - dp((c + d) / e, 0, -1) !== 0 ||
                    Math.abs((c + d)) === Math.abs(e))
        
            sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
            sumq += "$$" + a + cfchk(b, "", 0, 0) + "(" + c + cfchk(d, "", 0, 0) + ")\\div" + e + "$$<br />";
        
            suma += "$$\\begin{aligned}&=" + a + cfchk(b, "", 0, 0) + "\\times" + 
                        dp(c + d, 2, -1) + "\\div" + e + "\\\\[5pt]";
            suma += "&=" + a + cfchk(b * (c + d), "", 0, 0) + "\\div" + e + "\\\\[5pt]";
            suma += "&=" + a + cfchk(b * (c + d) / e, "", 0, 0) + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(a + b * (c + d) / e, 2, -1) + "}}\\end{aligned}$$"
            var notesLink = "images/20240924-TG5MathsBook1-NumeracyV1_0-APO.pdf#page=14";
            break;
        case 5:
            //a / b + c(d + e)
            do {
                a = rndgen(1, 20, 0, 1, -1);
                b = rndgen(-0.99, 0.99, 2, 0.01, -1);
                c = rndgen(-10, 10, 0, 1, -1);
                d = rndgen(1, 10, 2, 0.01, -1);
                e = rndgen(-10, 10, 2, 0.01, -1);
            }while (a * b * c * d * e === 0 ||
                    Math.abs(b) === 0.1 ||
                    Math.abs(b) === 0.01 ||
                    d + e === 0 ||
                    Math.abs(d + e) === 1 ||
                    Math.abs(a) === Math.abs(b) ||
                    a / b - dp(a / b, 3, -1) !== 0 ||
                    c / (d + e) - dp(c / (d + e), 3, -1) !== 0 ||
                    a / b + c * (d + e) - dp(a / b + c * (d + e), 2, -1) !== 0)
        
            sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
            sumq += "$$" + a + "\\div" + b + cfchk(c, "", 0, 0) + "(" + d + cfchk(e, "", 0, 0) + ")$$<br />";
        
            suma += "$$\\begin{aligned}&=" + a + "\\div" + b + cfchk(c, "", 0, 0) + "\\times" + dp(d + e, 2, -1) + "\\\\[5pt]";
            suma += "&=" + dp(a/b, 3, -1) + cfchk(c, "", 0, 0) + "\\times" + dp(d + e, 2, -1) + "\\\\[5pt]";
            suma += "&=" + dp(a/b, 3, -1) + cfchk(dp(c * (d + e), 3, -1), "", 0, 0) + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(a / b + c * (d + e), 2, -1) + "}}\\end{aligned}$$"
            var notesLink = "images/20240924-TG5MathsBook1-NumeracyV1_0-APO.pdf#page=14";
            break;
        case 6:
            // a - (b(c - d)) / e    Whole numbers at each stage of calc
            a = rndgen(20, 40, 0, 1, -1);
            do{
                b = rndgen(2, 5, 0, 1, -1);
                do{
                    c = rndgen(2, 30, 0, 1, -1);
                    d = rndgen(2, 30, 0, 1, -1);
                }while (c - d === 0 || Math.abs(c - d) === 1);
                do {
                    e = rndgen(-9, 9, 0, 1, -1);
                }while (e === 0 || Math.abs(e) === 1 || Math.abs(e) === b);
            }while (dp(b*(c-d)/e, 0, -1) !== b*(c-d)/e);
            sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
            sumq += "$$" + a + "-\\frac{" + b + "(" + c + "-" + d + ")}{" + e + "}$$<br>";
            suma += "$$\\begin{aligned}&=" + a + "-\\frac{" + b + "\\times" + (c - d) + "}{" + e + "}\\\\[5pt]";
            suma += "&=" + a + "-\\frac{" + (b*(c-d)) + "}{" + e + "}\\\\[5pt]";
            suma += "&=" + a + "-" + ((b*(c-d))/e) + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + (a-((b*(c-d))/e)) + "}}";
            suma += "\\end{aligned}$$"
            var notesLink = "images/20240924-TG5MathsBook1-NumeracyV1_0-APO.pdf#page=14";
            break;
        case 7:
            //a * b / (c + d) - e
            do{
                do{
                    a = rndgen(-20, 20, 0, 1, -1);          //Not 0, 1 or -1
                }while (a === 0 || Math.abs(a) === 1);
                do{
                    b = rndgen(-20, 20, 0, 1, -1);          //Not 0, 1 or -1
                }while (b === 0 || Math.abs(b) === 1);
                do{
                    c = rndgen(-20, 20, 0, 1, -1);          //Not 0, 1 or -1
                }while (c === 0 || Math.abs(c) === 1);
                do{
                    d = rndgen(-20, 20, 0, 1, -1);          //Not 0, 1 or -1, c+d not 1 & c !== d
                }while (d === 0 || Math.abs(d) === 1 || (Math.abs(c+d) === 1) || Math.abs(c) === Math.abs(d));
                e = rndgen(2, 20, 1, 0.1, -1);
            }while (dp((a*b)/(c+d), 1, -1) !== ((a*b)/(c+d)) || Math.abs(a*b) > 100 || a === (c+d) || b === (c+d) || Math.abs(a*b) === Math.abs(c+d));
                        //Solution max 1 dp, a*b max 100, avoid a or b = c+d (easy cancelling), avoid a*b = c+d (easy div)
            sumq += "Calculate the following, without using a calculator. Show all your working.<br />";
            sumq += "$$" + a + "\\times" + b + "\\div(" + c + "+" + d + ")-" + e + "$$";
            suma += "$$\\begin{aligned}&=" + a + "\\times" + b + "\\div" + (c+d) + "-" + e + "\\\\[5pt]";
            suma += "&=" + (a * b) + "\\div" + (c+d) + "-" + e + "\\\\[5pt]";
            suma += "&=" + dp((a*b)/(c+d), 2, -1) + "-" + e + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp((a*b)/(c+d)-e, 2, -1) + "}}";
            suma += "\\end{aligned}$$"
            var notesLink = "images/20240924-TG5MathsBook1-NumeracyV1_0-APO.pdf#page=14";
            break;
    }
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}