class Perceptron {
    bias: number;
    weights: number[] | [] = [];

    constructor(nbInputs: number) {
        this.bias = Math.random();
        // this.weights = [0.2, 0.4];
        for (let i = 0; i < nbInputs; i++) {
          this.weights[i] = Math.random();
        }
    }

    predict(inputs: number[]): number {
        let sop = 0;
        inputs.forEach((inp, index) => {
            sop += inp * this.weights[index];
        });
        sop += this.bias;
        return this.activate(sop);
    }

    activate(x: number): number {
        return x > 0 ? 1 : -1;
    }

    train(inputs: number[], expected: number, learningRate: number = 0.01) {
        // pour 20° et 5% de risque de pluie
        // Quelle réponse donnes-tu ?
        const netOutput: number = this.predict(inputs);
        // Par rapport à la réponse que j'attendais
        // On calcul l'erreur (différence entre prédiction et valeur attendue)
        const netError = this.calcError(netOutput, expected);
        this.bias += netError * learningRate;
        this.weights = [...this.weights].map((w: number, i: number) => {
             return w + (netError * inputs[i]) * learningRate;
        });
    }

    calcError(output: number, expected: number): number {
        return expected - output;
    }
}

export default Perceptron;