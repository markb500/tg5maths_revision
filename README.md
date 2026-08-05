# TG5 Maths Part I Revision Aid

Modular ES-module version of the TG5 Maths Part I revision tool, aligned with the Maths / Science / Radar packages.

## Topics

- Non-Calculator Maths  
- Fractions  
- Percentages & Ratios  
- Proportionality  
- HCF/LCM (prime-tree canvas)  
- Indices  
- Number Form  
- Probability  

Plus **Test Designer**, **print layout**, **teacher solution window** (`chpz`), notes PDFs, background colour.

## Quick start

```bash
cd TG5_Maths_pt_I
npx serve .
```

Open the URL shown (HTTP required for ES modules).

## Structure

```
TG5_Maths_pt_I/
├── index.html
├── SolnWin.html
├── testCreate.html
├── testQsheet.html
├── README.md
├── css/main.css
├── js/
│   ├── app.js
│   ├── registry.js
│   ├── utils.js
│   └── generators/   # one module per topic
├── images/           # notes PDFs + assets
└── MathsHelp/
```

Each generator exports `generate()` returning `{ question, solution, notesLink, canvas? }`.

## Secret teacher window

Type **`chpz`** on the main page to open `SolnWin.html`. Solutions update automatically when a new question is generated.
