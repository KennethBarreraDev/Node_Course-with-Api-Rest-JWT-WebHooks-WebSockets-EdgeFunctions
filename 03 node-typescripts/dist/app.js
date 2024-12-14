"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const heroes_1 = require("./data/heroes");
const findHeroeById = (id) => {
    const foundHero = heroes_1.heroes.find((hero) => hero.id === id);
    return foundHero;
};
const hero = findHeroeById(2);
console.log((_a = hero === null || hero === void 0 ? void 0 : hero.name) !== null && _a !== void 0 ? _a : "Hero not found");
