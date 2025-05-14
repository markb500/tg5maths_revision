var x, y, prevnum = 0, term1, term2, term3, Hcf, Lcm;
function hcflcm(ctx2) {
//Creates an expression with 3 terms, each with up to 4 variables. Each variable has an index from 1 to 6
//Solution requires HCF (GCD) and LCM to be found without use of a calculator (primes tree shown in soln),
//followed by factorisation of the expression.
//Modified for TG5 maths, doesn't require factorization of an expression.
    sumq = "";
    suma = "";
    do {    //Generates hcf, creates 3 random multiples of hcf and then gets lcm of those 3 terms
        Hcf = rndgen(2, 11, 0, 1, -1);  //int 2 to 11
        term1 = Hcf * rndgen(1, 8, 0, 1, -1);
        term2 = Hcf * rndgen(1, 8, 0, 1, -1);
        term3 = Hcf * rndgen(1, 8, 0, 1, -1);
        Lcm = lcm([term1, term2, term3]);
        Hcf = gcd([term1, term2, term3]);   //Ensures Hcf is highest possible for the 3 terms
    } while(term1 === term2 || term1 === term3 || term2 === term3 ||
            Hcf === term1 || Hcf === term2 || Hcf === term3 ||
            Hcf === 10)  //Ensures 3 different terms, none equal to hcf and hcf not 10 (far too easy)
    
    var primeFacs1 = primeFactors(term1);
    var primeFacs2 = primeFactors(term2);
    var primeFacs3 = primeFactors(term3);
    var primesExp1 = primeExponents(primeFacs1);
    var primesExp2 = primeExponents(primeFacs2);
    var primesExp3 = primeExponents(primeFacs3);
    
    ctx2.fillText(primeTree(ctx2, term1, primeFacs1, primesExp1, 75, 50), x - 50, 330);
    ctx2.fillText(primeTree(ctx2, term2, primeFacs2, primesExp2, 250, 50), x - 50, 330);
    ctx2.fillText(primeTree(ctx2, term3, primeFacs3, primesExp3, 425, 50), x - 50, 330);
    
    sumq += "Find the HCF and LCM for the following numbers, without using a calculator."
    sumq += "$$" + term1 + ",\\ " + term2 + ",\\ " + term3 + "$$";
    
    suma += "<br>".repeat(12);
    suma += "$$\\begin{aligned}HCF&=" + Hcf + "\\\\[5pt]";
    suma += "LCM&=" + Lcm + "\\end{aligned}$$";

  var notesLink = "images/20240924-TG5MathsBook2-AlgebraV1_0-APO.pdf#page=9"
  var sumArray = [sumq, suma, notesLink];
  return sumArray;
}