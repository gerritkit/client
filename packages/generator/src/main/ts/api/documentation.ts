import axios from 'axios'
import { TDocResult } from '../types/index'

// NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
const xssiPrefix = ")]}'"
const parseGerritResponse = (data: { data: string }) =>
  JSON.parse(data.data.slice(xssiPrefix.length))

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
    async searchDocumentation() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/Documentation/`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TDocResult[])
    },
  }
}