declare namespace Cypress {
  interface Chainable<Subject = any> {
    // Make the interface generic
    origin(
      origin: string,
      options: { args?: any },
      fn: (...args: any[]) => void
    ): Chainable<void>;
  }
}
