import { Component } from '@angular/core';
import { TreeNode, MenuItem } from 'primeng/api';
import { NodeService } from '../../../../core/services/nodeservice';
import {MessageService} from 'primeng/api';
import { ShowcaseComponent } from '../../showcase.component';

@Component({
    templateUrl: './treetablecontextmenudemo.html',
    providers: [MessageService]
})
export class TreeTableContextMenuDemo {

    files: TreeNode[];

    selectedNode: TreeNode;

    cols: any[];

    items: MenuItem[];

    constructor(private nodeService: NodeService, private messageService: MessageService, private showcase: ShowcaseComponent) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files = files);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedNode) },
            { label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggleFile(this.selectedNode) }
        ];
    }

    viewFile(node) {
        this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.data.name + ' - ' + node.data.size });
    }

    toggleFile(node) {
        node.expanded = !node.expanded;
        this.files = [...this.files];
    }

}
