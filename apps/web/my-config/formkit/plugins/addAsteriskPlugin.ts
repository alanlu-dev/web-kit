import type { FormKitExtendableSchemaRoot, FormKitNode } from '@formkit/core'

export function addAsteriskPlugin(node: FormKitNode) {
  if (!node.props.definition || !node.context || node.type !== 'input') {
    return
  }

  if (['button', 'submit', 'hidden', 'group', 'list', 'meta'].includes(node.props.type)) return
  const legendOrLabel = ['checkbox', 'radio'].includes(node.props.type) ? 'legend' : 'label'
  const schemaFn = node.props.definition.schema as FormKitExtendableSchemaRoot
  if (node.props.definition.schemaMemoKey) {
    node.props.definition.schemaMemoKey += 'add_astrisks'
  }
  node.props.definition.schema = (sectionsSchema = {}) => {
    sectionsSchema[legendOrLabel] = {
      children: [
        '$label',
        {
          $el: 'span',
          if: '$state.required',
          attrs: {
            class: '$classes.asterisk',
          },
          children: ['*'],
        },
      ],
    }

    return schemaFn(sectionsSchema)
  }
}
