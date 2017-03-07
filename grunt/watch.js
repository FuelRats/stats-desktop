module.exports = {
  options: {
    interrupt: true,
    spawn: true
  },

  appJS: {
    files: [
      'package.json',
      'js/**/*.js'
    ],
    tasks: [
      'buildJS'
    ]
  },

  appCSS: {
    files: [
      'scss/**/*.scss',
      '!scss/_animations.scss',
      '!scss/_colors.scss',
      '!scss/_components.scss',
      '!scss/_core.scss',
      '!scss/_fonts.scss',
      '!scss/_mixins.scss',
      '!scss/_variables.scss',
      '!scss/lib.scss'
    ],
    tasks: [
      'buildAppCSS'
    ],
  },

  libCSS: {
    files: [
      'scss/lib.scss'
    ],
    tasks: [
      'buildLibCSS'
    ],
  }
}
