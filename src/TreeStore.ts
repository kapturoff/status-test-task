import findAllChildren from './helpers/findAllChildren'
import findAllParents from './helpers/findAllParents'
import { TreeItem } from './types'

export default class TreeStore {
    private cache = {
        getItem: new Map<TreeItem['id'], TreeItem>(),
        getChildren: new Map<TreeItem['id'], TreeItem[]>(),
        getAllChildren: new Map<TreeItem['id'], TreeItem[]>(),
        getAllParents: new Map<TreeItem['id'], TreeItem[]>(),
    } as const

    constructor(private items: TreeItem[]) {
        this.precalculate()
    }

    /**
     * Simple method that precalculates all output of this class methods,
     * so there will be the O(1) complexity of getting item from the store
     * in the runtime.
     *
     * I found this idea interesting and better than just caching, because,
     * as it was said in the technical specification, **this class does not
     * provide any insert functionality**, so my implementation may not worry
     * about the complexity of inserting
     */
    private precalculate(): void {
        for (const item of this.items) {
            // Caches .getItem() method of the class

            this.cache.getItem.set(item.id, item)

            // Caches all children of the item for the .getChildren() method

            const children: TreeItem[] = this.items.filter(
                ({ parent }) => parent === item.id
            )
            this.cache.getChildren.set(item.id, children)

            // Caches all nested children of the item for the .getAllChildren() method

            const allChildren: TreeItem[] = findAllChildren(this.items, item.id)
            this.cache.getAllChildren.set(item.id, [...allChildren])

            // Caches all parents of the item for the .getAllParents() method

            const allParents: TreeItem[] = findAllParents(this.items, item.id)
            this.cache.getAllParents.set(item.id, [...allParents])
        }
    }

    public getAll(): TreeItem[] {
        return this.items
    }

    public getItem(id: TreeItem['id']): TreeItem {
        return this.cache.getItem.get(id)
    }

    public getChildren(id: TreeItem['id']): TreeItem[] {
        return this.cache.getChildren.get(id) || []
    }

    public getAllChildren(id: TreeItem['id']): TreeItem[] {
        return this.cache.getAllChildren.get(id) || []
    }

    public getAllParents(id: TreeItem['id']): TreeItem[] {
        return this.cache.getAllParents.get(id) || []
    }
}
