// js/generators/simultaneous.js
// Converted from TG5 Maths pt II simultaneous_module.js — behaviour preserved
import { cfchk, dp, gcd2, images, rndgen } from '../utils.js';

function scaleDraw(ctx2, xpositive, ypositive, xscale, yscale) {
  //Use in Simultaneous Module to draw the graph axis
    var xfigs, yfigs, xposn, yposn, xoffset, yoffset, xtxtalign, ytxtalign, xscaleposn, yscaleposn;

    ctx2.font = "15px Comic Sans MS";
    ctx2.lineWidth = 3;
    ctx2.beginPath();
    if (xpositive && ypositive) {
        xposn = 350;
        yposn = 50;
        xoffset = 10;
        yoffset = -10;
        xtxtalign = 'top';
        ytxtalign = 'right';
        xscaleposn = [100, 150, 200, 250, 300, 350];
        yscaleposn = [300, 250, 200, 150, 100, 50];
        xfigs = [1 * xscale, 2 * xscale, 3 * xscale, 4 * xscale, 5 * xscale];
        yfigs = [1 * yscale, 2 * yscale, 3 * yscale, 4 * yscale, 5 * yscale];
        ctx2.moveTo(40, xposn);
        ctx2.lineTo(350, xposn);    //x axis
        ctx2.moveTo(yposn, 360);
        ctx2.lineTo(yposn, 50);     //y axis
    } else if (!xpositive && ypositive) {
        xposn = 350;
        yposn = 350;
        xoffset = 10;
        yoffset = 10;
        xtxtalign = 'top';
        ytxtalign = 'left';
        xscaleposn = [300, 250, 200, 150, 100, 50];
        yscaleposn = [300, 250, 200, 150, 100, 50];
        xfigs = [1 * -xscale, 2 * -xscale, 3 * -xscale, 4 * -xscale, 5 * -xscale];
        yfigs = [1 * yscale, 2 * yscale, 3 * yscale, 4 * yscale, 5 * yscale];
        ctx2.moveTo(50, xposn);
        ctx2.lineTo(360, xposn);    //x axis
        ctx2.moveTo(yposn, 360);
        ctx2.lineTo(yposn, 50);     //y axis
    } else if (xpositive && !ypositive) {
        xposn = 50;
        yposn = 50;
        xoffset = -10;
        yoffset = -10;
        xtxtalign = 'bottom';
        ytxtalign = 'right';
        xscaleposn = [100, 150, 200, 250, 300, 350];
        yscaleposn = [100, 150, 200, 250, 300, 350];
        xfigs = [1 * xscale, 2 * xscale, 3 * xscale, 4 * xscale, 5 * xscale];
        yfigs = [1 * -yscale, 2 * -yscale, 3 * -yscale, 4 * -yscale, 5 * -yscale];
        ctx2.moveTo(40, xposn);
        ctx2.lineTo(350, xposn);    //x axis
        ctx2.moveTo(yposn, 350);
        ctx2.lineTo(yposn, 40);     //y axis
    } else {
        xposn = 50;
        yposn = 350;
        xoffset = -10;
        yoffset = 10;
        xtxtalign = 'bottom';
        ytxtalign = 'left';
        xscaleposn = [300, 250, 200, 150, 100, 50];
        yscaleposn = [100, 150, 200, 250, 300, 350];
        xfigs = [1 * -xscale, 2 * -xscale, 3 * -xscale, 4 * -xscale, 5 * -xscale];
        yfigs = [1 * -yscale, 2 * -yscale, 3 * -yscale, 4 * -yscale, 5 * -yscale];
        ctx2.moveTo(50, xposn);
        ctx2.lineTo(360, xposn);    //x axis
        ctx2.moveTo(yposn, 350);
        ctx2.lineTo(yposn, 40);     //y axis
    }

    for (let i = 0; i < 5; i++) {
        ctx2.moveTo(xscaleposn[i], xposn);
        ctx2.lineTo(xscaleposn[i], xposn + xoffset);   //x scale marks
        ctx2.textAlign = "center";
        // xtxtalign was 'top'/'bottom' in the original (meant as baseline, not textAlign)
        ctx2.textBaseline = (xtxtalign === 'top' || xtxtalign === 'bottom') ? xtxtalign : 'alphabetic';
        ctx2.fillText(xfigs[i], xscaleposn[i], xposn + 3 * xoffset);   //x scale digits
        ctx2.moveTo(yposn, yscaleposn[i]);
        ctx2.lineTo(yposn + yoffset, yscaleposn[i]);   //y scale marks
        ctx2.textAlign = (ytxtalign === 'left' || ytxtalign === 'right' || ytxtalign === 'center') ? ytxtalign : 'left';
        ctx2.textBaseline = 'middle';
        ctx2.fillText(yfigs[i], yposn + 1.5 * yoffset, yscaleposn[i] + 5);     //y scale digits
    }
    ctx2.textAlign = "center";
    ctx2.textBaseline = (xtxtalign === 'top' || xtxtalign === 'bottom') ? xtxtalign : 'alphabetic';
    ctx2.fillText('0', yposn + 1.5 * yoffset, xposn + 3 * xoffset);     //origin digit
    ctx2.font = "30px Comic Sans MS";
    ctx2.fillText(ltr1txt, xscaleposn[5], xposn + 3 * xoffset);    //x scale label
    ctx2.textAlign = (ytxtalign === 'left' || ytxtalign === 'right' || ytxtalign === 'center') ? ytxtalign : 'left';
    ctx2.textBaseline = 'middle';
    ctx2.fillText(ltr2txt, yposn + 1.5 * yoffset, yscaleposn[5]);  //y scale label
    ctx2.stroke();
    for (let i = 0; i < 5; i++) {
        ctx2.lineWidth = 0.4;
        ctx2.moveTo(xscaleposn[i], xposn);
        ctx2.lineTo(xscaleposn[i], yscaleposn[5]);
        ctx2.moveTo(yposn, yscaleposn[i]);
        ctx2.lineTo(xscaleposn[5], yscaleposn[i]);
    }
    ctx2.stroke();
    for (let i = 0; i < 5; i++) {
        ctx2.lineWidth = 0.1;
        if (xpositive) {
            ctx2.moveTo(xscaleposn[i] - 40, xposn);
            ctx2.lineTo(xscaleposn[i] - 40, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 30, xposn);
            ctx2.lineTo(xscaleposn[i] - 30, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 20, xposn);
            ctx2.lineTo(xscaleposn[i] - 20, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 10, xposn);
            ctx2.lineTo(xscaleposn[i] - 10, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 10, xposn);
            ctx2.lineTo(xscaleposn[i] + 10, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 20, xposn);
            ctx2.lineTo(xscaleposn[i] + 20, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 30, xposn);
            ctx2.lineTo(xscaleposn[i] + 30, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 40, xposn);
            ctx2.lineTo(xscaleposn[i] + 40, yscaleposn[5]);
        } else {
            ctx2.moveTo(xscaleposn[i] + 40, xposn);
            ctx2.lineTo(xscaleposn[i] + 40, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 30, xposn);
            ctx2.lineTo(xscaleposn[i] + 30, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 20, xposn);
            ctx2.lineTo(xscaleposn[i] + 20, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] + 10, xposn);
            ctx2.lineTo(xscaleposn[i] + 10, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 10, xposn);
            ctx2.lineTo(xscaleposn[i] - 10, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 20, xposn);
            ctx2.lineTo(xscaleposn[i] - 20, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 30, xposn);
            ctx2.lineTo(xscaleposn[i] - 30, yscaleposn[5]);
            ctx2.moveTo(xscaleposn[i] - 40, xposn);
            ctx2.lineTo(xscaleposn[i] - 40, yscaleposn[5]);
        }
        if (ypositive) {
            ctx2.moveTo(yposn, yscaleposn[i] - 10);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 10);
            ctx2.moveTo(yposn, yscaleposn[i] - 20);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 20);
            ctx2.moveTo(yposn, yscaleposn[i] - 30);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 30);
            ctx2.moveTo(yposn, yscaleposn[i] - 40);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 40);
            ctx2.moveTo(yposn, yscaleposn[i] + 10);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 10);
            ctx2.moveTo(yposn, yscaleposn[i] + 20);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 20);
            ctx2.moveTo(yposn, yscaleposn[i] + 30);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 30);
            ctx2.moveTo(yposn, yscaleposn[i] + 40);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 40);
        } else {
            ctx2.moveTo(yposn, yscaleposn[i] + 10);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 10);
            ctx2.moveTo(yposn, yscaleposn[i] + 20);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 20);
            ctx2.moveTo(yposn, yscaleposn[i] + 30);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 30);
            ctx2.moveTo(yposn, yscaleposn[i] + 40);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] + 40);
            ctx2.moveTo(yposn, yscaleposn[i] - 10);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 10);
            ctx2.moveTo(yposn, yscaleposn[i] - 20);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 20);
            ctx2.moveTo(yposn, yscaleposn[i] - 30);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 30);
            ctx2.moveTo(yposn, yscaleposn[i] - 40);
            ctx2.lineTo(xscaleposn[5], yscaleposn[i] - 40);
        }
    }
    ctx2.stroke();
}

function coordCalc(x, y, xscale, yscale, xpositive, ypositive) {
  //Used in Simultaneous Module to calc coords for graphical solution
    var xcoord, ycoord;
    if (xpositive && ypositive) {           //x +ve y +ve
        xcoord = 50 * ((x / xscale) + 1);
        ycoord = 400 - 50 * ((y / yscale) + 1);
    } else if (xpositive && !ypositive) {    //x +ve y -ve
        xcoord = 50 * ((x / xscale) + 1);
        ycoord = 50 * ((y / -yscale) + 1);
    } else if (!xpositive && ypositive) {    //x -ve y +ve
        xcoord = 400 - 50 * ((x / -xscale) + 1);
        ycoord = 400 - 50 * ((y / yscale) + 1);
    } else {                        //x -ve y -ve
        xcoord = 400 - 50 * ((x / -xscale) + 1);
        ycoord = 50 * ((y / -yscale) + 1);
    }
    return {x: xcoord, y: ycoord};
}

function scaleSet(x, y) {
  var xpositive, ypositive, xscale, yscale;
  if (x > 0) {
      xpositive = true;
  } else {
      xpositive = false;
  }
  if (y > 0) {
      ypositive = true;
  } else {
      ypositive = false;
  }
  if (Math.abs(x) < 4) {
      xscale = 1;
  } else if (Math.abs(x) < 9) {
      xscale = 2;
  } else if (Math.abs(x) < 21) {
      xscale = 5;
  } else if (Math.abs(x) < 41) {
      xscale = 10;
  } else {
      xscale = 20;
  }
  if (Math.abs(y) < 6) {
      yscale = 1;
  } else if (Math.abs(y) < 13) {
      yscale = 2;
  } else if (Math.abs(y) < 30) {
      yscale = 5;
  } else if (Math.abs(y) < 60) {
      yscale = 10;
  } else {
      yscale = 20;
  }
  return {xptve: xpositive, yptve: ypositive, x: xscale, y: yscale};
}

/** True if any of the three table points on either line falls outside the 6×scale graph area or wrong quadrant. */
function tablePointsOutside(tab, scale) {
  const limitX = 6 * scale.x;
  const limitY = 6 * scale.y;
  const pts = [
    [tab.x11, tab.y11], [tab.x12, tab.y12], [tab.x13, tab.y13],
    [tab.x21, tab.y21], [tab.x22, tab.y22], [tab.x23, tab.y23]
  ];
  for (let i = 0; i < pts.length; i++) {
    const xx = pts[i][0];
    const yy = pts[i][1];
    if (Math.abs(xx) > limitX + 0.001 || Math.abs(yy) > limitY + 0.001) return true;
    if (scale.xptve && xx < -0.001) return true;
    if (!scale.xptve && xx > 0.001) return true;
    if (scale.yptve && yy < -0.001) return true;
    if (!scale.yptve && yy > 0.001) return true;
  }
  return false;
}

function coordTabSimEqn(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, xscale, xpositive, sum) {
  //Used in Simultaneous Module. Creates the coordinates for the coord tables
  let xtab11, xtab12, xtab13, xtab21, xtab22, xtab23;
  let ytab11, ytab12, ytab13, ytab21, ytab22, ytab23;
  if (xpositive) {
    xtab11 = x - xscale;
    xtab21 = x - xscale;
    if (sum === 1) {
      ytab11 = dp((c1 - xcf1 * xtab11) / ycf1, 1, -1);
      ytab21 = dp((c2 - xcf2 * xtab21) / ycf2, 1, -1);
    } else {
      ytab11 = dp(xcf1 * xtab11 + c1, 1, -1);
      ytab21 = dp(xcf2 * xtab21 + c2, 1, -1);
    }
    xtab12 = x;
    xtab22 = x;
    ytab12 = y;
    ytab22 = y;
    xtab13 = x + xscale;
    xtab23 = x + xscale;
    if (sum === 1) {
      ytab13 = dp((c1 - xcf1 * xtab13) / ycf1, 1, -1);
      ytab23 = dp((c2 - xcf2 * xtab23) / ycf2, 1, -1);
    } else {
      ytab13 = dp(xcf1 * xtab13 + c1, 1, -1);
      ytab23 = dp(xcf2 * xtab23 + c2, 1, -1);
    }
  } else {
    xtab11 = x + xscale;
    xtab21 = x + xscale;
    if (sum === 1) {
      ytab11 = dp((c1 - xcf1 * xtab11) / ycf1, 1, -1);
      ytab21 = dp((c2 - xcf2 * xtab21) / ycf2, 1, -1);
    } else {
      ytab11 = dp(xcf1 * xtab11 + c1, 1, -1);
      ytab21 = dp(xcf2 * xtab21 + c2, 1, -1);
    }
    xtab12 = x;
    xtab22 = x;
    ytab12 = y;
    ytab22 = y;
    xtab13 = x - xscale;
    xtab23 = x - xscale;
    if (sum === 1) {
      ytab13 = dp((c1 - xcf1 * xtab13) / ycf1, 1, -1);
      ytab23 = dp((c2 - xcf2 * xtab23) / ycf2, 1, -1);
    } else {
      ytab13 = dp(xcf1 * xtab13 + c1, 1, -1);
      ytab23 = dp(xcf2 * xtab23 + c2, 1, -1);
    }
  }
  return {x11: xtab11, x12: xtab12, x13: xtab13, y11: ytab11, y12: ytab12, y13: ytab13, 
          x21: xtab21, x22: xtab22, x23: xtab23, y21: ytab21, y22: ytab22, y23: ytab23};
}

var x, y, xcf1, xcf2, ycf1, ycf2, c1, c2, ltr1, ltr2, xcross1, xcross2, ycross1, ycross2, xouter1, xouter2, youter1, youter2, ltr1txt, ltr2txt, x11coord, y11coord, x12coord, y12coord, x21coord, y21coord, x22coord, y22coord;
var xcross1status, xcross2status, ycross1status, ycross2status, xouter1status, xouter2status, youter1status, youter2status;
export function generate() {
  let sum, ltr1, ltr2;
  let notesLink = 'images/';
  let sumq = '';
  let suma = '';
const off = document.createElement('canvas');
  off.width = 400;
  off.height = 400;
  const ctx = off.getContext('2d');
  const ctx2 = ctx;

    var scale, tab;
    sumq = "";
    suma = "";  // canvas provides spacing
    switch(rndgen(1, 4, 0, 1, -1)) {
        case 1:
            ltr1 = ltr1txt = "x";
            ltr2 = ltr2txt = "y";
            break;
        case 2:
            ltr1 = ltr1txt = "s";
            ltr2 = ltr2txt = "t";
            break;
        case 3:
            ltr1 = ltr1txt = "a";
            ltr2 = ltr2txt = "b";
            break;
        case 4:
            ltr1 = "&#969"; //omega
            ltr1txt = '\u03c9';
            ltr2 = "&#0949"; //epsilon
            ltr2txt = '\u03b5';
            break;
    }
    switch (rndgen(1, 2, 0, 1, -1)) {
        case 1:
            //Creates 2 equations in the form ax + by = c to be solved by the elimination method
            var h;
            notesLink = "images/20200505-MathsBook10GraphsSimEquv1_5-APO.pdf#page=20";
            do {
                do {
                    do {
                        do {
                            y = rndgen(-6, 6, 0, 1, -1);   //-6 to 6 not 0, 1 or -1
                        } while(y === 0 || Math.abs(y) === 1)
                        do {
                            xcf1 = rndgen(-9, 9, 0, 1, -1);     //-9 to 9 not 0
                        } while(xcf1 === 0)
                        do {
                            ycf1 = rndgen(-9, 9, 0, 1, -1);    //-9 to 9 not 0
                        } while(ycf1 === 0)
                        do {
                            c1 = rndgen(-5, 25, 0, 1, -1);      //-5 to 25 not 0
                        } while(c1 === 0)
                        x = (c1 - (ycf1 * y)) / xcf1; 
                    } while(!Number.isInteger(x) || (x) === 0)     //Checks x is none 0 int
            
                    do {
                        xcf2 = rndgen(-9, 9, 0, 1, -1);    //-9 to 9 not 0
                    } while(xcf2 === 0)
                    do {
                        ycf2 = rndgen(-9, 9, 0, 1, -1);    //-9 to 9 not 0
                    } while(ycf2 === 0)
                } while(!Number.isInteger((xcf2 * x) + (ycf2 * y)) ||
                        (xcf2 * x) + (ycf2 * y) === 0 ||
                        (xcf2 * x) + (ycf2 * y) > 25 ||
                        (xcf2 * x) + (ycf2 * y) < -5 ||
                        Math.abs(xcf1) === Math.abs(xcf2) ||
                        Math.abs(ycf1) === Math.abs(ycf2) ||
                        (Math.abs(xcf1) === Math.abs(ycf1) && Math.abs(xcf2) === Math.abs(ycf2)) ||
                        (Math.abs(ycf1) * Math.abs(xcf2) === Math.abs(ycf2) * Math.abs(xcf1)) ||
                        Math.abs(x) === 1 || Math.abs((xcf1 / ycf1) - (xcf2 / ycf2)) < 3)
                c2 = (xcf2 * x) + (ycf2 * y);

                scale = scaleSet(x, y);  //Determines sign of x & y and sets scale multipliers
                tab = coordTabSimEqn(x, y, xcf1, ycf1, c1, xcf2, ycf2, c2, scale.x, scale.xptve, 1);
            } while (
                Math.abs((scale.x * (xcf1 / ycf1)) / scale.y) >= 2 ||
                Math.abs((scale.x * (xcf2 / ycf2)) / scale.y) >= 2 ||
                tablePointsOutside(tab, scale)
            )
                // Gradient allows 3 coords in same quadrant; table points must fit on the 6×scale grid

            //Used to get coords at either end of line for drawing graph
            xcross1 = c1 / xcf1;   //x when y = 0
            xcross2 = c2 / xcf2;
            ycross1 = c1 / ycf1;   //y when x = 0
            ycross2 = c2 / ycf2;
            if (scale.yptve) {
                xouter1 = (c1 - ycf1 * 6 * scale.y) / xcf1;   //x when y = 6
                xouter2 = (c2 - ycf2 * 6 * scale.y) / xcf2;
            } else {
                xouter1 = (c1 - ycf1 * -6 * scale.y) / xcf1;   //x when y = 6
                xouter2 = (c2 - ycf2 * -6 * scale.y) / xcf2;
            }
            if (scale.xptve) {
                youter1 = (c1 - xcf1 * 6 * scale.x) / ycf1;   //y when x = 6
                youter2 = (c2 - xcf2 * 6 * scale.x) / ycf2;
            } else {
                youter1 = (c1 - xcf1 * -6 * scale.x) / ycf1;   //y when x = 6
                youter2 = (c2 - xcf2 * -6 * scale.x) / ycf2;
            }
            
        
            sumq += "Solve the simultaneous equations, using graphical and algebraic methods.";
            sumq += "$$\\begin{alignat}{2}" + 
                        cfchk(xcf1, ltr1, 1, 1) + cfchk(ycf1, ltr2, 1, 0) + "&=" + c1 + "\\qquad\\qquad &&eqn 1\\\\[5pt]" + 
                        cfchk(xcf2, ltr1, 1, 1) + cfchk(ycf2, ltr2, 1, 0) + "&=" + c2 + "&&eqn 2" + 
                        "\\end{alignat}$$";
            
            if((Math.abs(xcf1) * Math.abs(xcf2)) < (Math.abs(ycf1) * Math.abs(ycf2))) {     //x's easiest to eliminate
                h = gcd2(Math.abs(xcf1), Math.abs(xcf2));       //Used to create lowest multipliers for equations
                suma += "<div class='row'><table><tr><td colspan='4'>" + cfchk(xcf1, ltr1, 1, 1) + cfchk(ycf1, ltr2, 1, 0) + "=" + c1 + "</td></tr>";
                suma += "<tr><td>" + ltr1 + "</td><td>" + tab.x11 + "</td><td>" + tab.x12 + "</td><td>" + tab.x13 + "</td></tr>";
                suma += "<tr><th>" + ltr2 + "</th><td>" + tab.y11 + "</td><td>" + tab.y12 + "</td><td>" + tab.y13 + "</td></tr></table>";
                suma += "<table><tr><td colspan='4'>" + cfchk(xcf2, ltr1, 1, 1) + cfchk(ycf2, ltr2, 1, 0) + "=" + c2 + "</td></tr>";
                suma += "<tr><td>" + ltr1 + "</td><td>" + tab.x21 + "</td><td>" + tab.x22 + "</td><td>" + tab.x23 + "</td></tr>";
                suma += "<tr><th>" + ltr2 + "</th><td>" + tab.y21 + "</td><td>" + tab.y22 + "</td><td>" + tab.y23 + "</td></tr></table></div>";
                suma += "$$\\begin{alignat}{2}\\qquad\\qquad\\qquad\\qquad" + cfchk(xcf1 * Math.abs(xcf2) / h, ltr1, 1, 1) + 
                                cfchk(ycf1 * Math.abs(xcf2) / h, ltr2, 1, 0) + "&=" + c1 * Math.abs(xcf2) / h + 
                                "\\qquad\\qquad\\qquad &&eqn 1 \\times" + Math.abs(xcf2) / h + "\\\\[5pt]";
                suma += cfchk(xcf2 * Math.abs(xcf1) / h, ltr1, 1, 1) + cfchk(ycf2 * Math.abs(xcf1) / h, ltr2, 1, 0) + "&=" + 
                            c2 * Math.abs(xcf1) / h + "&&eqn 2 \\times" + Math.abs(xcf1) / h + "\\\\[5pt]";
                if((xcf1 > 0 && xcf2 > 0) || (xcf1 < 0 && xcf2 < 0)) {      //Signs same so subtract to eliminate x's
                    if((ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h) > 0) {       //eqn1 - eqn2
                        if((ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h) === 1) {
                            suma += cfchk((ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h), ltr2, 1, 1) + "&=" + 
                                    (c1 * Math.abs(xcf2) / h - c2 * Math.abs(xcf1) / h) + "&&eqn 1 - eqn 2\\\\[20pt]";
                        } else {
                            suma += cfchk((ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h), ltr2, 1, 1) + "&=" + 
                                            (c1 * Math.abs(xcf2) / h - c2 * Math.abs(xcf1) / h) + "&&eqn 1 - eqn 2\\\\[5pt]";
                            suma += ltr2 + "&=\\frac{" + (c1 * Math.abs(xcf2) / h - c2 * Math.abs(xcf1) / h) + "}{" + 
                                            (ycf1 * Math.abs(xcf2) / h - ycf2 * Math.abs(xcf1) / h) + "}\\\\[5pt]";
                            suma += ltr2 + "&=" + y + "\\\\[20pt]";
                        }
                    } else {                                    //eqn2 - eqn1
                        if((ycf2 * Math.abs(xcf1) / h - ycf1 * Math.abs(xcf2) / h) === 1) {
                            suma += cfchk((ycf2 * Math.abs(xcf1) / h - ycf1 * Math.abs(xcf2) / h), ltr2, 1, 1) + "&=" + 
                                    (c2 * Math.abs(xcf1) / h - c1 * Math.abs(xcf2) / h) + "&&eqn 2 - eqn 1\\\\[20pt]";
                        } else {
                            suma += cfchk((ycf2 * Math.abs(xcf1) / h - ycf1 * Math.abs(xcf2) / h), ltr2, 1, 1) + "&=" + 
                                            (c2 * Math.abs(xcf1) / h - c1 * Math.abs(xcf2) / h) + "&&eqn 2 - eqn 1\\\\[5pt]";
                            suma += ltr2 + "&=\\frac{" + (c2 * Math.abs(xcf1) / h - c1 * Math.abs(xcf2) / h) + "}{" + 
                                            (ycf2 * Math.abs(xcf1) / h - ycf1 * Math.abs(xcf2) / h) + "}\\\\[5pt]";
                            suma += ltr2 + "&=" + y + "\\\\[20pt]";
                        }
                    }
                } else {
                    if((ycf1 * Math.abs(xcf2) / h + ycf2 * Math.abs(xcf1) / h) === 1) {
                        suma += cfchk((ycf1 * Math.abs(xcf2) / h + ycf2 * Math.abs(xcf1) / h), ltr2, 1, 1) + "&=" + 
                                    (c1 * Math.abs(xcf2) / h + c2 * Math.abs(xcf1) / h) + "&&eqn 1 + eqn 2\\\\[20pt]";
                    } else {
                        suma += cfchk((ycf1 * Math.abs(xcf2) / h + ycf2 * Math.abs(xcf1) / h), ltr2, 1, 1) + "&=" + 
                                        (c1 * Math.abs(xcf2) / h + c2 * Math.abs(xcf1) / h) + "&&eqn 1 + eqn 2\\\\[5pt]";
                        suma += ltr2 + "&=\\frac{" + (c1 * Math.abs(xcf2) / h + c2 * Math.abs(xcf1) / h) + "}{" + 
                                        (ycf1 * Math.abs(xcf2) / h + ycf2 * Math.abs(xcf1) / h) + "}\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\\\[20pt]";
                    }
                }
                if(Math.abs(ycf1) < Math.abs(ycf2)) {   //Sub y in eqn1
                    suma += cfchk(xcf1, ltr1, 1, 1) + cfchk(ycf1, "", 0, 0) + "\\times" + y + "&=" + 
                                c1 + "&&Substitute\\ " + ltr2 + "\\ in\\ eqn 1\\\\[5pt]";
                    suma += cfchk(xcf1, ltr1, 1, 1) + cfchk(ycf1 * y, "", 0, 0) + "&=" + c1 + "\\\\[5pt]";
                    if(xcf1 === 1) {
                        suma += ltr1 + "&=" + c1 + cfchk(-1 * ycf1 * y, "", 0, 0) + "\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\end{alignat}$$";
                    } else {
                        suma += ltr1 + "&=\\frac{" + c1 + cfchk(-1 * ycf1 * y, "", 0, 0) + "}{" + xcf1 + "}\\\\[5pt]";
                        suma += ltr1 + "&=\\frac{" + (c1 + -1 * ycf1 * y) + "}{" + xcf1 + "}\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\end{alignat}$$";
                    }
                } else {        //Sub y in eqn2
                    suma += cfchk(xcf2, ltr1, 1, 1) + cfchk(ycf2, "", 0, 0) + "\\times" + y + "&=" + 
                                c2 + "&&Substitute\\ " + ltr2 + "\\ in\\ eqn 2\\\\[5pt]";
                    suma += cfchk(xcf2, ltr1, 1, 1) + cfchk(ycf2 * y, "", 0, 0) + "&=" + c2 + "\\\\[5pt]";
                    if(xcf2 === 1) {
                        suma += ltr1 + "&=" + c2 + cfchk(-1 * ycf2 * y, "", 0, 0) + "\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\end{alignat}$$";
                    } else {
                        suma += ltr1 + "&=\\frac{" + c2 + cfchk(-1 * ycf2 * y, "", 0, 0) + "}{" + xcf2 + "}\\\\[5pt]";
                        suma += ltr1 + "&=\\frac{" + (c2 + -1 * ycf2 * y) + "}{" + xcf2 + "}\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\end{alignat}$$";
                    }
                }
            } else {        //y's easiest to eliminate
                h = gcd2(Math.abs(ycf1), Math.abs(ycf2));       //Used to create lowest multipliers for equations
                suma += "<div class='row'><table><tr><td colspan='4' style='color:#0000ff'>" + cfchk(xcf1, ltr1, 1, 1) + cfchk(ycf1, ltr2, 1, 0) + "=" + c1 + "</td></tr>";
                suma += "<tr><th>" + ltr1 + "</th><td>" + tab.x11 + "</td><td>" + tab.x12 + "</td><td>" + tab.x13 + "</td></tr>";
                suma += "<tr><th>" + ltr2 + "</th><td>" + tab.y11 + "</td><td>" + tab.y12 + "</td><td>" + tab.y13 + "</td></tr></table>";
                suma += "<table><tr><td colspan='4' style='color:#00ff00'>" + cfchk(xcf2, ltr1, 1, 1) + cfchk(ycf2, ltr2, 1, 0) + "=" + c2 + "</td></tr>";
                suma += "<tr><th>" + ltr1 + "</th><td>" + tab.x21 + "</td><td>" + tab.x22 + "</td><td>" + tab.x23 + "</td></tr>";
                suma += "<tr><th>" + ltr2 + "</th><td>" + tab.y21 + "</td><td>" + tab.y22 + "</td><td>" + tab.y23 + "</td></tr></table></div>";
                suma += "$$\\begin{alignat}{2}\\qquad\\qquad\\qquad\\qquad" + 
                        cfchk(xcf1 * Math.abs(ycf2) / h, ltr1, 1, 1) + cfchk(ycf1 * Math.abs(ycf2) / h, ltr2, 1, 0) + "&=" + 
                        c1 * Math.abs(ycf2) / h + "\\qquad\\qquad\\qquad &&eqn 1 \\times" + Math.abs(ycf2) / h + "\\\\[5pt]";
                suma += cfchk(xcf2 * Math.abs(ycf1) / h, ltr1, 1, 1) + cfchk(ycf2 * Math.abs(ycf1) / h, ltr2, 1, 0) + "&=" + 
                                c2 * Math.abs(ycf1) / h + "&&eqn 2 \\times" + Math.abs(ycf1) / h + "\\\\[5pt]";
                if((ycf1 > 0 && ycf2 > 0) || (ycf1 < 0 && ycf2 < 0)) {      //Signs same so subtract to eliminate y's
                    if((xcf1 * Math.abs(ycf2) / h) - (xcf2 * Math.abs(ycf1) / h) > 0) {     //eqn1 - eqn2
                        if((xcf1 * Math.abs(ycf2) / h - xcf2 * Math.abs(ycf1) / h) === 1) {
                            suma += cfchk((xcf1 * Math.abs(ycf2) / h - xcf2 * Math.abs(ycf1) / h), ltr1, 1, 1) + "&=" + 
                                        (c1 * Math.abs(ycf2) / h - c2 * Math.abs(ycf1) / h) + "&&eqn 1 - eqn 2\\\\[20pt]";
                        } else {
                            suma += cfchk((xcf1 * Math.abs(ycf2) / h - xcf2 * Math.abs(ycf1) / h), ltr1, 1, 1) + "&=" + 
                                            (c1 * Math.abs(ycf2) / h - c2 * Math.abs(ycf1) / h) + "&&eqn 1 - eqn 2\\\\[5pt]";
                            suma += ltr1 + "&=\\frac{" + (c1 * Math.abs(ycf2) / h - c2 * Math.abs(ycf1) / h) + "}{" + 
                                            (xcf1 * Math.abs(ycf2) / h - xcf2 * Math.abs(ycf1) / h) + "}\\\\[5pt]";
                            suma += ltr1 + "&=" + x + "\\\\[20pt]";
                        }
                    } else {        //eqn2 - eqn1
                        if((xcf2 * Math.abs(ycf1) / h - xcf1 * Math.abs(ycf2) / h) === 1) {
                            suma += cfchk((xcf2 * Math.abs(ycf1) / h - xcf1 * Math.abs(ycf2) / h), ltr1, 1, 1) + "&=" + 
                                            (c2 * Math.abs(ycf1) / h - c1 * Math.abs(ycf2) / h) + "&&eqn 2 - eqn 1\\\\[20pt]";
                        } else {
                            suma += cfchk((xcf2 * Math.abs(ycf1) / h - xcf1 * Math.abs(ycf2) / h), ltr1, 1, 1) + "&=" + 
                                            (c2 * Math.abs(ycf1) / h - c1 * Math.abs(ycf2) / h) + "&&eqn 2 - eqn 1\\\\[5pt]";
                            suma += ltr1 + "&=\\frac{" + (c2 * Math.abs(ycf1) / h - c1 * Math.abs(ycf2) / h) + "}{" + 
                                            (xcf2 * Math.abs(ycf1) / h - xcf1 * Math.abs(ycf2) / h) + "}\\\\[5pt]";
                            suma += ltr1 + "&=" + x + "\\\\[20pt]";
                        }
                    }
                } else {        //Signs different so add equations to eliminate x's
                    if((xcf1 * Math.abs(ycf2) / h + xcf2 * Math.abs(ycf1) / h) === 1) {
                        suma += cfchk((xcf1 * Math.abs(ycf2) / h + xcf2 * Math.abs(ycf1) / h), ltr1, 1, 1) + "&=" + 
                                (c1 * Math.abs(ycf2) / h + c2 * Math.abs(ycf1) / h) + "&&eqn 1 + eqn 2\\\\[20pt]";
                    } else {
                        suma += cfchk((xcf1 * Math.abs(ycf2) / h + xcf2 * Math.abs(ycf1) / h), ltr1, 1, 1) + "&=" + 
                                    (c1 * Math.abs(ycf2) / h + c2 * Math.abs(ycf1) / h) + "&&eqn 1 + eqn 2\\\\[5pt]";
                        suma += ltr1 + "&=\\frac{" + (c1 * Math.abs(ycf2) / h + c2 * Math.abs(ycf1) / h) + "}{" + 
                                    (xcf1 * Math.abs(ycf2) / h + xcf2 * Math.abs(ycf1) / h) + "}\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\\\[20pt]";
                    }
                }
                if(Math.abs(xcf1) < Math.abs(xcf2)) {       //Sub x in eqn 1
                    suma += xcf1 + "\\times" + x + cfchk(ycf1, ltr2, 1, 0) + "&=" + 
                                c1 + "&&Substitute\\ " + ltr1 + "\\ in\\ eqn 1\\\\[5pt]";
                    suma += (xcf1 * x) + cfchk(ycf1, ltr2, 1, 0) + "&=" + c1 + "\\\\[5pt]";
                    if(ycf1 === 1) {
                        suma += ltr2 + "&=" + c1 + cfchk(-1 * xcf1 * x, "", 0, 0) + "\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\end{alignat}$$";
                    } else {
                        suma += ltr2 + "&=\\frac{" + c1 + cfchk(-1 * xcf1 * x, "", 0, 0) + "}{" + ycf1 + "}\\\\[5pt]";
                        suma += ltr2 + "&=\\frac{" + (c1 + -1 * xcf1 * x) + "}{" + ycf1 + "}\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\end{alignat}$$";
                    }
                } else {        //Sub x in eqn2
                    suma += xcf2 + "\\times" + x + cfchk(ycf2, "y", 1, 0) + "&=" + 
                                c2 + "&&Substitute\\ " + ltr1 + "\\ in\\ eqn 2\\\\[5pt]";
                    suma += (xcf2 * x) + cfchk(ycf2, "y", 1, 0) + "&=" + c2 + "\\\\[5pt]";
                    if(ycf2 === 1) {
                        suma += ltr2 + "&=" + c2 + cfchk(-1 * xcf2 * x, "", 0, 0) + "\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\end{alignat}$$";
                    } else {
                        suma += ltr2 + "&=\\frac{" + c2 + cfchk(-1 * xcf2 * x, "", 0, 0) + "}{" + ycf2 + "}\\\\[5pt]";
                        suma += ltr2 + "&=\\frac{" + (c2 + -1 * xcf2 * x) + "}{" + ycf2 + "}\\\\[5pt]";
                        suma += ltr2 + "&=" + y + "\\end{alignat}$$";
                    }
                }
            } 
            break;
        case 2:
            //Creates 2 equations in form y = ax + b to be solved by substitution
            notesLink = "images/20200505-MathsBook10GraphsSimEquv1_5-APO.pdf#page=18";
            do {
                do {
                    do {
                    xcf1 = rndgen(-9, 9, 0, 1, -1); //-9 to 9 not 0
                    } while(xcf1 === 0)
                    do {
                        x = rndgen(-9, 9, 0, 1, -1); //-9 to 9 not 0 or 1
                    } while(x === 0 || Math.abs(x) ===1)
                    do {
                        c1 = rndgen(-5, 25, 0, 1, -1); //-5 to 25 not 0
                    } while(c1 === 0)
                    y = xcf1 * x + c1;
                    do {
                        xcf2 = rndgen(-9, 9, 0, 1, -1); //-9 to 9 not 0
                    } while(xcf2 === 0 || xcf2 === xcf1)
                    c2 = y - xcf2 * x;
                } while(c2 !== Math.round(c2) || c2 < -5 || c2 > 25 || c2 === 0 || y < -50 || y > 50 || y === 0 || Math.abs(y) === 1 || Math.abs(xcf1 - xcf2 < 3))
                                                //Checks c2 is int, between -5 & 25 not 0, y between -50 & 50 (not 0 or 1) and graph lines gradient difference > 3

                scale = scaleSet(x, y);  //Determines sign of x & y and sets scale multipliers
                tab = coordTabSimEqn(x, y, xcf1, -1, c1, xcf2, -1, c2, scale.x, scale.xptve, 2);
            } while (
                Math.abs((scale.x * xcf1) / scale.y) >= 2 ||
                Math.abs((scale.x * xcf2) / scale.y) >= 2 ||
                tablePointsOutside(tab, scale)
            )
                // Gradient allows 3 coords in same quadrant; table points must fit on the 6×scale grid
            
            //Used to get coords at either end of line for drawing graph
            xcross1 = -c1 / xcf1;  //x when y = 0
            xcross2 = -c2 / xcf2;
            ycross1 = c1;    //y when x = 0
            ycross2 = c2;
            if (scale.yptve) {
                xouter1 = ((6 * scale.y) - c1) / xcf1;  //x when y = 6
                xouter2 = ((6 * scale.y) - c2) / xcf2;
            } else {
                xouter1 = ((-6 * scale.y) - c1) / xcf1;  //x when y = 6
                xouter2 = ((-6 * scale.y) - c2) / xcf2;
            }
            if (scale.xptve) {
                youter1 = xcf1 * 6 * scale.x + c1;    //y when x = 6
                youter2 = xcf2 * 6 * scale.x + c2;
            } else {
                youter1 = xcf1 * -6 * scale.x + c1;    //y when x = 6
                youter2 = xcf2 * -6 * scale.x + c2;
            }
            

            sumq += "Solve the simultaneous equations, using graphical and algebraic methods.";
            sumq += "$$\\begin{aligned}" + ltr2 + "&=" + cfchk(xcf1, ltr1, 1, 1) + cfchk(c1, "", 0, 0) + "\\\\" + 
                        ltr2 + "&=" + cfchk(xcf2, ltr1, 1, 1) + cfchk(c2, "", 0, 0) + "\\end{aligned}$$<br />";
            suma += "<div class='row'><table><tr><td colspan='4' style='color:#0000ff'>" + ltr2 + "=" + cfchk(xcf1, ltr1, 1, 1) + cfchk(c1, "", 0, 0) + "</td></tr>";
            suma += "<tr><td>" + ltr1 + "</td><td>" + tab.x11 + "</td><td>" + tab.x12 + "</td><td>" + tab.x13 + "</td></tr>";
            suma += "<tr><th>" + ltr2 + "</th><td>" + tab.y11 + "</td><td>" + tab.y12 + "</td><td>" + tab.y13 + "</td></tr></table>";
            suma += "<table><tr><td colspan='4' style='color:#00ff00'>" + ltr2 + "=" + cfchk(xcf2, ltr1, 1, 1) + cfchk(c2, "", 0, 0) + "</td></tr>";
            suma += "<tr><td>" + ltr1 + "</td><td>" + tab.x21 + "</td><td>" + tab.x22 + "</td><td>" + tab.x23 + "</td></tr>";
            suma += "<tr><th>" + ltr2 + "</th><td>" + tab.y21 + "</td><td>" + tab.y22 + "</td><td>" + tab.y23 + "</td></tr></table></div>";
            suma += "$$\\begin{aligned}" + cfchk(xcf1, ltr1, 1, 1) + cfchk(c1, "", 0, 0) + "&=" +
                        cfchk(xcf2, ltr1, 1, 1) + cfchk(c2, "", 0, 0) + "\\\\[5pt]";
                
            if((xcf1 + (-1 * xcf2)) > 0) {  //Gather x's on left
                if(xcf2 < 0) {   //So xcf2 +ve when moved left
                    suma += cfchk(xcf1, ltr1, 1, 1) + cfchk(-1 * xcf2, ltr1, 1, 0) + "&=" + 
                            c2 + cfchk(-1 * c1, "", 0, 0) + "\\\\[5pt]";
                    suma += cfchk(xcf1 + (-1 * xcf2), ltr1, 1, 1) + "&=" + (c2 + (-1 * c1)) + "\\\\[5pt]";
                    if(xcf1 + (-1 * xcf2) !== 1) {
                        suma += ltr1 + "&=\\frac{" + (c2 + (-1 * c1)) + "}{" + (xcf1 + (-1 * xcf2)) + "}\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\\\[5pt]";
                    }
                } else {    //So xcf2 -ve when moved left
                    suma += cfchk(xcf1, ltr1, 1, 1) + cfchk(-1 * xcf2, ltr1, 1, 0) + "&=" + 
                            c2 + cfchk(-1 * c1, "", 0, 0) + "\\\\[5pt]";
                    suma += cfchk(xcf1 + (-1 * xcf2), ltr1, 1, 1) + "&=" + (c2 + (-1 * c1)) + "\\\\[5pt]";
                    if(xcf1 + (-1 * xcf2) !== 1) {
                        suma += ltr1 + "&=\\frac{" + (c2 - c1) + "}{" + (xcf1 + (-1 * xcf2)) + "}\\\\[5pt]";
                        suma += ltr1 + "&=" + x + "\\\\[5pt]";
                    }
                }
            } else {    //Gather x's on right
                if(xcf1 < 0) {   //So xcf1 +ve when moved right
                    suma += c1 + cfchk(-1 * c2, "", 0, 0) + "&=" + 
                            cfchk(xcf2, ltr1, 1, 1) + "+" + cfchk(-1 * xcf1, ltr1, 1, 0) + "\\\\[5pt]";
                    suma += (c1 + (-1 * c2)) + "&=" + cfchk(xcf2 + (-1 * xcf1), ltr1, 1, 1) + "\\\\[5pt]";
                    if(xcf2 + (-1 * xcf1) !== 1) {
                        suma += "\\frac{" + (c1 - c2) + "}{" + (xcf2 + (-1 * xcf1)) + "}&=" + ltr1 + "\\\\[5pt]";
                        suma += x + "&=" + ltr1 + "\\\\[5pt]";
                    }
                } else {    //So xcf1 -ve when moved right
                    suma += c1 + cfchk(-1 * c2, "", 0, 0) + "&=" + 
                            cfchk(xcf2, ltr1, 1, 1) + cfchk(-1 * xcf1, ltr1, 1, 0) + "\\\\[5pt]";
                    suma += (c1 + (-1 * c2)) + "&=" + cfchk(xcf2 + (-1 * xcf1), ltr1, 1, 1) + "\\\\[5pt]";
                    if(xcf2 + (-1 * xcf1) !== 1) {
                        suma += "\\frac{" + (c1 - c2) + "}{" + (xcf2 + (-1 * xcf1)) + "}&=" + ltr1 + "\\\\[5pt]";
                        suma += x + "&=" + ltr1 + "\\\\[5pt]";
                    }
                }
            }
            suma += "\\\\";
            if(Math.abs(xcf1) < Math.abs(xcf2)) {   //Choose easiest route to calc y
                suma += ltr2 + "&=" + xcf1 + "\\times" + x + cfchk(c1, "", 0, 0) + "\\\\[5pt]";
            } else {
                suma += ltr2 + "&=" + xcf2 + "\\times" + x + cfchk(c2, "", 0, 0) + "\\\\[5pt]";
            }
            suma += ltr2 + "&=" + y + "\\end{aligned}$$";
            break;
    }
    scaleDraw(ctx2, scale.xptve, scale.yptve, scale.x, scale.y);

    xcross1status = xcross2status = ycross1status = ycross2status = false;
    xouter1status = xouter2status = youter1status = youter2status = false;

    if (((xcross1 >= 0 && scale.xptve) || (xcross1 <= 0 && !scale.xptve)) && Math.abs(xcross1) < (6 * scale.x)) {    //xcross within x axis
        xcross1status = true;
    }
    if (((xcross2 >= 0 && scale.xptve) || (xcross2 <= 0 && !scale.xptve)) && Math.abs(xcross2) < (6 * scale.x)) {
        xcross2status = true;
    }
    if (((ycross1 > 0 && scale.yptve) || (ycross1 < 0 && !scale.yptve)) && Math.abs(ycross1) < (6 * scale.y)) {    //ycross within x axis
        ycross1status = true;
    }
    if (((ycross2 > 0 && scale.yptve) || (ycross2 < 0 && !scale.yptve)) && Math.abs(ycross2) < (6 * scale.y)) {
        ycross2status = true;
    }
    if (((xouter1 >= 0 && scale.xptve) || (xouter1 <= 0 && !scale.xptve)) && Math.abs(xouter1) < (6 * scale.x)) {    //xouter within x axis
        xouter1status = true;
    }
    if (((xouter2 >= 0 && scale.xptve) || (xouter2 <= 0 && !scale.xptve)) && Math.abs(xouter2) < (6 * scale.x)) {
        xouter2status = true;
    }
    if (((youter1 > 0 && scale.yptve) || (youter1 < 0 && !scale.yptve)) && Math.abs(youter1) < (6 * scale.y)) {    //youter within x axis
        youter1status = true;
    }
    if (((youter2 > 0 && scale.yptve) || (youter2 < 0 && !scale.yptve)) && Math.abs(youter2) < (6 * scale.y)) {
        youter2status = true;
    }

    if (xcross1status) {
        x11coord = xcross1;
        y11coord = 0;
        if (ycross1status) {            //xcross and ycross
            x12coord = 0;
            y12coord = ycross1;
        } else if (xouter1status) {     //xcross and xouter
            x12coord = xouter1;
            if (scale.yptve) {
                y12coord = 6 * scale.y;
            } else {
                y12coord = -6 * scale.y;
            }
        } else {                        //xcross and youter
            if (scale.xptve) {
                x12coord = 6 * scale.x;
            } else {
                x12coord = -6 * scale.x;
            }
            y12coord = youter1;
        }
    } else if (ycross1status) {
        x11coord = 0;
        y11coord = ycross1;
        if (xouter1status) {            //ycross and xouter
            x12coord = xouter1;
            if (scale.yptve) {
                y12coord = 6 * scale.y;
            } else {
                y12coord = -6 * scale.y;
            }
        } else {                        //ycross and youter
            if (scale.xptve) {
                x12coord = 6 * scale.x;
            } else {
                x12coord = -6 * scale.x;
            }
            y12coord = youter1;
        }
    } else {                            //xouter and youter
        x11coord = xouter1;
        if (scale.yptve) {
            y11coord = 6 * scale.y;
        } else {
            y11coord = -6 * scale.y;
        }
        if (scale.xptve) {
            x12coord = 6 * scale.x;
        } else {
            x12coord = -6 * scale.x;
        }
        y12coord = youter1;
    }

    if (xcross2status) {
        x21coord = xcross2;
        y21coord = 0;
        if (ycross2status) {            //xcross and ycross
            x22coord = 0;
            y22coord = ycross2;
        } else if (xouter2status) {     //xcross and xouter
            x22coord = xouter2;
            if (scale.yptve) {
                y22coord = 6 * scale.y;
            } else {
                y22coord = -6 * scale.y;
            }
        } else {                        //xcross and youter
            if (scale.xptve) {
                x22coord = 6 * scale.x;
            } else {
                x22coord = -6 * scale.x;
            }
            y22coord = youter2;
        }
    } else if (ycross2status) {
        x21coord = 0;
        y21coord = ycross2;
        if (xouter2status) {            //ycross and xouter
            x22coord = xouter2;
            if (scale.yptve) {
                y22coord = 6 * scale.y;
            } else {
                y22coord = -6 * scale.y;
            }
        } else {                        //ycross and youter
            if (scale.xptve) {
                x22coord = 6 * scale.x;
            } else {
                x22coord = -6 * scale.x;
            }
            y22coord = youter2;
        }
    } else {                            //xouter and youter
        x21coord = xouter2;
        if (scale.yptve) {
            y21coord = 6 * scale.y;
        } else {
            y21coord = -6 * scale.y;
        }
        if (scale.xptve) {
            x22coord = 6 * scale.x;
        } else {
            x22coord = -6 * scale.x;
        }
        y22coord = youter2;
    }
    var coord11 = coordCalc(x11coord, y11coord, scale.x, scale.y, scale.xptve, scale.yptve);
    var coord12 = coordCalc(x12coord, y12coord, scale.x, scale.y, scale.xptve, scale.yptve);
    var coord21 = coordCalc(x21coord, y21coord, scale.x, scale.y, scale.xptve, scale.yptve);
    var coord22 = coordCalc(x22coord, y22coord, scale.x, scale.y, scale.xptve, scale.yptve);

    ctx2.lineWidth = 1;
    ctx2.strokeStyle = '#0000ff';
    ctx2.beginPath();
    ctx2.moveTo(coord11.x, coord11.y);
    ctx2.lineTo(coord12.x, coord12.y);
    ctx2.stroke();
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = '#00ff00';
    ctx2.beginPath();
    ctx2.moveTo(coord21.x, coord21.y);
    ctx2.lineTo(coord22.x, coord22.y);
    ctx2.stroke();
    
    var coordxtab11 = coordCalc(tab.x11, tab.y11, scale.x, scale.y, scale.xptve, scale.yptve);
    var coordxtab12 = coordCalc(tab.x12, tab.y12, scale.x, scale.y, scale.xptve, scale.yptve);
    var coordxtab13 = coordCalc(tab.x13, tab.y13, scale.x, scale.y, scale.xptve, scale.yptve);
    var coordxtab21 = coordCalc(tab.x21, tab.y21, scale.x, scale.y, scale.xptve, scale.yptve);
    var coordxtab23 = coordCalc(tab.x23, tab.y23, scale.x, scale.y, scale.xptve, scale.yptve);
    ctx2.font = "20px Comic Sans MS";
    ctx2.textAlign = "center";
    ctx2.textBaseline = 'middle';
    ctx2.fillText('x', coordxtab11.x, coordxtab11.y);
    ctx2.fillText('x', coordxtab12.x, coordxtab12.y);
    ctx2.fillText('x', coordxtab21.x, coordxtab21.y);
    ctx2.fillText('x', coordxtab13.x, coordxtab13.y);
    ctx2.fillText('x', coordxtab23.x, coordxtab23.y);

  function simGraphDescription() {
    let sx, sy, xptve = true, yptve = true;
    if (typeof scale === 'object' && scale !== null && 'x' in scale) {
      sx = scale.x; sy = scale.y;
      xptve = scale.xptve; yptve = scale.yptve;
    } else if (typeof xscale !== 'undefined') {
      sx = xscale; sy = yscale;
      if (typeof xpositive !== 'undefined') { xptve = xpositive; yptve = ypositive; }
    } else {
      sx = 1; sy = 1;
    }
    const qx = xptve ? 'positive' : 'negative';
    const qy = yptve ? 'positive' : 'negative';
    const ax = (typeof ltr1txt !== 'undefined' && ltr1txt) ? ltr1txt : 'x';
    const ay = (typeof ltr2txt !== 'undefined' && ltr2txt) ? ltr2txt : 'y';
    const solX = (typeof x !== 'undefined') ? x : '?';
    const solY = (typeof y !== 'undefined') ? y : '?';
    return (
      'Diagram: simultaneous equations graph. ' +
      'Shows the ' + qx + '–' + qy + ' quadrant only. ' +
      'Horizontal axis ' + ax + ' with scale divisions of ' + sx + '; ' +
      'vertical axis ' + ay + ' with scale divisions of ' + sy + '. ' +
      'Two straight lines are drawn from edge to edge of the grid; ' +
      'their intersection (the solution) is at (' + solX + ', ' + solY + '). ' +
      'Each line is marked with three plotted points matching the coordinate tables.'
    );
  }
  const diagramDescription = simGraphDescription();

    const _result = {
      question: sumq,
      solution: suma,
      notesLink: notesLink
    };
    if (typeof off !== 'undefined') {
      _result.canvas = {
        width: off.width,
        height: off.height,
        withSolution: true,
        
        description: diagramDescription,
        solutionDescription: diagramDescription,
        questionDraw: (c) => { try { c.drawImage(off, 0, 0); } catch (e) {} },
        draw: (c) => { try { c.drawImage(off, 0, 0); } catch (e) {} }
      };
    }
    return _result;
}