export const lottieDefaultOptions = (animationData: JSON, loop: boolean = true, autoplay: boolean = true) => ({
  loop,
  autoplay,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
})
