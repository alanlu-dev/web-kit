import type { FormKitNode } from '@formkit/core'
import { createNode } from '@formkit/core'

// https://github.com/formkit/formkit/issues/373#issuecomment-1256156572
/**
 * Experimental plugin that allows nesting inputs by
 * using dot notation of the name.
 */
export function babushkaPlugin(node: FormKitNode) {
  if (node.name.includes('.')) {
    const address = node.name.split('.')
    node._c.name = address.pop() as string
    const parentAddress = address.reduce((currentAddress, parentName, _i) => {
      const parent = node.at(currentAddress)
      if (!parent && currentAddress === '$root') {
        throw new Error('Dot-notation names bust be children of a form or group')
      }
      else if (!parent) {
        throw new Error('This shouldn’t happen')
      }
      else {
        createNode({ name: parentName, parent, type: 'group', props: { type: 'group' } })
      }
      return `${currentAddress}.${parentName}`
    }, '$root')
    const parentNode = node.at(parentAddress)
    if (parentNode) {
      parentNode.add(node)
    }
  }
}
