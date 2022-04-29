"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const clases_1 = require("./clases");
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
const prompt = () => new Promise((resolve) => rl.question('>>>', resolve));
;
(async () => {
    while (true) {
        const input = await prompt();
        if (input === 'SALIR') {
            process.exit(0);
        }
        console.log((0, clases_1.processInput)(input));
    }
})();
