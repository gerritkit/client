import axios from 'axios'

const normalizeName = (name: string) => name.split('/').join('%2F')
const parsegerrit = (data: { data: string }) => JSON.parse(data.data.slice(4))

type IListProjectsOpts = {
  branch?: string,
  description?: string,
  limit?: number,
  prefix?: string,
  regex?: string,
  skip?: string,
  substring?: string,
  tree?: string,
  state?: string,
  type?: string
}

type IGerritConstructorOpts = {
  baseUrl: string
  auth?: {
    username: string,
    password: string
  }
}

export const projectsEndpoints = ({baseUrl, auth}: IGerritConstructorOpts) => {
  return {
    listProjects({branch, description, limit, prefix, regex, skip, substring, tree, state, type}: IListProjectsOpts) {
      return axios.get(`${baseUrl}/a/projects/`, {
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
      }).then(d => parsegerrit(d))
    },
  }
}
export const branchEndpoints = ({baseUrl, auth}: IGerritConstructorOpts) => {
  return {
    getContent(repo: string, branch: string, file: string) {
      return axios.get(`${baseUrl}/a/projects/${normalizeName(repo)}/branches/${branch}/files/${file}/content`, {
        withCredentials: true,
        auth,
      })
    },

    getBranch(repo: string, branch: string) {
      return axios.get(`${baseUrl}/a/projects/${normalizeName(repo)}/branches/${branch}`, {
        withCredentials: true,
        auth,
      }).then(d => parsegerrit(d))
    },
  }
}
export const commitEndpoints = ({baseUrl, auth}: IGerritConstructorOpts) => {
  return {
    getCommit(repo: string, commitId: string) {
      return axios.get(`${baseUrl}/a/projects/${normalizeName(repo)}/commits/${commitId}`, {
        withCredentials: true,
        auth,
      }).then(el => parsegerrit(el))
    },
  }
}

export class GerritKit {

  constructor(baseUrl: string, auth: {
    username: string,
    password: string
  }) {
    const plugins = [projectsEndpoints, branchEndpoints, commitEndpoints]
    plugins.forEach(plugin => Object.assign(this, plugin({baseUrl, auth})))
  }

}
