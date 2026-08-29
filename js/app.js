// js/app.js
import { registry } from './registry.js';
import * as utils from './utils.js';

// Display name → registry key
const topicMap = {
  "Non-Calculator Maths": "noncalc",
  "Fractions": "fracs",
  "Percentages & Ratios": "percentratio",
  "Proportionality": "prop",
  "HCF/LCM": "hcflcm",
  "Indices": "indices",
  "Number Form": "numform",
  "Probability": "stats"
};

let currentSumData = null;
let views = 0;
let SolnWin = null;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.topic-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      generateQuestion(btn.dataset.topic || topicMap[btn.textContent.trim()]);
    });
  });

  if (!new URLSearchParams(window.location.search).get('test')) {
    const qEl = document.getElementById('q');
    if (qEl) {
      qEl.innerHTML =
        'Click a button to select the type of sum. ' +
        'Each click will generate a new sum.<br>' +
        "Clicking 'solution' will reveal a step-by-step solution.";
    }
  }

  const solnBtn = document.getElementById('btnSoln');
  if (solnBtn) {
    solnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSolution();
    });
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('test') === '1') {
    runTestMode();
  }

  const colourSelect = document.getElementById('colourSelect');
  if (colourSelect) {
    colourSelect.addEventListener('change', () => {
      document.querySelector(':root').style.setProperty('--bgcolour', colourSelect.value);
      applyBackgroundToSolnWin();
    });
  }

  initSecretCode();
  initStaffSolnControl();

  try {
    if (typeof utils.loadImages === 'function') utils.loadImages();
  } catch (err) {
    console.warn('loadImages failed:', err);
  }
});


function getPageBackground() {
  const sel = document.getElementById('colourSelect');
  if (sel && sel.value) return sel.value;
  return getComputedStyle(document.documentElement).getPropertyValue('--bgcolour').trim() || '#ffffff';
}

function applyBackgroundToSolnWin() {
  if (!SolnWin || SolnWin.closed) return;
  try {
    const bg = getPageBackground();
    const doc = SolnWin.document;
    if (!doc || !doc.documentElement) return;
    doc.documentElement.style.setProperty('--bgcolour', bg);
    if (doc.body) doc.body.style.backgroundColor = bg;
  } catch (err) {
    console.warn('Could not set SolnWin background:', err);
  }
}

function updateDiagramDescription(show, forSolution) {
  const descEl = document.getElementById('diagramDesc');
  const canvas = document.getElementById('myCanvas');
  const canvas2 = document.getElementById('myCanvas2');
  if (!descEl) return;

  let text = '';
  if (show && currentSumData && currentSumData.canvas) {
    const c = currentSumData.canvas;
    if (forSolution) {
      text = c.solutionDescription || c.description || '';
    } else {
      text = c.description || '';
    }
  }

  if (text) {
    descEl.textContent = text;
    descEl.hidden = false;
    for (const el of [canvas, canvas2]) {
      if (!el) continue;
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', text);
      el.setAttribute('aria-hidden', 'false');
    }
  } else {
    descEl.textContent = '';
    descEl.hidden = true;
    for (const el of [canvas, canvas2]) {
      if (!el) continue;
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
      el.setAttribute('aria-hidden', 'true');
    }
  }
}

function setSolutionExpanded(expanded) {
  const btn = document.getElementById('btnSoln');
  if (btn) btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

function openSolnWin() {
  try {
    if (SolnWin && !SolnWin.closed) {
      SolnWin.focus();
      applyBackgroundToSolnWin();
      updateSolnWin();
      return SolnWin;
    }
  } catch (err) { /* ignore */ }

  SolnWin = window.open('SolnWin.html', 'SolnWin', 'resizable=yes,scrollbars=yes');
  if (SolnWin) {
    SolnWin.addEventListener('load', () => {
      applyBackgroundToSolnWin();
      updateSolnWin();
    });
    setTimeout(() => {
      applyBackgroundToSolnWin();
      updateSolnWin();
    }, 500);
  } else {
    console.warn('Solution window was blocked. Allow pop-ups for this site.');
  }
  return SolnWin;
}

function initStaffSolnControl() {
  window.openSolnWin = openSolnWin;
  const btn = document.getElementById('btnStaffSoln');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openSolnWin();
  });
}

function updateSolnWin() {
  if (!SolnWin || SolnWin.closed) return;
  try {
    applyBackgroundToSolnWin();
    if (!currentSumData) return;

    const a2 = SolnWin.document.getElementById('a2');
    const c3 = SolnWin.document.getElementById('myCanvas3');
    if (!a2) return;

    a2.innerHTML = currentSumData.solution || '';
    a2.querySelectorAll('.row').forEach((el) => {
      el.style.display = 'block';
      el.style.marginLeft = '0';
      el.style.marginRight = '0';
    });

    if (c3) {
      const c3b = SolnWin.document.getElementById('myCanvas3b');
      const stack3 = SolnWin.document.getElementById('canvasStack3');
      const c = currentSumData.canvas;

      // Question-only diagrams stay off SolnWin; show only when withSolution
      if (c && c.withSolution) {
        const w = c.width || 400;
        const h = c.height || 400;
        if (stack3) {
          stack3.style.width = w + 'px';
          stack3.style.height = h + 'px';
          stack3.style.position = 'relative';
        }
        c3.width = w;
        c3.height = h;
        const ctx3 = c3.getContext('2d');
        ctx3.clearRect(0, 0, w, h);

        if (typeof c.questionDraw === 'function') {
          c.questionDraw(ctx3);
          if (c3b) {
            c3b.width = w;
            c3b.height = h;
            c3b.style.visibility = 'visible';
            const ctx3b = c3b.getContext('2d');
            ctx3b.clearRect(0, 0, w, h);
            if (typeof c.draw === 'function') c.draw(ctx3b);
          } else if (typeof c.draw === 'function') {
            c.draw(ctx3);
          }
        } else {
          if (typeof c.draw === 'function') c.draw(ctx3);
          if (c3b) {
            c3b.width = 0.5;
            c3b.height = 0.5;
            c3b.style.visibility = 'hidden';
          }
        }
      } else {
        c3.width = 0.5;
        c3.height = 0.5;
        if (c3b) {
          c3b.width = 0.5;
          c3b.height = 0.5;
          c3b.style.visibility = 'hidden';
        }
        if (stack3) {
          stack3.style.width = '0.5px';
          stack3.style.height = '0.5px';
        }
      }
    }

    if (SolnWin.MathJax && SolnWin.MathJax.Hub) {
      SolnWin.MathJax.Hub.Queue(['Typeset', SolnWin.MathJax.Hub, a2]);
    }
  } catch (err) {
    console.warn('Could not update SolnWin:', err);
  }
}

function generateQuestion(topic) {
  try {
    if (!topic) throw new Error('No topic key on button (data-topic missing)');
    currentSumData = registry.get(topic).generate();

    const qEl = document.getElementById('q');
    const aEl = document.getElementById('a');
    if (qEl) qEl.innerHTML = currentSumData.question;
    if (aEl) aEl.innerHTML = '';
    setSolutionExpanded(false);
    updateDiagramDescription(false, false);

    const notes = document.getElementById('noteslink');
    if (notes) {
      notes.href = currentSumData.notesLink || '#';
      notes.style.visibility = 'visible';
    }

    const canvas = document.getElementById('myCanvas');
    if (canvas && currentSumData.canvas && !currentSumData.canvas.withSolution) {
      canvas.height = currentSumData.canvas.height;
      canvas.width = currentSumData.canvas.width;
      currentSumData.canvas.draw(canvas.getContext('2d'));
      updateDiagramDescription(true, false);
    } else if (canvas && currentSumData.canvas && currentSumData.canvas.withSolution && currentSumData.canvas.questionDraw) {
      canvas.height = currentSumData.canvas.height;
      canvas.width = currentSumData.canvas.width;
      currentSumData.canvas.questionDraw(canvas.getContext('2d'));
      updateDiagramDescription(true, false);
    } else if (canvas) {
      canvas.height = 0.5;
      canvas.width = 0.5;
    }

    if (typeof window.eqnformat === 'function') window.eqnformat('q');
    else if (utils.eqnformat) utils.eqnformat('q');
    views = 0;
    updateViewCount();
    const btnSoln = document.getElementById('btnSoln');
    if (btnSoln) btnSoln.style.visibility = 'visible';

    updateSolnWin();
  } catch (err) {
    console.error('generateQuestion failed:', topic, err);
    const qEl = document.getElementById('q');
    if (qEl) {
      qEl.innerHTML =
        '<span style="color:#9b0000">Could not generate question for “' +
        String(topic) +
        '”. See the browser console for details.</span>';
    }
  }
}

function toggleSolution() {
  const aDiv = document.getElementById('a');
  const canvas = document.getElementById('myCanvas');
  if (!aDiv || !currentSumData) return;

  if (aDiv.innerHTML === '') {
    aDiv.innerHTML = currentSumData.solution;
    if (typeof window.eqnformat === 'function') window.eqnformat('a');
    else if (utils.eqnformat) utils.eqnformat('a');
    views++;
    updateViewCount();
    setSolutionExpanded(true);

    if (canvas && currentSumData.canvas && currentSumData.canvas.withSolution) {
      canvas.height = currentSumData.canvas.height;
      canvas.width = currentSumData.canvas.width;
      const ctx = canvas.getContext('2d');
      if (typeof currentSumData.canvas.questionDraw === 'function') {
        currentSumData.canvas.questionDraw(ctx);
      }
      currentSumData.canvas.draw(ctx);
      updateDiagramDescription(true, true);
    }
  } else {
    aDiv.innerHTML = '';
    setSolutionExpanded(false);
    if (canvas && currentSumData.canvas && currentSumData.canvas.withSolution) {
      if (typeof currentSumData.canvas.questionDraw === 'function') {
        canvas.height = currentSumData.canvas.height;
        canvas.width = currentSumData.canvas.width;
        currentSumData.canvas.questionDraw(canvas.getContext('2d'));
        updateDiagramDescription(true, false);
      } else {
        canvas.height = 0.5;
        canvas.width = 0.5;
        updateDiagramDescription(false, false);
      }
    }
  }
}

function updateViewCount() {
  document.getElementById('viewCount').textContent = views;
}

function initSecretCode() {
  // Legacy undocumented shortcut (chpz) — prefer #btnStaffSoln
  const pressed = [];
  const secretCode = 'chpz';
  window.addEventListener('keyup', (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
      openSolnWin();
    }
  });
}

function runTestMode() {
  // ----- Hide normal single-question UI -----
  document.querySelectorAll('.topic-btn').forEach(btn => btn.style.display = 'none');
  ['testdesign', 'btnStaffSoln', 'userhelp', 'topicInstruction'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const colourSelect = document.getElementById('colourSelect');
  if (colourSelect) {
    colourSelect.style.display = 'none';
    const label = colourSelect.previousElementSibling;
    if (label) label.style.display = 'none';
  }
  const solnBtn = document.getElementById('btnSoln');
  if (solnBtn) solnBtn.style.visibility = 'hidden';
  const notes = document.getElementById('noteslink');
  if (notes) notes.style.visibility = 'hidden';
  const mainCanvas = document.getElementById('myCanvas');
  if (mainCanvas) {
    mainCanvas.height = 0.5;
    mainCanvas.width = 0.5;
  }

  // ----- Load test design -----
  const raw = sessionStorage.getItem('testArr');
  if (!raw) {
    document.getElementById('q').innerHTML =
      '<p class="text-danger">No test design found. Please use the Test Designer first.</p>';
    return;
  }

  let testOrder;
  try {
    testOrder = JSON.parse(raw);
  } catch (e) {
    document.getElementById('q').innerHTML =
      '<p class="text-danger">Invalid test data.</p>';
    return;
  }

  const qContainer = document.getElementById('q');
  const aContainer = document.getElementById('a');
  qContainer.innerHTML = '';
  aContainer.innerHTML = '';

  // ---------- QUESTIONS ----------
  const qHeading = document.createElement('h2');
  qHeading.textContent = 'Questions';
  qHeading.className = 'mb-4';
  qContainer.appendChild(qHeading);

  const solutionsData = [];

  testOrder.forEach((displayName, index) => {
    const key = topicMap[displayName];
    if (!key || !registry[key]) {
      console.warn('Unknown topic:', displayName);
      return;
    }

    const data = registry.get(key).generate();
    const qnum = index + 1;

    // Question block
    const qBlock = document.createElement('div');
    qBlock.className = 'test-question mb-4';
    qBlock.dataset.topicKey = key;
    qBlock.dataset.qnum = qnum;

    qBlock.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <h5 class="mb-2">Question ${qnum}</h5>
        <button class="btn btn-sm btn-outline-warning change-q no-print">
          Change question
        </button>
      </div>
      <div class="question-body">${data.question}</div>
    `;

    // Question canvas (if any)
    if (data.canvas && !data.canvas.withSolution) {
      const c = document.createElement('canvas');
      c.width = data.canvas.width || 400;
      c.height = data.canvas.height || 400;
      c.className = 'mb-2 d-block question-canvas';
      qBlock.appendChild(c);
      try {
        data.canvas.draw(c.getContext('2d'));
      } catch (err) {
        console.error('Question canvas draw failed:', err);
      }
    }

    qContainer.appendChild(qBlock);
    solutionsData.push({ qnum, data, qBlock });
  });

  // ---------- SOLUTIONS ----------
  const solSection = document.createElement('div');
  solSection.className = 'solutions-section mt-5';
  solSection.innerHTML = '<h2 class="mb-4">Solutions</h2>';

  solutionsData.forEach(({ qnum, data }) => {
    const sBlock = document.createElement('div');
    sBlock.className = 'test-solution-block mb-4';

    // Toggle button (screen only)
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn btn-sm btn-outline-secondary mb-2 toggle-soln no-print';
    toggleBtn.textContent = `Show/Hide Solution ${qnum}`;
    sBlock.appendChild(toggleBtn);

    const body = document.createElement('div');
    body.className = 'solution-body';
    body.style.display = 'none';

    // Visible heading for print (and when expanded on screen)
    const heading = document.createElement('h5');
    heading.className = 'solution-heading mb-2';
    heading.textContent = `Solution ${qnum}`;
    body.appendChild(heading);

    // Solution canvas
    if (data.canvas && data.canvas.withSolution) {
      const c = document.createElement('canvas');
      c.width = data.canvas.width || 400;
      c.height = data.canvas.height || 400;
      c.className = 'mb-3 d-block';
      body.appendChild(c);
      try {
        data.canvas.draw(c.getContext('2d'));
      } catch (err) {
        console.error('Solution canvas draw failed:', err);
      }
    }

    const solnDiv = document.createElement('div');
    solnDiv.innerHTML = data.solution;
    body.appendChild(solnDiv);

    sBlock.appendChild(body);
    solSection.appendChild(sBlock);

    toggleBtn.addEventListener('click', () => {
      body.style.display = body.style.display === 'none' ? 'block' : 'none';
    });
  });

  aContainer.appendChild(solSection);

  // ---------- Change-question handlers ----------
  solutionsData.forEach((item, idx) => {
    const { qBlock } = item;
    const changeBtn = qBlock.querySelector('.change-q');
    if (!changeBtn) return;

    changeBtn.addEventListener('click', () => {
      const key = qBlock.dataset.topicKey;
      const newData = registry.get(key).generate();

      // Update question text
      qBlock.querySelector('.question-body').innerHTML = newData.question;

      // Replace question canvas
      const oldQCanvas = qBlock.querySelector('.question-canvas');
      if (oldQCanvas) oldQCanvas.remove();

      if (newData.canvas && !newData.canvas.withSolution) {
        const c = document.createElement('canvas');
        c.width = newData.canvas.width || 400;
        c.height = newData.canvas.height || 400;
        c.className = 'mb-2 d-block question-canvas';
        qBlock.appendChild(c);
        newData.canvas.draw(c.getContext('2d'));
      }

      // Update matching solution block
      const solBlock = document.querySelectorAll('.test-solution-block')[idx];
      if (solBlock) {
        const solBody = solBlock.querySelector('.solution-body');
        solBody.innerHTML = '';

        if (newData.canvas && newData.canvas.withSolution) {
          const c = document.createElement('canvas');
          c.width = newData.canvas.width || 400;
          c.height = newData.canvas.height || 400;
          c.className = 'mb-3 d-block';
          solBody.appendChild(c);
          newData.canvas.draw(c.getContext('2d'));
        }

        const solnDiv = document.createElement('div');
        solnDiv.innerHTML = newData.solution;
        solBody.appendChild(solnDiv);
      }

      // Re-typeset
      if (window.eqnformat) {
        window.eqnformat('q');
        window.eqnformat('a');
      } else if (window.MathJax) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
      }

      item.data = newData;
    });
  });

  // Final MathJax pass
  if (window.eqnformat) {
    window.eqnformat('q');
    window.eqnformat('a');
  } else if (window.MathJax) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }
}