/** @type {import('@master/css').Config} */
export default {
  semantics: {
    'nowrap': { 'white-space': 'nowrap' },
    'ellipsis': { 'text-overflow': 'ellipsis', 'white-space': 'nowrap', 'overflow': 'hidden' },
    'pointer': { 'cursor': 'pointer', 'user-select': 'none' },
    'abs-full': {
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    },
    'abs-center': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    'abs-center-y': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    'abs-center-x': {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
}
