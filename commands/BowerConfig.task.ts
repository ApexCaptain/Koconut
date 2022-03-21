import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { normalize, join } from 'path';
const rootPath = normalize(`${__dirname}/../`);
const bowerJsonPath = join(rootPath, 'bower.json');
const includedFiles = ['webpack', 'bower.json', 'LICENSE', 'README.md'];
const configBower = () => {
  const bowerConfig = JSON.parse(readFileSync(bowerJsonPath, 'utf-8'));
  const packageInfo = (({
    name,
    description,
    keywords,
    homepage,
    license,
  }) => ({
    name,
    description,
    keywords,
    homepage,
    license,
  }))(JSON.parse(readFileSync(join(rootPath, 'package.json'), 'utf-8')));
  Object.assign(bowerConfig, packageInfo);
  const ignoredFiles = readdirSync(rootPath).filter(
    (eachFileName) => !includedFiles.includes(eachFileName),
  );
  bowerConfig.ignore = ignoredFiles;
  writeFileSync(bowerJsonPath, JSON.stringify(bowerConfig, null, 2));
};
configBower();
