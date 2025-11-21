import { Component, input, output, signal } from '@angular/core';
import { RawNode, RawRelation, RelationParserKey } from '@src/models/model';

@Component({
    selector: 'app-json-input',
    imports: [],
    templateUrl: './json-input.html',
    styleUrl: './json-input.scss',
})
export class JsonInput {

    private readonly _jsonInput = signal<string>('');
    readonly jsonInput = this._jsonInput.asReadonly();

    readonly parser = input.required<RelationParserKey>();

    readonly submit = output<RawRelation[]>();

    setInput(event: Event): void {
        const target = event.target as HTMLTextAreaElement;
        this._jsonInput.set(target.value);
    }

    beautifyJson(): void {
        try {
            const parsed = JSON.parse(this._jsonInput());
            const beautified = JSON.stringify(parsed, null, 2);
            this._jsonInput.set(beautified);
        } catch (e) {
            console.error('Invalid JSON input', e);
        }
    }

    visualize(): void {
        try {
            const parsed = JSON.parse(this._jsonInput());
            if (Array.isArray(parsed)) {
                const relations = parsed.map(item => this.parseRelation(item));
                this.submit.emit(relations);
            } else {
                console.error('Input JSON is not an array');
            }
        } catch (e) {
            console.error('Invalid JSON input', e);
        }
    }

    private parseRelation(jsonObj: any): RawRelation {
        const parser = this.parser();
        const src: RawNode = {
            id: this.extractValue(jsonObj, parser.srcId),
            label: this.extractValue(jsonObj, parser.srcLabel),
        };
        const dst: RawNode = {
            id: this.extractValue(jsonObj, parser.dstId),
            label: this.extractValue(jsonObj, parser.dstLabel),
        };
        const relationLabel = this.extractValue(jsonObj, parser.relationLabel);
        return {
            src,
            dst,
            relation: relationLabel,
        };
    }

    private extractValue(jsonObj: any, keys: string[]): string {
        let value: any = jsonObj;
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`Key path ${keys.join('.')} not found in JSON object`);
                return '';
            }
        }
        return String(value);
    }

}
