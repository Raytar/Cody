/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/modules/chai/index.d.ts" />
'use strict';

import * as Discord from 'discord.js';
import {Cody, CodeSample} from '../src/Cody';
import {assert} from 'chai';

interface Test {
    test: string;
    lang: string;
    code: string;
    output: string;
}

const test_js = `\`\`\`javascript
let foo = 1;
let bar = 2;
let baz = (x, y) => x + y;

print(baz(foo, bar));
\`\`\``;

const test_ts = `\`\`\`typescript
let foo = 1;
let bar = 2;
let baz = (x: number, y: number) => x + y;

print(baz(foo, bar));
\`\`\``;

const code_js = `\
let foo = 1;
let bar = 2;
let baz = (x, y) => x + y;

print(baz(foo, bar));
`;

const code_ts = `\
let foo = 1;
let bar = 2;
let baz = (x: number, y: number) => x + y;

print(baz(foo, bar));
`;

const tests: Test[] = [
    {
        test: test_js,
        lang: 'javascript',
        code: code_js,
        output: '```3\n```'
    },
    {
        test: test_ts,
        lang: 'typescript',
        code: code_ts,
        output: '```3\n```'
    }
];

describe('Cody', () => {
    let cody = new Cody();

    describe('parseMessage()', () => {
        let test_runs: CodeSample[] = [];
        tests.forEach(test => {
            test_runs.push(cody.parseMessage(test.test));
        });

        it('Extract language', () => {
            for (let i = 0; i < tests.length; i++) {
                assert.equal(test_runs[i].lang, tests[i].lang);
            }
        });

        it('Extract code', () => {
            for (let i = 0; i < tests.length; i++) {
                assert.equal(test_runs[i].code, tests[i].code);
            }
        });
    });

    describe('runCode()', () => {
        it('Testing output of code', () => {
            for (let i = 0; i < tests.length; i++) {
                let out = cody.runCode({lang: tests[i].lang, code: tests[i].code});
                assert.equal(out, tests[i].output, `Testing ${tests[i].lang} code`);
            }
        });
    });
});