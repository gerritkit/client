import { IGerritConstructorOpts } from './types'
import axios from 'axios'
import { normalizeName, parseGerritResponse } from './utills'

export const branchEndpoints = ({ baseUrl, auth }: IGerritConstructorOpts) => {
  return {
    branchEndpoints: {
      getContent(repo: string, branch: string, file: string) {
        return axios.get(
          `${baseUrl}/a/projects/${normalizeName(
            repo,
          )}/branches/${branch}/files/${file}/content`,
          {
            auth,
          },
        )
      },

      getBranch(repo: string, branch: string) {
        return axios
          .get(
            `${baseUrl}/a/projects/${normalizeName(repo)}/branches/${branch}`,
            {
              auth,
            },
          )
          .then((d) => parseGerritResponse(d))
      },
    },
  }
}
