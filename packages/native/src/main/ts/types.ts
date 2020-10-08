import { IFunction, UnionToIntersection } from '@qiwi/substrate'

export type IGerritConstructorOpts = {
  baseUrl: string
  auth?: {
    username: string
    password: string
  }
}

export type GerritKitPlugin = (
  options: IGerritConstructorOpts,
) => { [key: string]: any } | void

export type ReturnTypeOf<
  T extends IFunction | IFunction[]
> = T extends IFunction
  ? ReturnType<T>
  : T extends IFunction[]
  ? UnionToIntersection<ReturnType<T[number]>>
  : never

