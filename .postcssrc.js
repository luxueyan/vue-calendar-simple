// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  parser: 'sugarss',
  map: 'inline',
  plugins: {
    // to edit target browsers: use 'browserlist' field in package.json
    // 'autoprefixer': {},
    'postcss-salad': {
      browsers: [
        '> 1%',
        'last 5 versions',
        'not ie <= 8'
      ],
      features: {
        bem: {
          shortcuts: {
            component: 'b',
            modifier: 'm',
            descendent: 'e'
          },
          separators: {
            descendent: '__',
            modifier: '--'
          }
        },
        inlineSvg: {
          path: 'src/svgs'
        }
      }
    }
  }
}
