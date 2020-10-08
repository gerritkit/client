import { GerritNativeInstance } from '@gerritkit/native'

export function orgsPlugin(native: GerritNativeInstance) {
  return {
    orgs: {
      list() {
        return native.projectEndpoints
          .listProjects({ params: {} })
          .then((data) => Object.keys(data).map((str) => str.split('/')[0]))
          .then((data) => [...new Set(data)])
      },
    },
  }
}
