import PerceptronMulti from "./perceptron-multi";

class DenseNet {
    nbInput: number;
    outputLayer: PerceptronMulti[] | [] = [];
    hiddenLayer1: PerceptronMulti[] | [] = [];

    constructor(nbInput: number, nbHiddenNeuron: number, nbOfOutput: number = 1) {
        this.nbInput = nbInput;
        for (let i = 0; i < nbHiddenNeuron; i++) {
            this.hiddenLayer1[i] = new PerceptronMulti(nbInput);
        }
        for (let i = 0; i < nbOfOutput; i++) {
            this.outputLayer[i] = new PerceptronMulti(nbHiddenNeuron);
        }
    }

    /**
     * Return network output
     * @param inputs
     */
    predict(inputs: number[]): number[] {
        const hiddenOutput: number[] = [];
        for (let i = 0; i < this.hiddenLayer1.length; i++) {
            hiddenOutput.push(this.hiddenLayer1[i].predict(inputs))
        }
        return [this.outputLayer[0].predict(hiddenOutput)];
    }

    /**
     * Calculate network error
     * @param output
     * @param expected
     */
    calcNetworkError(output: number[], expected: number[]): number[] {
        const outputs: number[] = [];
        for (let i = 0; i < output.length; i++) {
            outputs.push(output[i] - expected[i]);
        }
        return outputs;
    }
}

export default DenseNet;