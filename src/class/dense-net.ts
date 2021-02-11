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

    train(inputs: number[], expected: number[]) {
        const prediction = this.predict(inputs);
        const netError = this.calcNetworkError(prediction, expected);
        // @ts-ignore
        const outDelta: number[] = this.outputLayer.map(() => 0);

        // Pour chacune des sortis du réseau
        for (let j = 0; j < this.outputLayer.length; j++) {
            // Calculer la somme des erreurs multiplié par le dérivé de chaque neurone caché
            for (let i = 0; i < this.hiddenLayer1.length; i++) {
                outDelta[j] += this.hiddenLayer1[i].dActrivate() * netError[j];
            }
        }

        // Calcul du gradient en fonction du delta pour chaque neurone de sortie
        for (let i = 0; i < this.outputLayer.length; i++) {
            this.outputLayer[i].getGradient(outDelta[i]);
        }
    }

    /**
     * Calculate network error
     * @param output
     * @param expected
     */
    calcNetworkError(output: number[], expected: number[]): number[] {
        const outputErrors: number[] = [];
        for (let i = 0; i < output.length; i++) {
            outputErrors.push(output[i] - expected[i]);
        }
        return outputErrors;
    }
}

export default DenseNet;