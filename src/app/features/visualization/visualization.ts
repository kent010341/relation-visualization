import { Component, signal } from '@angular/core';
import { D3Graph } from '@src/components/d3-graph/d3-graph';
import { RawRelation } from '@src/models/model';
import { JsonInput } from "@src/features/visualization/json-input/json-input";
import { RelationParser } from '@src/features/visualization/relation-parser/relation-parser';

@Component({
    selector: 'app-visualization',
    imports: [
    D3Graph,
    JsonInput,
    RelationParser
],
    templateUrl: './visualization.html',
    styleUrl: './visualization.scss',
})
export class Visualization {

    private readonly _relations = signal<RawRelation[]>([]);
    readonly relations = this._relations.asReadonly();

    setRelations(relations: RawRelation[]): void {
        this._relations.set(relations);
    }

}