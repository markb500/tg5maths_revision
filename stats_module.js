var sumarrstats = [], sumq, suma;
function stats(ctx) {
    //Produces randomly selected problems in statistics & probability.
    var sum, a, b, c, d, e;
    sumq = "";
    suma = "";
    sumarrstats = QLimitRepeats(sumarrstats, 4);   //Ensures no repeat question until at least 50% of questions shown
    sum = sumarrstats[sumarrstats.length - 1];
    // sum = 2;
    switch(sum) {
        case 1:
            sumq += "A die, numbered 1 to 6, is thrown. What is the probability of getting<br>";
            sumq += "a. an even number.<br>";
            sumq += "b. a 6.";
            suma += "$$\\text{a. Probability of getting an even number = }\\frac{3}{6}=\\frac{1}{2}$$";
            suma += "$$\\text{b. Probability of getting a 6 = }\\frac{1}{6}$$";
            break;
        case 2:
            sumq += "1 card is drawn from a pack of 52 standard playing cards. What is the probability that it is<br>";
            sumq += "a. Red<br>";
            sumq += "b. A picture card.<br>";
            sumq += "c. The Queen of Spades.";
            suma += "$$\\text{a. The probability of it being red = }\\frac{26}{52}=\\frac{1}{2}$$";
            suma += "$$\\text{b. The probability of it being a picture card = }\\frac{12}{52}=\\frac{3}{13}$$";
            suma += "$$\\text{c. The probability of it being the Queen of Spades = }\\frac{1}{52}$$";
            break;
        case 3:
            sumq += "A snooker table has 15 red balls and 1 each of yellow, brown, green, blue, pink and black balls. If the balls are placed in ";
            sumq += "a bag and 1 ball is selected at random, calculate the probability of selecting:<br>a. a blue ball.<br>b. a red ball<br>c. a non-red ball.";
            suma += "$$Total\\ number\\ of\\ balls = 21$$";
            suma += "$$\\begin{aligned}a&.\\ Probability\\ of\\ selecting\\ blue=\\frac{1}{21}\\\\[5pt]";
            suma += "b&.\\ Probability\\ of\\ selecting\\ red=\\frac{15}{21}=\\frac{5}{7}\\\\[5pt]";
            suma += "c&.\\ Probability\\ of\\ selecting\\ a\\ ball\\ that\\ isn't\\ red=\\frac{21-15}{21}=\\frac{6}{21}=\\frac{2}{7}";
            suma += "\\end{aligned}$$";
            break;
        case 4:
            sumq += "A piece of fruit is selected at random from a bag containing 7 oranges and 3 apples. What is the probability that it is an apple?"
            suma += "$$\\text{Probability of selecting an apple = }\\frac{3}{10}$$";
            break;
    }
    var notesLink = "images/20230706-MathsBook08Proportionv1_6-APO.pdf#page=4";
    var sumArray = [sumq, suma, notesLink];
    return sumArray;
}