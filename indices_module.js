var ltr, r1, n1, d1, r2, n2, d2, r3, n3, d3, n4, nsoln, dsoln, comfac;
function indices() {
//Creates one of three expression forms. Each variable can have index -9 to 9 (not 0) and no two absolute index values can be the same.
//Also, absolute values of top and bottom index totals can't be the same.
    sumq = "";
    suma = "";
    switch(rndgen(1, 4, 0, 1, -1)) {
        case 1:
            ltr = "x";
            break;
        case 2:
            ltr = "m";
            break;
        case 3:
            ltr = "a";
            break;
        case 4:
            ltr = "&#969";  //omega
            break;
    }
    switch(rndgen(1, 3, 0, 1, -1)) {
        case 1:             //(a x b) / c
            do {
                do {
                    n1 = rndgen(-9, 9, 0, 1, -1);
                }while (n1 === 0);
                do {
                    n2 = rndgen(-9, 9, 0, 1, -1);
                }while (n2 === 0);
                do {
                    n3 = rndgen(-9, 9, 0, 1, -1);
                }while (n3 === 0);
            }while (Math.abs(n1) === Math.abs(n2) || Math.abs(n1) === Math.abs(n3) || Math.abs(n2) === Math.abs(n3) || Math.abs(n1 + n2) === Math.abs(n3))
            sumq += "Without using a calculator, simplify the following.<br>";
            sumq += "$$\\frac{" + ltr + "^{" + n1 + "}\\times " + ltr + "^{" + n2 + "}}{" + ltr + "^{" + n3 + "}}$$"
            suma += "$$\\begin{aligned}&=" + ltr + "^{" + n1 + "+" + n2 + "-" + n3 + "}\\\\[5pt]";
            suma += "&=" + ltr + "^{" + (n1+n2-n3) + "}";
            suma += "\\end{aligned}$$";
            break;
        case 2:             //a / (b x c)
            do {
                do {
                    n1 = rndgen(-9, 9, 0, 1, -1);
                }while (n1 === 0);
                do {
                    n2 = rndgen(-9, 9, 0, 1, -1);
                }while (n2 === 0);
                do {
                    n3 = rndgen(-9, 9, 0, 1, -1);
                }while (n3 === 0);
            }while (Math.abs(n1) === Math.abs(n2) || Math.abs(n1) === Math.abs(n3) || Math.abs(n2) === Math.abs(n3) || Math.abs(n1) === Math.abs(n2 + n3))
            sumq += "Without using a calculator, simplify the following.<br>";
            sumq += "$$\\frac{" + ltr + "^{" + n1 + "}}{" + ltr + "^{" + n2 + "}\\times " + ltr + "^{" + n3 + "}}$$"
            suma += "$$\\begin{aligned}&=" + ltr + "^{" + n1 + "-(" + n2 + "+" + n3 + ")}\\\\[5pt]";
            suma += "&=" + ltr + "^{" + n1 + "-" + (n2+n3) + "}\\\\[5pt]";
            suma += "&=" + ltr + "^{" + (n1-(n2+n3)) + "}";
            suma += "\\end{aligned}$$";
            break;
        case 3:             //(a x b) / (c x d)
            do {
                do {
                    n1 = rndgen(-9, 9, 0, 1, -1);
                }while (n1 === 0);
                do {
                    n2 = rndgen(-9, 9, 0, 1, -1);
                }while (n2 === 0);
                do {
                    n3 = rndgen(-9, 9, 0, 1, -1);
                }while (n3 === 0);
                do {
                    n4 = rndgen(-9, 9, 0, 1, -1);
                }while (n4 === 0);
            }while (Math.abs(n1) === Math.abs(n2) || Math.abs(n1) === Math.abs(n3) || Math.abs(n1) === Math.abs(n4) || 
                    Math.abs(n2) === Math.abs(n3) || Math.abs(n2) === Math.abs(n4) || Math.abs(n3) === Math.abs(n4) || Math.abs(n1 + n2) === Math.abs(n3 + n4))
            sumq += "Without using a calculator, simplify the following.<br>";
            sumq += "$$\\frac{" + ltr + "^{" + n1 + "}\\times " + ltr + "^{" + n2 + "}}{" + ltr + "^{" + n3 + "}\\times " + ltr + "^{" + n4 + "}}$$"
            suma += "$$\\begin{aligned}&=" + ltr + "^{(" + n1 + "+" + n2 + ")-(" + n3 + "+" + n4 + ")}\\\\[5pt]";
            suma += "&=" + ltr + "^{" + (n1+n2) + "-" + (n3+n4) + "}\\\\[5pt]";
            suma += "&=" + ltr + "^{" + ((n1+n2)-(n3+n4)) + "}";
            suma += "\\end{aligned}$$";
            break;
    }
    var notesLink = "images/20200504-MathsBook3Indicesv1_3-APO.pdf#page=4";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}