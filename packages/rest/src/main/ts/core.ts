import {
  AnyFunction,
  Constructor,
  GerritKitPlugin,
  ReturnTypeOf,
  UnionToIntersection,
} from './types'

export class Core {
  static plugins: GerritKitPlugin[] = []
  static plugin<
    S extends Constructor<any> & { plugins: any[] },
    T extends Array<AnyFunction>
  >(this: S, ...newPlugins: T) {
    const currentPlugins = this.plugins
    const NewGerritKit = class extends this {
      static plugins = currentPlugins.concat(
        newPlugins.filter((plugin) => !currentPlugins.includes(plugin)),
      )
    }

    return NewGerritKit as typeof NewGerritKit &
      Constructor<UnionToIntersection<ReturnTypeOf<T>>>
  }

  constructor(
    baseUrl: string,
    auth: {
      username: string
      password: string
    },
  ) {
    const classConstructor = this.constructor as typeof Core
    classConstructor.plugins.forEach((plugin) =>
      Object.assign(this, plugin({ baseUrl, auth })),
    )
  }
}
