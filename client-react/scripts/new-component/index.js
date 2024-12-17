#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

import { program } from 'commander';

import {
  getConfig,
  buildPrettifier,
  createParentDirectoryIfNecessary,
  logIntro,
  logItemCompletion,
  logConclusion,
  logError,
} from './helpers.js';
import {
  requireOptional,
  mkDirPromise,
  readFilePromiseRelative,
  writeFilePromise,
} from './utils.js';

// Get the default config for this component (looks for local/global overrides,
// falls back to sensible defaults).
const config = getConfig();

// Convenience wrapper around Prettier, so that config doesn't have to be
// passed every time.
const prettify = buildPrettifier(config.prettierConfig);

program
  .version('1.0.0')
  .arguments('<componentName>')
  .option(
    '-l, --lang <language>',
    'Which language to use (default: "js")',
    /^(js|ts)$/i,
    config.lang
  )
  .option(
    '-d, --dir <pathToDirectory>',
    'Path to the "components" directory (default: "src/components")',
    config.dir
  )
  .parse(process.argv);

const [componentName] = program.args;

const options = program.opts();

const fileExtension = options.lang === 'js' ? 'jsx' : 'tsx';
const indexExtension = options.lang === 'js' ? 'js' : 'ts';

// Find the path to the selected template file.
const templatePath = `./templates/${options.lang}.js`;
const cssTemplatePath = `./templates/stylesheet.css`;

// Get all of our file paths worked out, for the user's project.
const componentDir = `${options.dir}/${componentName}`;
const filePath = `${componentDir}/${componentName}.${fileExtension}`;
const cssFilePath = `${componentDir}/${componentName}.module.css`;
const indexPath = `${componentDir}/index.${indexExtension}`;

// Our index template is super straightforward, so we'll just inline it for now.
const indexTemplate = prettify(`\
export * from './${componentName}';
export { default } from './${componentName}';
`);

logIntro({
  name: componentName,
  dir: componentDir,
  lang: options.lang,
});

// Check if componentName is provided
if (!componentName) {
  logError(
    `Sorry, you need to specify a name for your component like this: new-component <name>`
  );
  process.exit(0);
}

// Check to see if the parent directory exists.
// Create it if not
createParentDirectoryIfNecessary(options.dir);

// Check to see if this component has already been created
const fullPathToComponentDir = path.resolve(componentDir);
if (fs.existsSync(fullPathToComponentDir)) {
  logError(
    `Looks like this component already exists! There's already a component at ${componentDir}.\nPlease delete this directory and try again.`
  );
  process.exit(0);
}

// Start by creating the directory that our component lives in.
mkDirPromise(componentDir)
  .then(() => readFilePromiseRelative(templatePath))
  .then((template) => {
    logItemCompletion('Directory created.');
    return template;
  })
  .then((template) => {
    // Replace our placeholders with real data (so far, just the component name)
    return prettify(template.replace(/COMPONENT_NAME/g, componentName).replace(/STYLESHEET/g, componentName));
  })
  .then((template) =>
    // Format it using prettier, to ensure style consistency, and write to file.
    writeFilePromise(filePath, template)
  )
  .then((template) => {
    logItemCompletion('Component built and saved to disk.');
    return template;
  })
  .then(async (template) =>
    // We also need the `index.js` file, which allows easy importing.
    writeFilePromise(indexPath, await indexTemplate)
  )
  .then(() => readFilePromiseRelative(cssTemplatePath))
  .then((template) =>
    // We also need the `stylesheet.css` file, which allows easy importing.
    writeFilePromise(cssFilePath, template)
  )
  .then((template) => {
    logItemCompletion('Index file built and saved to disk.');
    return template;
  })
  .then((template) => {
    logConclusion();
  })
  .catch((err) => {
    console.error(err);
  });