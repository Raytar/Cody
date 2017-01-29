import {VM} from 'vm2';

export class CodeRunner {
    lang: string;
    code: string;

    constructor(lang: string, code: string) {
        this.lang = lang;
        this.code = lang;
    }

    run(): string {
        switch(this.lang) {
            case 'javascript':
                return this.runVM(this.code);
            default:
                return this.lang + ' is not yet implemented.';
        }
    }

    protected runVM(code: string): string {
        //TODO: Create a sandbox object to use as an api.
        let vm = new VM({
            timeout: 1000
        });

        let result; 

        try {
            result = vm.run();
        } catch (error) {
            result = error.message;
        }

        return this.padOutput(result);
    }

    padOutput(output: string): string {
        let padding = '```';
        return padding + output + padding;
    }
}