const cssnano  = require('cssnano')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // cssnano({
    //   preset: 'default'
    // }),
    // purgecss({
    //   content: ['../../app/views/Home/*.php','../js/*.js'],
    //   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    // })
  ]
}