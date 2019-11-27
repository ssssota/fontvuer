module.exports = {
  "pluginOptions": {
    "electronBuilder": {
      "builderOptions": {
        // List native deps here if they don't work
        externals: ['font-manager'],
        // If you are using Yarn Workspaces, you may have multiple node_modules folders
        // List them all here so that VCP Electron Builder can find them
        nodeModulesPath: ['../../node_modules', './node_modules'],
        "publish": [
          "github"
        ]
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}