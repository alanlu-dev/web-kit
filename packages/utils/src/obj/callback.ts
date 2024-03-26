type CallbackFunction<T extends any[]> = (...args: T) => void

function setCallback<T extends any[]>(callback: CallbackFunction<T> | undefined, fallback: CallbackFunction<T>): CallbackFunction<T> {
  return typeof callback === 'function'
    ? (...args: T) => {
        callback(...args)
        fallback(...args)
      }
    : fallback
}

export { setCallback }
