// js/registry.js — TG5 Maths pt I topics
import * as noncalc from './generators/noncalc.js';
import * as fracs from './generators/fracs.js';
import * as percentratio from './generators/percentratio.js';
import * as prop from './generators/prop.js';
import * as hcflcm from './generators/hcflcm.js';
import * as indices from './generators/indices.js';
import * as numform from './generators/numform.js';
import * as stats from './generators/stats.js';

export const registry = {
  noncalc,
  fracs,
  percentratio,
  prop,
  hcflcm,
  indices,
  numform,
  stats,

  get(topic) {
    const gen = this[topic];
    if (!gen) throw new Error(`No generator for: ${topic}`);
    return gen;
  }
};

window.registry = registry;
