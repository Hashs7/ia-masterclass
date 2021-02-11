import {Dataset} from "src/dataset";

export function shuffleDataset(array: Dataset[]): Dataset[] {
    return [...array].sort(() => Math.random() - 0.5);
}

export function logPredict(res: number, expected: number) {
    console.log('predict: ', res, '; expected: ', expected, ' valid: ', res === expected);
}
