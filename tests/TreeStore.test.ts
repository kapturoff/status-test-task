import TreeStore from '../src/TreeStore'

describe('TreeStore class', () => {
    const sample = [
        { id: 1, parent: 'root' },
        { id: '2', parent: 1, type: 'test' },
        { id: 3, parent: 1, type: 'test' },

        { id: 4, parent: '2', type: 'test' },
        { id: 5, parent: '2', type: 'test' },
        { id: 6, parent: '2', type: 'test' },

        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
        { id: 9, parent: 8, type: null },
    ]

    const store = new TreeStore(sample)

    it('Class initialization', () => {
        expect(store).toHaveProperty('getAll')
        expect(store).toHaveProperty('getItem')
        expect(store).toHaveProperty('getChildren')
        expect(store).toHaveProperty('getAllChildren')
        expect(store).toHaveProperty('getAllParents')
    })

    // -------------- //

    it('TreeStore.getItem() with existing IDs', () => {
        expect(store.getItem(1)).toStrictEqual({ id: 1, parent: 'root' })

        expect(store.getItem('2')).toStrictEqual({
            id: '2',
            parent: 1,
            type: 'test',
        })
    })

    it('TreeStore.getItem() with invalid IDs', () => {
        expect(store.getItem(9999)).toBe(undefined)
    })

    // -------------- //

    it('TreeStore.getChildren() with existing IDs', () => {
        expect(store.getChildren(1)).toStrictEqual([
            { id: '2', parent: 1, type: 'test' },
            { id: 3, parent: 1, type: 'test' },
        ])

        expect(store.getChildren('2')).toStrictEqual([
            { id: 4, parent: '2', type: 'test' },
            { id: 5, parent: '2', type: 'test' },
            { id: 6, parent: '2', type: 'test' },
        ])
    })

    it('TreeStore.getChildren() with invalid ID', () => {
        expect(store.getChildren(9999)).toStrictEqual([])
    })

    // -------------- //

    it('TreeStore.getAllChildren() on the root item', () => {
        const result = store.getAllChildren(1)

        sample.slice(1).map((item) => expect(result).toContainEqual(item))
    })

    it('TreeStore.getAllChildren() on the non-root item', () => {
        const result = store.getAllChildren(4)

        sample.slice(6).map((item) => expect(result).toContainEqual(item))
    })

    it('TreeStore.getAllChildren() with invalid ID', () => {
        expect(store.getAllChildren(9999)).toStrictEqual([])
    })

    // -------------- //

    it('TreeStore.getAllParents() with on the root item', () => {
        expect(store.getAllParents(1)).toStrictEqual([sample[0]])
    })

    it('TreeStore.getAllParents() on the non-root item', () => {
        expect(store.getAllParents(4)).toStrictEqual([
            { id: 4, parent: '2', type: 'test' },
            { id: '2', parent: 1, type: 'test' },
            { id: 1, parent: 'root' },
        ])
    })

    it('TreeStore.getAllParents() with invalid ID', () => {
        expect(store.getAllParents(9999)).toStrictEqual([])
    })
})
