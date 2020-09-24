import axios from 'axios'
const parseGerritResponse = (data: { data: string }) =>
  JSON.parse(data.data.slice(4))

export function documentationSearchEndpoints({
  baseUrl,
  auth,
}: {
  baseUrl: string
  auth: {
    username: string
    password: string
  }
}) {
  return {
    async searchDocumentation({}: {}) {
      return axios({
        method: 'GET',
        url: `${baseUrl}/Documentation/`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data))
    },
  }
}
