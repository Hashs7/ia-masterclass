class PerceptronMulti {
    bias: number;
    act: number = 0;
    sop: number = 0;
    gradients: number[] | [] = [];
    weights: number[] | [] = [];
    inputs: number[] | [] = [];

    constructor(nbInputs: number) {
        this.bias = Math.random();
        for (let i = 0; i < nbInputs; i++) {
          this.weights[i] = Math.random();
        }
    }

    predict(inputs: number[]): number {
        this.inputs = inputs;
        this.sop = 0;
        inputs.forEach((inp, index) => {
            this.sop += inp * this.weights[index];
        });
        this.sop += this.bias;
        this.act = this.activate(this.sop) ;
        return this.act;
    }

    /**
     * Function ReLU
     * @param x
     */
    activate(x: number): number {
        return Math.max(0, x);
    }

    /**
     * Dérivé de la fonction d'activation
     */
    dActrivate(): number {
        return this.sop > 0 ? 1 : 0
    }

    getGradient(delta: number) {
        this.gradients = [];
        for (let i = 0; i < this.inputs.length; i++) {
            // @ts-ignore
            this.gradients.push(this.inputs[i] * delta);
        }
    }

    /**
     *
     * @param lr: learning rate
     */
    updateWeights(lr: number) {
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] -= this.gradients[i] * lr;
        }
    }
}

export default PerceptronMulti;