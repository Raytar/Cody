'use strict';
import * as Discord from 'discord.js';
import {VM} from 'vm2';
import * as tsc from 'typescript-compiler';
import * as sandbox from './Sandbox';

export interface CodeSample {
    lang: string;
    code: string;
}

const LANG_JS = 'javascript';
const LANG_TS = 'typescript';

export class Cody {
    parseMessage(msg: string): CodeSample {
        let reg = /`{3}(.+)\n([\s\S]*)`{3}/g;
        let matches = reg.exec(msg);
        
        return {lang: matches[1], code: matches[2]};
    }

    runCode(sample: CodeSample): string {
        switch (sample.lang) {
            case LANG_JS:
                return this.runVM(sample.code);
            case LANG_TS:
                return this.runVM(tsc.compileString(sample.code));
            
            default:
                return `${sample.lang} is not a supported language.`;
        }
    }

    protected runVM(code: string): string {
        //TODO: Create a sandbox object to use as an api
        let vm = new VM({
            timeout: 5000,
            sandbox: sandbox
        });

        let result; 

        try {
            result = vm.run(code);
        } catch (error) {
            result = error.message;
        }

        if (sandbox.out != '') {
            result = sandbox.out;
        }

        return this.padOutput(result);
    }

    protected padOutput(output: string): string {
        let padding = '```';
        return output !== undefined ? padding + output + padding : this.padOutput('Output was empty.');
    }
}