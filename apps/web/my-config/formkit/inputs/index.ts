import type { FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'
import { $attrs, buttonInput, buttonLabel, help, icon, inner, label, message, messages, outer, prefix, textInput, wrapper } from '@formkit/inputs'

import OneTimePassword from './OneTimePassword.vue'

const textWithBtn: FormKitTypeDefinition = {
  schema: outer(
    wrapper(
      label('$label'),
      inner(
        icon('prefix', 'label'),
        prefix(),
        textInput(),
        icon('suffix'),
        $attrs(
          {
            type: 'button',
            class: `hidden:empty btn btn-type--flat r:0! px:6x! py:3x! rel {abs-center-y;left:0;content:'';bl:1|G-30;h:70%}::after`,
            onClick: '$handlers.btnClick()',
          },
          buttonInput(buttonLabel(`$btnTextNew || $btnText || ''`)),
        ),
      ),
    ),
    help('$help'),
    messages(message('$message.value')),
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'text',
  /**
   * An array of extra props to accept for this input.
   */
  props: ['btnText', 'btnTextNew', 'onBtnClick'],
  /**
   * Additional features that should be added to your input
   */
  features: [
    (node) => {
      // 參考 https://github.com/formkit/formkit/blob/master/packages/themes/src/index.ts
      node.on('created', () => {
        if (node?.context?.handlers) {
          node.context.handlers.btnClick = (): ((e: MouseEvent) => void) | void => {
            const handlerFunction = node.props.onBtnClick
            if (handlerFunction && typeof handlerFunction === 'function') {
              return (e: MouseEvent) => {
                return handlerFunction(node, e)
              }
            }
            return undefined
          }
        }
      })
    },
  ],
}

export default {
  otp: createInput(OneTimePassword, { props: ['digits'] }),
  textWithBtn,
}
