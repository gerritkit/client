import { IGerritConstructorOpts } from './types'
import axios from 'axios'
import { parseGerritResponse } from './utills'

export const commit = ({ baseUrl, auth }: IGerritConstructorOpts) => {
  return {
    commitEndpoints: {
      getCommit({
        owner,
        repo,
        commit_sha,
      }: {
        owner: string
        repo: string
        commit_sha: string
      }) {
        return axios
          .get(`${baseUrl}/a/projects/${owner}/${repo}/commits/${commit_sha}`, {
            auth,
          })
          .then((el) => parseGerritResponse(el))
      },
    },
  }
}
