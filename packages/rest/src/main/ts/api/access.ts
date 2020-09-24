import axios from 'axios'
import { TProjectAccessInfo } from '../types'

const parseGerritResponse = (data: { data: string }) =>
  JSON.parse(data.data.slice(4))

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
        url: `${baseUrl}/access/`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TProjectAccessInfo[])
    },
  }
}
