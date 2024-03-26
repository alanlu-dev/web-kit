const baseColors = {
  W: { 50: '#FFFFFF' },
  B: { 60: '#1E1E1E', 50: '#1D1D1D', 40: '#252525', 30: '#333333', 20: '#444444' },
  G: { 50: '#999999', 40: '#B2B2B2', 30: '#CBCBCB', 20: '#F2F2F2', 10: '#F8F8F8' },
  Y: { 50: '#FBC700', 20: '#FFECA0' },
}

/** @type {import('@master/css').Config['variables']} */
export default {
  ...baseColors,
  'success': { '': '#5DB75C' },
  'waring': { '': '#D9730D', '@dark': '#FFA344' },
  'danger': { '': '#FB4E4E', '@dark': '#FF7369' },
  'error': { '': '#FB4E4E', '@dark': '#FF7369' },
  'info': { '': '#2F80ED' },
  'link': { '': '#2F80ED', '@dark': '#529CCA' },
  'message': { '': '$(B-60)/.75' },
  'message-fg': { '': '$(W-50)' },
  'theme': { '': '$(B-30)', '@dark': '$(W-50)' },
  'theme-fg': { '': `$(W-50)`, '@dark': '$(B-30)' },
  'base': {
    'fg': { '': `$(B-30)`, '@dark': '$(W-50)' },
    'bg': { '': `$(W-50)`, '@dark': '$(B-30)' },
    'bg-box': { '': `$(W-50)`, '@dark': '$(B-30)' },
    'bg-btn': { '': `$(W-50)`, '@dark': '$(B-30)' },
  },
}
