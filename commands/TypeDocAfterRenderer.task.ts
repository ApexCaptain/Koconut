/* eslint-disable spellcheck/spell-checker */
import { join, normalize } from 'path';
import { appendFileSync, writeFileSync, readFileSync } from 'fs';

const rootPath = normalize(`${__dirname}/../`);

const setNoJekyll = () => {
  const nojekyllPath = join(rootPath, 'docs', '.nojekyll');
  writeFileSync(nojekyllPath, '');
};

const setTsdGeneratorCssInvisible = () => {
  const mainStyleSheetPath = join(rootPath, 'docs', 'assets', 'style.css');
  appendFileSync(
    mainStyleSheetPath,
    `
        .tsd-generator {
            display: none;
        }
    `,
  );
};

const addCoveragePageLink = () => {
  const indexPath = join(rootPath, 'docs', 'index.html');
  const data = readFileSync(indexPath).toString().split('\n');
  data.splice(
    1,
    0,
    `<a href="coverage/index.html" id="koconut-coverage" style="text-decoration: none;"><h1><img style = "width: 1.5rem; margin-right: 10px; vertical-align: middle;" src="coverage/favicon.png">Test Coverage</h1></a><br><hr>`,
  );
  const text = data.join('\n');
  writeFileSync(indexPath, text, 'utf-8');
};

const typeDocAfterRendering = () => {
  setNoJekyll();
  setTsdGeneratorCssInvisible();
  addCoveragePageLink();
};

typeDocAfterRendering();
