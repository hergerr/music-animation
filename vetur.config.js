/** @type {import('vls').VeturConfig} */
module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true,
    "vetur.validation.interpolation": false,
  },
  projects: [
    "./challenge-vue",
    {
      root: "./challenge-vue",
      package: "./challenge-vue",
      tsconfig: "./challenge-vue",
    },
  ],
};
