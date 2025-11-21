import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JsonInput } from "@src/features/configuration/json-input/json-input";
import { RelationParser } from '@src/features/configuration/relation-parser/relation-parser';
import { RawRelation } from '@src/models/model';
import { DataManager } from '@src/service/data-manager';

@Component({
    selector: 'app-configuration',
    imports: [
        JsonInput,
        RelationParser
    ],
    templateUrl: './configuration.html',
    styleUrl: './configuration.scss',
})
export class Configuration {

    private readonly dataManager = inject(DataManager);
    private readonly router = inject(Router);

    setRelations(relations: RawRelation[]): void {
        this.dataManager.setRelations(relations);
        this.router.navigate(['visualization']);
    }

}
