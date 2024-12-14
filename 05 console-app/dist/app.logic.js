"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const multiplication = () => {
    const header = "=================================================";
    let content = header + "\n";
    content = content + 'Tabla del 5' + "\n";
    content = content + header + "\n";
    for (let index = 1; index <= 10; index++) {
        content = content + 5 + " x " + index + " = " + (5 * index) + "\n";
    }
    (0, fs_1.writeFileSync)('./files/multiplication.txt', content);
};
multiplication();
