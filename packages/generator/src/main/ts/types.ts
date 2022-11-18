export type TObjectType = {
  type: string
  wrapper?: string
}

export type TMethodInfo = {
  originalName: string
  methodName: string
  description: string
  method: string
  path: string
  inputs: {
    body?: TObjectType
    params?: string[][]
    args?: string[]
  }
  returnType: TObjectType
}

export type TSectionInfo = {
  titleSection: string
  methods: TMethodInfo[]
}

export type TType = Record<string, string[]>

export type TObjectTypeBucket = TObjectType[]
