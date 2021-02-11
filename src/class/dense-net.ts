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
     *
     * @param inputs
     * @param expected
     * @param lr
     */
    train(inputs: number[], expected: number[], lr: number) {
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

        // Créer un tableau d'eeur de taille nbHiddenNeuron contenant que des 0
        const l1Errors: number[] = (this.hiddenLayer1 as number[]).map(() => 0);
        let counter: number = 0;
        // @ts-ignore
        this.outputLayer.forEach((pOut) => {
            for (let i = 0; i < this.hiddenLayer1.length; i++) {
                l1Errors[i] += pOut.weights[i] * outDelta[counter];
            }
            counter += 1;
        });

        const hiddenDelta: number[] = [];
        for (let i = 0; i < this.hiddenLayer1.length; i++) {
            hiddenDelta[i] = l1Errors[i] * this.hiddenLayer1[i].dActrivate();
        }

        for (let i = 0; i < hiddenDelta.length; i++) {
            this.hiddenLayer1[i].getGradient(hiddenDelta[i]);
        }

        this.updateWeights(lr)
    }

    /**
     *
     * @param lr: learning rates
     */
    updateWeights(lr: number) {
        this.outputLayer.forEach(p => p.updateWeights(lr));
        this.hiddenLayer1.forEach(p => p.updateWeights(lr));
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