import { Component, inject } from '@angular/core';
import { D3Graph } from '@src/components/d3-graph/d3-graph';
import { DataManager } from '@src/service/data-manager';

@Component({
    selector: 'app-visualization',
    imports: [
        D3Graph,
    ],
    templateUrl: './visualization.html',
    styleUrl: './visualization.scss',
})
export class Visualization {

    relations = inject(DataManager).relations;

}
