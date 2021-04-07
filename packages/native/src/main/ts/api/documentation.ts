import axios from 'axios'

import { TDocResult } from '../typings/index'
// NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
const xssiPrefix = ")]}'"
const parseGerritResponse = (data: string) =>
  JSON.parse(data.slice(xssiPrefix.length))

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
    documentationSearchEndpoints: {
      async searchDocumentation({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/Documentation/`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TDocResult[])
      },
    },
  }
}
