export const signupPasswordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&/]?)[A-Za-z\d@.#$!%*?&/]{8,15}$/

export const emailRegex: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
