import { IGerritConstructorOpts } from './types'
import axios from 'axios'
import { normalizeName, parseGerritResponse } from './utills'

export const commitEndpoints = ({ baseUrl, auth }: IGerritConstructorOpts) => {
  return {
    commitEndpoints: {
      getCommit(repo: string, commitId: string) {
        return axios
          .get(
            `${baseUrl}/a/projects/${normalizeName(repo)}/commits/${commitId}`,
            {
              auth,
            },
          )
          .then((el) => parseGerritResponse(el))
      },
    },
  }
}
