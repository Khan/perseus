const express = require('express');
const SimpleMarkdown = require('./simple-markdown');

const app = express();
const packagejson = require('./package.json');

// Use <p> tags instead of <div class="paragraph"> for compatibility
const rules = Object.assign({}, SimpleMarkdown.defaultRules, {
  paragraph: Object.assign({}, SimpleMarkdown.defaultRules.paragraph, {
    html: (node, output, state) => {
      return SimpleMarkdown.htmlTag('p', output(node.content, state));
    },
  }),
});

const parse = SimpleMarkdown.parserFor(rules);
const output = SimpleMarkdown.outputFor(rules, 'html');

app.get('/api/babelmark', (req, res) => {
  const source = req.query.text || "please provide a \\?text= param";
  const result = output(parse(source));
  res.json({
    name: 'simple-markdown.js',
    version: packagejson.version,
    html: result
  });
});

app.listen(process.env.PORT || 3000);
