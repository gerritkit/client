import axios from 'axios'
import { TProjectAccessInfo } from '../types/index'
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
    async listAccessRights({
      args: { projectName },
    }: {
      args: { projectName: string }
    }) {
      return axios({
        method: 'GET',
        url: `${baseUrl}/access/${projectName}`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TProjectAccessInfo[])
    },
  }
}
