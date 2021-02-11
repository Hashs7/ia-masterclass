class PerceptronMulti {
    bias: number;
    act: number = 0;
    sop: number = 0;
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
}

export default PerceptronMulti;