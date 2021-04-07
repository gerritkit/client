import axios from 'axios'

import { TProjectAccessInfo } from '../typings/index'
// NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
const xssiPrefix = ")]}'"
const parseGerritResponse = (data: string) =>
  JSON.parse(data.slice(xssiPrefix.length))

export function accessRightsEndpoints({
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
    accessRightsEndpoints: {
      async listAccessRights({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/access/${projectName}`,
          auth,
          params,
        }).then(
          ({ data }) =>
            parseGerritResponse(data) as Record<string, TProjectAccessInfo>,
        )
      },
    },
  }
}
