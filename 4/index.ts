import { createInterface } from 'readline';
import { processInput } from './clases';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const prompt = (): Promise<string> => new Promise((resolve) => rl.question('>>>', resolve));

;(async () => {
    while (true) {
        const input = await prompt();
        if (input === 'SALIR') {
            process.exit(0);
        }
        console.log(processInput(input));
    }
})();
