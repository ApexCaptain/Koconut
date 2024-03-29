import { writeFileSync } from 'fs';
import { validateDeprecatedMethod } from './DepreactedMethodValidator.task';
import { normalize, join } from 'path';
import {
  readPromisifiedText,
  runPromisifiedCommand,
} from './CommandShell.task';

const versionStringReg = /\d+.\d+.\d+/;
const rootPath = normalize(`${__dirname}/../`);
const packageJsonPath = join(rootPath, 'package.json');
const getVersion = (): string => {
  return require(packageJsonPath).version;
};

const generateDefaultNextVersion = (): string => {
  const defaultNextVersion = getVersion()
    .split('.')
    .map((eachStringNum) => parseInt(eachStringNum));
  defaultNextVersion[defaultNextVersion.length - 1]++;
  for (
    let reversedIndex = defaultNextVersion.length - 1;
    reversedIndex >= 1;
    reversedIndex--
  ) {
    if (defaultNextVersion[reversedIndex] == 100) {
      defaultNextVersion[reversedIndex] = 0;
      defaultNextVersion[reversedIndex - 1]++;
    }
  }
  return defaultNextVersion
    .map((eachNumber) => eachNumber.toString())
    .join('.');
};

const checkIsNewVersionCodeValid = (newVersionCode: string) => {
  if (versionStringReg.test(newVersionCode)) {
    const prevVersionIntArray = getVersion()
      .split('.')
      .map((eachCharacter) => parseInt(eachCharacter));
    const newVersionIntArray = newVersionCode
      .split('.')
      .map((eachCharacter) => parseInt(eachCharacter));
    for (const index in prevVersionIntArray) {
      if (prevVersionIntArray[index] > newVersionIntArray[index]) break;
      else if (prevVersionIntArray[index] == newVersionIntArray[index])
        continue;
      else return true;
    }
    console.warn(
      `It should be higher than current current version; ${getVersion()}`,
    );
  } else
    console.warn(
      `Invalid version code. It should be matched with regular expression : ${versionStringReg}`,
    );
  return false;
};

const distribute = async () => {
  try {
    let newVersionCode: string;
    while (true) {
      newVersionCode = await readPromisifiedText(
        `\nCurrent Version : ${getVersion()}\nPlease, type the version string of new package (Default : ${generateDefaultNextVersion()}) : `,
      );
      if (newVersionCode === '') newVersionCode = generateDefaultNextVersion();
      const isNewVersionCodeValid = checkIsNewVersionCodeValid(newVersionCode);
      if (isNewVersionCodeValid) break;
    }

    if (!(await validateDeprecatedMethod(newVersionCode))) {
      console.log(
        `Cannot distribute the package. Not all deprecated method is valid in version of ${newVersionCode}`,
      );
      process.exit(0);
    }

    const packageToBeChanged = require('../package.json');
    packageToBeChanged.version = newVersionCode;
    console.log(`\n-- Check your new package info --\n`);
    console.log(packageToBeChanged);
    while (true) {
      const answer = (
        await readPromisifiedText(
          `\nWould you like to proceed version for ${newVersionCode}? (Y/N) : `,
        )
      ).toUpperCase();
      if (answer == 'Y' || answer == 'YES') break;
      else if (answer == 'N' || answer == 'NO') process.exit();
    }

    console.log(`\nUpdating version...`);
    writeFileSync(packageJsonPath, JSON.stringify(packageToBeChanged, null, 2));
    console.log('Package version overridden');

    const defaultMessage = `New version released : ${newVersionCode}`;
    let commitMessage = await readPromisifiedText(
      `\nGit Commit Message (Default : ${defaultMessage}) : `,
    );
    if (!commitMessage) commitMessage = defaultMessage;
    await runPromisifiedCommand('git add -A', false);
    await runPromisifiedCommand(`git commit -m "${commitMessage}"`);
    await runPromisifiedCommand(`git tag "${newVersionCode}"`);
    await runPromisifiedCommand('git push origin master --tags');
    console.log(
      `CI/CD Process Started : https://github.com/ApexCaptain/Koconut/actions/workflows/pipeline.yml`,
    );
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
distribute();
