import { GerritNative } from "@gerritkit/native";

(async () => {
  const gerrit = new GerritNative("https://review.gerrithub.io", {
    username: "felipecrs",
    password: "<hidden>"
  })

  const changes = await gerrit.changeEndpoints.queryChanges({
    params: {
      q: "owner:felipecrs"
    }
  })
  changes.map(el => el)

})();
