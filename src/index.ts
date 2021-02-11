import DenseNet from "./class/dense-net";

const net = new DenseNet(3, 4, 1);

console.log(net.nbInput);
console.log(net.hiddenLayer1.length);
console.log(net.outputLayer.length);

const prediction = net.predict([0.5, 0.2, -1]);
console.log(prediction);
const error = net.calcNetworkError(prediction, [1]);
console.log(error);