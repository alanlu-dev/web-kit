/** @type {import('@master/css').Config} */
export default {
  utilities: {
    spin: {
      animation: '1s linear infinite rotate',
    },
  },
  animations: {
    shimmer: { to: { transform: 'translateX(100%)' } },
    skeletonWave: { from: { 'background-position': '200% 0' }, to: { 'background-position': '-200% 0' } },
    rollIn: { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(0)' } },
  },
}
