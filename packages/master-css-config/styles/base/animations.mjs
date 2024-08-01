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
    fadeInUp: { from: { opacity: 0, transform: 'translate3d(0,100%,0)' }, to: { opacity: 1, transform: 'translateZ(0)' } },
    fadeInUpBig: { from: { opacity: 0, transform: 'translate3d(0,2000px,0)' }, to: { opacity: 1, transform: 'translateZ(0)' } },
  },
}
