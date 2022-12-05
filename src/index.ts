import TreeStore from './TreeStore'
import { readFileSync } from 'fs'

const items = [
    { id: 1, parent: 'root' },
    { id: '2', parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: '2', type: 'test' },
    { id: 5, parent: '2', type: 'test' },
    { id: 6, parent: '2', type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
]

const ts = new TreeStore(items)

const log = console.log.bind(console, '\n')

log('getItem("2"): ', ts.getItem('2'))
log('getChildren("2"): ', ts.getChildren('2'))
log('getAllChildren("2"): ', ts.getAllChildren('2'))
log('getAllParents(4): ', ts.getAllParents(4))
