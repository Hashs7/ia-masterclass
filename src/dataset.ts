export interface Dataset {
    inputs: {
        temperature: number,
        rainPercent: number,
    },
    expected: number[],
}

const dataset: Dataset[] = [
    {
        inputs: {
            temperature: 20,
            rainPercent: 5,
        },
        expected: [-1],
    },
    {
        inputs: {
            temperature: 18,
            rainPercent: 25,
        },
        expected: [-1],
    },
    {
        inputs: {
            temperature: 24,
            rainPercent: 15,
        },
        expected: [-1],
    },
    {
        inputs: {
            temperature: 22,
            rainPercent: 25,
        },
        expected: [-1],
    },
    {
        inputs: {
            temperature: 21,
            rainPercent: 0,
        },
        expected: [-1],
    },
    {
        inputs: {
            temperature: 25,
            rainPercent: 15,
        },
        expected: [-1],
    },
    {
        inputs: {
            temperature: 20,
            rainPercent: 5,
        },
        expected: [-1],
    },
    {
        inputs: {
            temperature: 20,
            rainPercent: 5,
        },
        expected: [-1],
    },
    {
        inputs: {
            temperature: 5,
            rainPercent: 45,
        },
        expected: [1],
    },
    {
        inputs: {
            temperature: 9,
            rainPercent: 5,
        },
        expected: [1],
    },
    {
        inputs: {
            temperature: 12,
            rainPercent: 15,
        },
        expected: [1],
    },
    {
        inputs: {
            temperature: 7,
            rainPercent: 25,
        },
        expected: [1],
    },
    {
        inputs: {
            temperature: 8,
            rainPercent: 75,
        },
        expected: [1],
    },
    {
        inputs: {
            temperature: 15,
            rainPercent: 75,
        },
        expected: [1],
    },
];

export default dataset;