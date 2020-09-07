import {
  AnyFunction,
  Constructor,
  GerritKitPlugin,
  ReturnTypeOf,
  UnionToIntersection,
} from './types'

export type IListProjectsOpts = {
  branch?: string
  description?: string
  limit?: number
  prefix?: string
  regex?: string
  skip?: string
  substring?: string
  tree?: string
  state?: string
  type?: string
}

export class GerritKitCore {
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
    const classConstructor = this.constructor as typeof GerritKitCore
    classConstructor.plugins.forEach((plugin) =>
      Object.assign(this, plugin({ baseUrl, auth })),
    )
  }
}
