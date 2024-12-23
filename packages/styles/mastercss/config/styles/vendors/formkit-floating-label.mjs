import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    formkit: {
      label: {
        '-floating': cls`f:xs top:0 left:calc($(fk-padding-input)-2x) bg:base-bg px:2 transition-duration:.25s transition-delay:0s`,
        '': toLine(
          {
            '[data-floating-label="true"]_': cls`abs-center-y fg:G-40 left:$(fk-padding-input) font-weight:normal p:0 ~all|.2s|ease-out|.1s`,
            '[data-floating-label="true"]:not([data-empty="true"])_': cls`formkit-label--floating`,
            '[data-floating-label="true"]_input:focus~': cls`formkit-label--floating`,
            '[data-floating-label="true"]_textarea:focus~': cls`formkit-label--floating`,
            '[data-floating-label="true"][data-expanded="true"]_': cls`formkit-label--floating`,
          },
          { scope: '#mcss' },
        ),
      },
    },
  },
}
