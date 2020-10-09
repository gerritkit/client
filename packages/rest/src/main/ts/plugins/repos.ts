import { GerritNativeInstance } from '@gerritkit/native'

export function reposPlugin(native: GerritNativeInstance) {
  return {
    repos: {
      listForOrg(data?: { org: string }) {
        return native.projectEndpoints
          .listProjects({
            params: { prefix: data?.org },
          })
          .then((data) => Object.keys(data))
      },
      async getContent({
        owner,
        repo,
        path,
        ref,
      }: {
        owner: string
        repo: string
        path: string
        ref?: string
      }) {
        const repoName = `${owner}%2F${repo}`
        const revision =
          !ref || ref === 'HEAD'
            ? (
                await native.branchEndpoints.getBranch({
                  args: { projectName: repoName, branchId: 'HEAD' },
                })
              ).revision
            : ref

        return native.branchEndpoints.getContent({
          args: {
            projectName: `${owner}%2F${repo}`,
            branchId: revision,
            fileId: path,
          },
        })
      },

      async getCommit({
        owner,
        repo,
        ref,
      }: {
        owner: string
        repo: string
        ref: string
      }) {
        const repoName = `${owner}%2F${repo}`
        const revision =
          !ref || ref === 'HEAD'
            ? (
                await native.branchEndpoints.getBranch({
                  args: {
                    projectName: repoName,
                    branchId: 'HEAD',
                  },
                })
              ).revision.replace(/\//g, '%2F')
            : ref

        return native.branchEndpoints
          .getBranch({
            args: {
              projectName: repoName,
              branchId: revision,
            },
          })

          .then((data) => {
            return native.commitEndpoints.getCommit({
              args: {
                projectName: repoName,
                commitId: data.revision,
              },
            })
          })
      },
    },
  }
}
