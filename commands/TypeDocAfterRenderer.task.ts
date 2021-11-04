import { join, normalize } from "path";
import { appendFileSync, writeFileSync } from "fs";

const rootPath = normalize(`${__dirname}/../`);

const setNoJekyll = () => {
  const nojekyllPath = join(rootPath, "docs", ".nojekyll");
  writeFileSync(nojekyllPath, "");
};

const setTsdGeneratorCssInvisible = () => {
  const mainStyleSheetPath = join(rootPath, "docs", "assets", "style.css");
  appendFileSync(
    mainStyleSheetPath,
    `
        .tsd-generator {
            display: none;
        }
    `
  );
};

const typeDocAfterRendering = () => {
  setNoJekyll();
  setTsdGeneratorCssInvisible();
};

typeDocAfterRendering();
