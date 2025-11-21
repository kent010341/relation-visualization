import { Component, computed, effect, input, output, signal } from '@angular/core';
import { LabeledInput } from "@src/components/labeled-input/labeled-input";

@Component({
    selector: 'app-json-parser',
    imports: [LabeledInput],
    templateUrl: './json-parser.html',
    styleUrl: './json-parser.scss',
})
export class JsonParser {

    readonly label = input<string>('');

    readonly parser = output<string[]>();

    private readonly sep = '.';

    protected readonly cfg = signal<string>('');
    private readonly keys = computed(() => {
        const cfg = this.cfg();
        return cfg.split(this.sep).map(part => part.trim());
    });

    constructor() {
        effect(() => {
            this.parser.emit(this.keys());
        });
    }

}
