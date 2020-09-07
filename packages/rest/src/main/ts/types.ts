export type AnyFunction = (...args: any) => any

export type GerritKitPlugin = (
  options: IGerritConstructorOpts,
) => { [key: string]: any } | void

export type Constructor<T> = new (...args: any[]) => T

export type UnionToIntersection<Union> = (
  Union extends any ? (argument: Union) => void : never
) extends (argument: infer Intersection) => void
  ? Intersection
  : never

export type ReturnTypeOf<
  T extends AnyFunction | AnyFunction[]
> = T extends AnyFunction
  ? ReturnType<T>
  : T extends AnyFunction[]
  ? UnionToIntersection<ReturnType<T[number]>>
  : never

export type IGerritConstructorOpts = {
  baseUrl: string
  auth?: {
    username: string
    password: string
  }
}
