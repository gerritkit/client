export const normalizeName = (name: string) => name.split('/').join('%2F')
export const parseGerritResponse = (data: { data: string }) =>
  JSON.parse(data.data.slice(4))
