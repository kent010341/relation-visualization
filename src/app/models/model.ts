import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export class LinkArray {

    private readonly nodeMap: Map<string, NodeDatum>;
    readonly nodes: NodeDatum[];
    readonly links: SimulationLinkDatum<NodeDatum>[];

    constructor(relations: RawRelation[]) {
        this.nodeMap = new Map<string, NodeDatum>();
        this.links = relations.map(relation => {
            const srcNode = this.getOrCreateNode(relation.src);
            const dstNode = this.getOrCreateNode(relation.dst);
            return {
                source: srcNode,
                target: dstNode,
            };
        });
        this.nodes = Array.from(this.nodeMap.values());
    }

    private getOrCreateNode(rawNode: RawNode): NodeDatum {
        let node = this.nodeMap.get(rawNode.id);
        if (!node) {
            node = {
                id: rawNode.id,
                label: rawNode.label,
            };
            this.nodeMap.set(rawNode.id, node);
        }
        return node;
    }

}

export interface NodeDatum extends SimulationNodeDatum {
    id: string;
    label: string;
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
