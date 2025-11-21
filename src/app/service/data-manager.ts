import { Injectable, signal } from '@angular/core';
import { RawRelation } from '@src/models/model';

@Injectable({
    providedIn: 'root',
})
export class DataManager {

    private readonly _relations = signal<RawRelation[]>([]);
    readonly relations = this._relations.asReadonly();

    setRelations(relations: RawRelation[]): void {
        this._relations.set(relations);
    }

}
