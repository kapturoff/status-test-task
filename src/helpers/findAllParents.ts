import { TreeItem } from "../types"
import { cache } from "./cache"

const findAllParents = cache((items: TreeItem[], id: TreeItem["id"]) => {
    const item: TreeItem = items.find((item) => item.id === id)
    if (item.parent === "root") return [item]

    return [item, ...findAllParents(items, item.parent)]
}, 1)

export default findAllParents
