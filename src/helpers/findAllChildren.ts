import { TreeItem } from "../types"
import { cache } from "./cache"

const findAllChildren = cache((items: TreeItem[], id: TreeItem["id"]) => {
    const children: TreeItem[] = []

    /**
     * Perfomance tip: the for cycle without "of" statement is the fastest way
     * to go through array. It's faster than "for (const item of array) {}" 
     * and array.map(item => {})
     */

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.parent !== id) continue

        children.push(item, ...findAllChildren(items, item.id))
    }

    return children
}, 1)

export default findAllChildren
