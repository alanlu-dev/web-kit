import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    formkit: {
      'form': toLine(
        {
          '': cls`
            $fk-max-width-input:100%
            $fk-font-size-option:1em
            $fk-margin-outer:0
            $fk-padding-input:0.75rem
          `,
          '_*': cls`font:sans`,
        },
        { scope: '#mcss' },
      ),
      'prefix-icon': {
        '': toLine(
          {
            '': cls`bg:unset shadow:none`,
          },
          { scope: '#mcss' },
        ),
      },
      'wrapper': {
        '': toLine({
          '[data-type="checkbox"]_': `ai:flex-start! max-w:unset`,
        }),
      },
      'inner': {
        '': toLine(
          {
            ':focus-within': `$fk-border-box-shadow-focus:0|0|0|$(fk-border-width-focus)|grey`,
          },
          { scope: '#mcss' },
        ),
      },
      'decorator': {
        '': toLine(
          {
            '[data-type="checkbox"]_': `r:1x avatar-xs bg:unset b:1|solid|G-30 shadow:none`,
            '[data-type="checkbox"]_.formkit-input:focus~': `outline:theme`,
            '[data-type="checkbox"]_.formkit-input:checked:focus~': `outline:0`,
            '[data-type="checkbox"]_.formkit-input:checked~': `bg:theme {fg:theme-fg}>.formkit-decorator-icon`,
          },
          { scope: '#mcss' },
        ),
      },
    },
  },
}
