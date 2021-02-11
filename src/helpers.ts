import {Dataset} from "src/dataset";
import chalk from 'chalk'

export function shuffleDataset(array: Dataset[]): Dataset[] {
    return [...array].sort(() => Math.random() - 0.5);
}

export function logPredict(res: number, expected: number) {
    const print = 'predict: ' + res + '; expected: ' + expected;
    if (res === expected) {
        console.log(chalk.green(print));
        return;
    }
    console.log(chalk.red(print));
}