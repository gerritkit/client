import { GerritNativeInstance } from '@gerritkit/native'

export function reposPlugin(native: GerritNativeInstance) {
  return {
    repos: {
      listForOrg({ org }: { org: string }) {
        return native.projectEndpoints
          .listProjects({
            params: { prefix: org },
          })
          .then((data) => Object.keys(data))
      },
      getCommit({
        owner,
        repo,
        ref,
      }: {
        owner: string
        repo: string
        ref: string
      }) {
        return native.commitEndpoints.getCommit({
          args: { projectName: `${owner}%2F${repo}`, commitId: ref },
        })
      },
      getContent({
        owner,
        repo,
        path,
        ref,
      }: {
        owner: string
        repo: string
        path: string
        ref: string
      }) {
        return native.branchEndpoints.getContent({
          args: {
            projectName: `${owner}%2F${repo}`,
            branchId: ref || 'HEAD',
            fileId: path,
          },
        })
      },
    },
  }
}
