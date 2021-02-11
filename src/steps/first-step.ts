import Perceptron from "../class/perceptron";
import dataset, {Dataset} from "../dataset";
import {logPredict, shuffleDataset} from "src/helpers";

const perceptron = new Perceptron(2);
const inputValues = [19, 10];
const output = perceptron.predict(inputValues);


console.log('output: ', output);
console.log('before train: ', perceptron.weights);

console.log('\nResults before training ');
for (let i = 0; i < dataset.length; i++) {
    const res = perceptron.predict([dataset[i].inputs.temperature, dataset[i].inputs.rainPercent]);
    logPredict(res, dataset[i].expected[0]);
}

for (let i = 0; i < 500; i++) {
    const shuffled: Dataset[] = shuffleDataset(dataset);

    for (let i = 0; i < shuffled.length; i++) {
        perceptron.train([shuffled[i].inputs.temperature, shuffled[i].inputs.rainPercent], shuffled[i].expected[0]);
    }
}

console.log('\nResults after training ');

for (let i = 0; i < dataset.length; i++) {
    const res = perceptron.predict([dataset[i].inputs.temperature, dataset[i].inputs.rainPercent]);
    logPredict(res, dataset[i].expected[0]);
}

// console.log('after train: ', perceptron.weights);
console.log('output: ', perceptron.predict(inputValues));

