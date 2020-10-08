import { GerritNativeInstance } from '@gerritkit/native'
type TGetCommitInput = { owner: string; repo: string; commit_sha: string }

export function gitPlugin(native: GerritNativeInstance) {
  return {
    git: {
      getCommit({ owner, repo, commit_sha }: TGetCommitInput) {
        return native.commitEndpoints.getCommit({
          args: {
            projectName: `${owner}%2F${repo}`,
            commitId: commit_sha,
          },
        })
      },
    },
  }
}
