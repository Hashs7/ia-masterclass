import DenseNet from "./class/dense-net"
import {logPredict, shuffleArray} from "src/helpers";

const net = new DenseNet(3, 4, 1);

const datasetAND = [
    [[1,0], [0]],
    [[0,1], [0]],
    [[1,1], [1]],
    [[0,0], [0]],
];

datasetAND.forEach((d) => {
    // console.log(net.predict(d[0]));
    logPredict(net.predict(d[0])[0], d[1][0])
});

const epoch = 5000;
for (let i = 0; i < epoch; i++) {
    const shuffled = shuffleArray(datasetAND);

    for (let i = 0; i < shuffled.length; i++) {
        net.train(shuffled[i][0], shuffled[i][1], 0.01);
    }
}

console.log('\nAfter train');
datasetAND.forEach((d, i) => {
    logPredict(net.predict(d[0])[0], d[1][0])
});
console.log('\n');