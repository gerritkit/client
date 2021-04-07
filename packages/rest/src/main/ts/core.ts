import { GerritNative } from '@gerritkit/native'
import { IConstructor, IFunction, UnionToIntersection } from '@qiwi/substrate'

import { GerritKitPlugin, ReturnTypeOf } from './types'

export class Core {
  static plugins: GerritKitPlugin[] = []
  static plugin<
    S extends IConstructor<any> & { plugins: any[] },
    T extends Array<IFunction>
  >(this: S, ...newPlugins: T) {
    const currentPlugins = this.plugins
    const NewGerritKit = class extends this {
      static plugins = [
        ...currentPlugins,
        ...newPlugins.filter((plugin) => !currentPlugins.includes(plugin)),
      ]
    }

    return NewGerritKit as typeof NewGerritKit &
      IConstructor<UnionToIntersection<ReturnTypeOf<T>>>
  }

  constructor(
    baseUrl: string,
    auth: {
      username: string
      password: string
    },
  ) {
    const classConstructor = this.constructor as typeof Core
    const gerritNative = new GerritNative(baseUrl, auth)

    classConstructor.plugins.forEach((plugin) =>
      Object.assign(this, plugin(gerritNative)),
    )
  }
}
