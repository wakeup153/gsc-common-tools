import cloneDeep from 'lodash/cloneDeep'
/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
    const data = cloneDeep(array)
    const result = []
    const hash = {}
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index]
    })
    data.forEach((item) => {
        const hashVP = hash[item[pid]]
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = [])
            const hasItem = hashVP[children].findIndex(current => current[id] === item[id])
            if (hasItem === -1) {
                hashVP[children].push(item)
            }
        } else {
            result.push(item)
        }
    })
    return result
}
/**
 * tree 转数组
 * @param array
 * @param children
 * @returns {Array}
 */
const treeToArray = (array, children = 'children') => {
    let stack = cloneDeep(array)
    const result = []
    // data.forEach((item, idex) => {
    //     if (item[children] && Array.isArray(item[children]) && item[children].length > 0) {
    //         result.push(item, ...treeToArray(item[children], children))
    //         // item[children] = undefined
    //     } else {
    //         console.log('item', item)
    //         result.push(item)
    //     }
    // })
    while (stack.length) {
        let item = stack.pop()
        result.push(item)
        const child = item[children]
        if (child && Array.isArray(child)) {
            for (let i = child.length - 1; i >= 0; i--) {
                stack.push(child[i])
            }
        }
    }
    return result
}
/**
 * @description 查找包含自身节点的父代节点
 * @param tree 需要查找的树
 * @param func 判断是否节点是否相等的函数
 * @param keyField 自定义 key 字段
 * @param isNode 是否是节点，false 为 node 节点 ； true 为 key
 * @param path 结果数组 可以不传
 * const nodes = findTreeSelect(tree, (data) => data.id === 10, 'id')
 */
function findTreeSelect (tree, func, keyField, isNode = false, path = [], children = 'children') {
    if (!tree) { return [] }
    for (const data of tree) {
        isNode ? path.push(data) : path.push(data[keyField])
        if (func(data)) { return path }
        if (data[children] && data[children].length) {
            const findChildren = findTreeSelect(data[children], func, keyField, isNode, path, children)
            if (findChildren.length) { return findChildren }
        }
        path.pop()
    }
    return []
}

export default {
    treeToArray,
    arrayToTree,
    findTreeSelect
}
