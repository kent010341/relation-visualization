import { Component, computed, Signal, signal } from '@angular/core';
import { JsonParser } from '@src/components/json-parser/json-parser';
import { RelationParserKey } from '@src/models/model';

@Component({
    selector: 'app-relation-parser',
    imports: [
        JsonParser
    ],
    templateUrl: './relation-parser.html',
    styleUrl: './relation-parser.scss',
})
export class RelationParser {

    private readonly srcIdParser = signal<string[]>([]);
    private readonly srcLabelParser = signal<string[]>([]);
    private readonly dstIdParser = signal<string[]>([]);
    private readonly dstLabelParser = signal<string[]>([]);
    private readonly relationLabelParser = signal<string[]>([]);

    readonly parsers: Signal<RelationParserKey> = computed(() => ({
        srcId: this.srcIdParser(),
        srcLabel: this.srcLabelParser(),
        dstId: this.dstIdParser(),
        dstLabel: this.dstLabelParser(),
        relationLabel: this.relationLabelParser(),
    }));

    setSrcIdParser(parser: string[]): void {
        this.srcIdParser.set(parser);
    }

    setSrcLabelParser(parser: string[]): void {
        this.srcLabelParser.set(parser);
    }

    setDstIdParser(parser: string[]): void {
        this.dstIdParser.set(parser);
    }

    setDstLabelParser(parser: string[]): void {
        this.dstLabelParser.set(parser);
    }

    setRelationLabelParser(parser: string[]): void {
        this.relationLabelParser.set(parser);
    }

}
