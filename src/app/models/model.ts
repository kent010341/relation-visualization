import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export class LinkArray {

    private readonly nodeMap: Map<string, NodeDatum>;
    readonly nodes: NodeDatum[];
    readonly links: LinkDatum<NodeDatum>[];

    constructor(relations: RawRelation[]) {
        this.nodeMap = new Map<string, NodeDatum>();
        this.links = relations.map(relation => {
            const srcNode = this.getOrCreateNode(relation.src);
            const dstNode = this.getOrCreateNode(relation.dst);
            return new LinkDatum<NodeDatum>(srcNode, dstNode, relation.relation);
        });
        this.nodes = Array.from(this.nodeMap.values());
    }

    private getOrCreateNode(rawNode: RawNode): NodeDatum {
        let node = this.nodeMap.get(rawNode.id);
        if (!node) {
            node = new NodeDatum(rawNode.id, rawNode.label);
            this.nodeMap.set(rawNode.id, node);
        }
        return node;
    }

}

export class NodeDatum implements SimulationNodeDatum {

    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    index?: number;

    id: string;
    label: string;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

}

export class LinkDatum<T extends SimulationNodeDatum> implements SimulationLinkDatum<T> {
    source: T | string | number;
    target: T | string | number;
    index?: number | undefined;
    label: string;

    constructor(source: T | string | number, target: T | string | number, label: string) {
        this.source = source;
        this.target = target;
        this.label = label;
    }
}

export interface RawRelation {

    src: RawNode;
    dst: RawNode;
    relation: string;

}

export interface RawNode {

    id: string;
    label: string;

}

export interface RelationParserKey {

    srcId: string[];
    srcLabel: string[];
    dstId: string[];
    dstLabel: string[];
    relationLabel: string[];

}
