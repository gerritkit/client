import { IGerritConstructorOpts } from './types'
import axios from 'axios'
import { parseGerritResponse } from './utills'
import { IListProjectsOpts } from './gerritKitCore'

export const projectsEndpoints = ({
  baseUrl,
  auth,
}: IGerritConstructorOpts) => {
  return {
    projectsEndpoints: {
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
      }: IListProjectsOpts) {
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
    },
  }
}
