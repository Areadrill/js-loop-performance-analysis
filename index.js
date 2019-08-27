const measureTime = (test) => {
    const startTime = Date.now();

    test();

    const elapsedTime = Date.now() - startTime;

    return elapsedTime;
};


const testVariant = (test, iterations)  => {
    const results = [];

    for (let i = 0; i < iterations; i++) {
        results.push(measureTime(test));
    }

    return results;
};

const normalFor = () => {
    for (let i = 0; i < 999999; i++) {
        1+1;
    }
};
  
const forOf = () => {
    for (const el of new Array(999999).fill(0)) {
        1+1;
    }
};

const forIn = () => {
    for (const el in new Array(999999).fill(0)) {
        1+1;
    }
};
  
const forEach = () => {
    new Array(999999).fill(0).forEach((el) => {
        1+1;
    });
};

const getAverage = (values) => {
    return values.reduce((sum, curr) => sum+curr, 0) / values.length;
};

const doTest = (iterations = 1000) => {
    console.log('Starting normal "for" test');

    const normalForResults = testVariant(normalFor, iterations);

    console.log('Normal "for" test done!\n');
    console.log('Starting "for of"');

    const forOfResults = testVariant(forOf, iterations);


    console.log('"for of" test done!\n');
    console.log('Starting "for in" test');

    const forInResults = testVariant(forIn, iterations);


    console.log('"for in" test done!\n');
    console.log('Starting "forEach" test');

    const forEachResults = testVariant(forEach, iterations);

    console.log('"forEach" test done!\n');

    const meanNormalForResult = getAverage(normalForResults);
    const meanForOfResult = getAverage(forOfResults);
    const meanForInResult = getAverage(forInResults);
    const meanForEachResult = getAverage(forEachResults);

    const maxNormalForResult = Math.max(...normalForResults);
    const maxForOfResult = Math.max(...forOfResults);
    const maxForInResult = Math.max(...forInResults);
    const maxForEachResult = Math.max(...forEachResults);

    const minNormalForResult = Math.min(...normalForResults);
    const minForOfResult = Math.min(...forOfResults);
    const minForInResult = Math.min(...forInResults);
    const minForEachResult = Math.min(...forEachResults);

    console.table({
        for: {
            mean: meanNormalForResult,
            max: maxNormalForResult,
            min: minNormalForResult,
        },
        forOf: {
            mean: meanForOfResult,
            max: maxForOfResult,
            min: minForOfResult,
        },
        forIn: {
            mean: meanForInResult,
            max: maxForInResult,
            min: minForInResult,
        },
        forEach: {
            mean: meanForEachResult,
            max: maxForEachResult,
            min: minForEachResult,
        }
    });
}

typeof document !== 'undefined' ? document.querySelector('#startTest').addEventListener('click', () => {
    const iterations = document.querySelector('#iterations').value;

    doTest(iterations);
}) : 
doTest(50);

