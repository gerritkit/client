import { IGerritConstructorOpts } from './types'
import axios from 'axios'
import { normalize, parseGerritResponse } from './utills'

const defaultRef = 'master'

export type TListProjectsOpts = {
  branch?: string
  description?: string
  limit?: number
  prefix?: string
  regex?: string
  skip?: string
  substring?: string
  tree?: string
  state?: string
  type?: string
}

export type TGetContentOpts = {
  owner: string
  repo: string
  path: string
  ref: string
}


export const repos = ({ baseUrl, auth }: IGerritConstructorOpts) => {
  return {
    repos: {
      listProjects({
        branch,
        description,
        limit,
        prefix,
        regex,
        skip,
        substring,
        tree,
        state,
        type,
      }: TListProjectsOpts) {
        return axios
          .get(`${baseUrl}/a/projects/`, {
            params: {
              b: branch,
              d: description,
              n: limit,
              p: prefix,
              r: regex,
              S: skip,
              m: substring,
              t: tree,
              s: state,
              type,
            },
            auth,
          })
          .then((d) => parseGerritResponse(d))
      },
      getContent({
        owner,
        repo,
        path,
        ref,
      }: TGetContentOpts) {
        return axios.get(
          `${baseUrl}/a/projects/${owner}/${repo}/branches/${
            ref || defaultRef
          }/files/${normalize(path)}/content`,
          {
            auth,
          },
        )
      },
    },
  }
}
