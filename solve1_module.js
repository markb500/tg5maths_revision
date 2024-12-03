var a, b, c, d, e, f, x, s1, type, ltr;
function solve1() {
//Creates one of 4 versions of an equation. All have 2 instances of a single variable, the value of which
//is to be found. General format (ax + b)/c + (d+ex)/f =0, except type 5.
//type1 - var expressions on top with = between fractions
//type2 - var expressions on top with =0 at end. Sign between fracs may be + or -
//type3 - var expressions on bottom with = between fracs
//type4 - var expressions on bottom with =0 at end. Sign between fracs may be + or -
//type5 - dxz - exy^2 Calc using given values
    sumq = "";
    suma = "";
    type = rndgen(1, 5, 0, 1, -1);
                    // 1 - x's on top, = between fracs. 2 - x's on top =0.
                    // 3 - x's on bottom, = between fracs. 4 - x's on bottom =0
                    // 5 - dxz - exy^2 Calc using given values
    if (type < 5) {
        do {
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
            do {
                do {
                    a = rndgen(-9, 9, 0, 1, -1);
                    b = rndgen(-9, 9, 0, 1, -1);
                    d = rndgen(-9, 9, 0, 1, -1);
                    e = rndgen(-9, 9, 0, 1, -1);
                } while (a * b * d * e === 0)
                c = rndgen(2, 9, 0, 1, -1);
                f = rndgen(2, 9, 0, 1, -1);
                s1 = rndgen(0, 1, 0, 1, -1);
            } while ((c === f) || (Math.abs(b * f) == Math.abs(c * d)))
                        //Prevents same denominators, x coefficient of 1 and non-x coefficients total of 0

            sumq += "Find the value of \\(" + ltr + "\\) in the following equation.";
            if(type === 1 || type === 2) {
                if(type === 1) {    //Question in =0 format
                    sumq += "$$\\frac{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + "}{" + c + "}" + op(s1) + 
                                "\\frac{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}{" + f + "}=0$$";

                    if(!s1) {       //+ between fracs, cx signs to opposite
                        d = d * -1;
                        e = e * -1;
                    }
                    
                    suma += "$$\\begin{aligned}\\frac{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + "}{" + c + 
                                "}&=\\frac{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}{" + f + "}\\\\[5pt]";
                
                    suma += f + "(" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + ")&=" + 
                                c + "(" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + ")\\\\[5pt]";
                } else if(type === 2) {        //type = 2. Question format with = between fracs
                    if(!s1) {       //+ between fracs, cx signs to opposite
                        d = d * -1;
                        e = e * -1;
                    }
                    sumq += "$$\\frac{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + "}{" + c + 
                                "}=\\frac{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}{" + f + "}$$";
                
                    suma += "$$\\begin{aligned}" + f + "(" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + ")&=" + 
                                c + "(" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + ")\\\\[5pt]";
                }

                suma += cfchk(a * f, ltr, 1, 1) + cfchk(b * f, "", 0, 0) + "&=" + 
                            cfchk(c * d, "", 0, 1) + cfchk(c * e, ltr, 1, 0) + "\\\\[5pt]";
                    
                b = b * -1;     //Cx signs for transposing
                e = e * -1;
            
                suma += cfchk(a * f, ltr, 1, 1) + cfchk(c * e, ltr, 1, 0) + "&=" + 
                            cfchk(c * d, "", 0, 1) + cfchk(b * f, "", 0, 0) + "\\\\[5pt]";

                if(a * f + c * e === 1) {   //If x coefficient is 1, sum complete
                    suma += cfchk(a * f + c * e, ltr, 1, 1) + "&=\\underline{\\mathbf{" + 
                                cfchk(c * d + b * f, "", 0, 1) + "}}\\end{aligned}$$";
                } else {
                    suma += cfchk(a * f + c * e, ltr, 1, 1) + "&=" + 
                                cfchk(c * d + b * f, "", 0, 1) + "\\\\[5pt]";
                    suma += ltr + "&=\\frac{" + cfchk(c * d + b * f, "", 0, 1) + "}{" + 
                                cfchk(a * f + c * e, "", 0, 1) + "}\\\\[5pt]";

                    suma += ltr + "&=\\underline{\\mathbf{" + 
                                cfchk((c * d + b * f) / (a * f + c * e), "", 0, 1) + "}}\\end{aligned}$$";
                }
                x = (c * d + b * f) / (a * f + c * e);
            } else if(type === 3 || type === 4) {
                if(type === 3) {        //type = 3 x's on bottom, == between fracs
                    sumq += "$$\\frac{" + c + "}{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + "}" + op(s1) + 
                                "\\frac{" + f + "}{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}=0$$";
                    if(!s1) {       //+ between fracs, cx sign to opposite
                        f = f * -1;
                    }

                    suma += "$$\\begin{aligned}\\frac{" + c + "}{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + 
                                "}&=\\frac{" + f + "}{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}\\\\[5pt]";

                    suma += c + "(" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + 
                                ")&=" + f + "(" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + ")\\\\[5pt]";
                } else {        //type = 4 x's on bottom, =0
                    sumq += "$$\\frac{" + c + "}{" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + 
                    "}=\\frac{" + f + "}{" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + "}$$";

                    suma += "$$\\begin{aligned}" + c + "(" + cfchk(d, "", 0, 1) + cfchk(e, ltr, 1, 0) + 
                    ")&=" + f + "(" + cfchk(a, ltr, 1, 1) + cfchk(b, "", 0, 0) + ")\\\\[5pt]";
                }
                suma += cfchk(c * d, "", 0, 1) + cfchk(c * e, ltr, 1, 0) + 
                            "&=" + cfchk(a * f, ltr, 1, 1) + cfchk(b * f, "", 0, 0) + "\\\\[5pt]";

                d = d * -1;     //Cx signs for transposing
                a = a * -1;

                suma += cfchk(c * e, ltr, 1, 1) + cfchk(a * f, ltr, 1, 0) + 
                            "&=" + cfchk(b * f, "", 0, 1) + cfchk(c * d, "", 0, 0) + "\\\\[5pt]";

                suma += cfchk(c * e + a * f, ltr, 1, 1) + "&=" + cfchk(b * f + c * d, "", 0, 1) + "\\\\[5pt]";

                suma += ltr + "&=\\frac{" + cfchk(b * f + c * d, "", 0, 1) + "}{" + 
                            cfchk(c * e + a * f, "", 0, 1) + "}\\\\[5pt]";

                suma += ltr + "&=\\underline{\\mathbf{" + ((b * f + c * d) / (c * e + a * f)) + "}}\\end{aligned}$$";
                x = (b * f + c * d) / (c * e + a * f);
            }
        } while((x - dp(x, 3, -1) !== 0) || 
                    x % 0.25 !== 0 || 
                    Math.abs(x) === 1 || 
                    ((c * d + b * f) === (a * f + c * e)))  //Ensure solution max 2 dp in 0.25 steps and not 1 (too easy)
    } else if (type === 5) {      //dxz - exy^2
        do {
            do {
                a = rndgen(-9, 9, 0, 1, -1)
            }while (a === 0 || Math.abs(a) === 1);
            do {
                b = rndgen(-4, 4, 0, 1, -1)
            }while (b === 0 || Math.abs(b) === 1);
            c = rndgen(0.25, 0.75, 2, 0.25, -1);
            d = rndgen(3, 6, 0, 1, -1);
            e = rndgen(2, 4, 0, 1, -1);
        }while (dp(d*a*c-e*a*Math.pow(b, 2), 0, -1) !== d*a*c-e*a*Math.pow(b, 2) || Math.abs(d*a*c) > 150 || Math.abs(e*a*Math.pow(b, 2)) > 150);
        if (c === 0.25) {
            cFrac = "\\frac{1}{4}";
        } else if (c === 0.5) {
            cFrac = "\\frac{1}{2}";
        } else if (c === 0.75) {
            cFrac = "\\frac{3}{4}";
        }
        sumq += "Without using a calculator, solve the following expression using the given values.<br>";
        sumq += "$$" + d + "xz-" + e + "xy^2$$"
        sumq += "$$where\\ x=" + a + "\\ y=" + b + "\\ z=" + cFrac + "$$";
        suma += "$$\\begin{aligned}&=" + d + "\\times" + a + "\\times" + cFrac + "-" + e + "\\times" + a + "\\times" + b + "^" + 2 + "\\\\[5pt]";
        suma += "&=" + (d*a*c) + "-" + (e*a*Math.pow(b, 2)) + "\\\\[5pt]";
        suma += "&=\\underline{\\mathbf{" + (d*a*c-e*a*Math.pow(b, 2)) + "}}";
        suma += "\\end{aligned}$$";
    }

    var notesLink = "images/20240924-TG5MathsBook2-AlgebraV1_0-APO.pdf#page=20"
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}