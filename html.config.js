const path = require('path');

module.exports = {
  /* {string} The title to use for the generated HTML document */
  // title: 'SpringRoll',

  /* {string} The file to write the HTML to. Defaults to index.html.
      You can specify a subdirectory here too */
  // filename: undefined,

  /* {string} webpack require path to the template.
       Please see the docs for details */
  template: path.join(__dirname, 'templates', 'Springroll.html'),

  /* {boolean | Object | Function}
      Allows to overwrite the parameters used in the template */
  templateParameters: {
    title: 'Springroll',
    width: 640,
    height: 480
  },

  /* {boolean | string} true || 'head' || 'body' ||
    false Inject all assets into the given template or templateContent.
    When passing true or 'body' all javascript resources will be placed at the bottom of the body element.
    'head' will place the scripts in the head element */
  inject: 'body'

  // {string} Adds the given favicon path to the output HTML
  // favicon: undefined,

  /* {Object} Allows to inject meta-tags.
      E.g. meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'} */
  // meta: undefined,

  /* {boolean | Object} Pass html-minifier's options as object to minify the output */
  // minify: undefined,

  /* {boolean}
    If true then append a unique webpack compilation hash to all included scripts and CSS files.
    This is useful for cache busting */
  // hash: undefined,

  // {boolean} Emit the file only if it was changed
  // cache: true

  // {boolean} Errors details will be written into the HTML page
  // showErrors: undefined,

  // {any} Allows you to add only some chunks (e.g only the unit-test chunk)
  // chunks: undefined,

  /* {string | Function}
    Allows to control how chunks should be sorted before they are included to the HTML.
    Allowed values are 'none' | 'auto' | 'dependency' | 'manual' | {Function} */
  // chunksSortMode: undefined,

  // {string[]} Allows you to skip some chunks (e.g don't add the unit-test chunk)
  // excludeChunks: undefined,

  // {boolean} If true render the link tags as self-closing (XHTML compliant)
  // xhtml: undefined
};
