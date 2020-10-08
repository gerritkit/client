export type TMethodInfo = {
  originalName: string
  isUnsupported: boolean
  methodName?: string
  bodyType?: {
    wrapper?: string
    type: string
  }
  returnType?: {
    wrapper?: string
    type: string
  }
  opts?: string[][]
  method?: string
  args?: string[]
  path?: string
}
