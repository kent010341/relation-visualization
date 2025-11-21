import { Component, computed, ElementRef, input, OnInit, viewChild } from '@angular/core';
import * as d3 from 'd3';
import { LinkArray, NodeDatum, RawRelation } from '@src/models/model';
import { SimulationLinkDatum } from 'd3';

@Component({
    selector: 'app-d3-graph',
    imports: [],
    templateUrl: './d3-graph.html',
    styleUrl: './d3-graph.scss',
})
export class D3Graph implements OnInit {

    readonly relations = input.required<RawRelation[]>();

    readonly container = viewChild.required<ElementRef>('container');

    private readonly relationArray = computed(() =>  new LinkArray(this.relations()));

    ngOnInit(): void {
        const host = this.container().nativeElement;
        const width = host.clientWidth;
        const height = host.clientHeight;
        const relationArray = this.relationArray();

        const svg = d3.select(host)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%');

        const g = svg.append('g');

        svg.call(
            d3.zoom<SVGSVGElement, unknown>()
                .scaleExtent([0.1, 4])
                .on('zoom', (event) => {
                    g.attr('transform', event.transform);
                })
        );

        const simulation = d3
            .forceSimulation(relationArray.nodes)
            .force('link', 
                d3.forceLink<NodeDatum, SimulationLinkDatum<NodeDatum>>(
                    relationArray.links
                )
                .id((d: NodeDatum) => d.id)
            )
            .force('charge', d3.forceManyBody().strength(-250))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = g
            .append('g')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .selectAll('line')
            .data(relationArray.links)
            .enter()
            .append('line')
            .attr('stroke-width', 1.5);
        
        const node = g
            .append('g')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(relationArray.nodes)
            .enter()
            .append('circle')
            .attr('r', 8)
            .attr('fill', '#4682b4');


        const labels = g
            .append('g')
            .selectAll('text')
            .data(relationArray.nodes)
            .enter()
            .append('text')
            .text(d => d.label)
            .attr('font-size', 12)
            .attr('dx', 12)
            .attr('dy', 4);

        // events
        node.call(
            d3.drag<SVGCircleElement, NodeDatum>()
                .on('start', (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on('drag', (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on('end', (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                })
        );

        simulation.on('tick', () => {
            link
                .attr('x1', d => (d.source as NodeDatum).x!)
                .attr('y1', d => (d.source as NodeDatum).y!)
                .attr('x2', d => (d.target as NodeDatum).x!)
                .attr('y2', d => (d.target as NodeDatum).y!);

            node.attr('cx', d => d.x!).attr('cy', d => d.y!);
            labels.attr('x', d => d.x!).attr('y', d => d.y!);
        });
    }

}
