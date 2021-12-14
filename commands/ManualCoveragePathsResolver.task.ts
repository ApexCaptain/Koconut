import {
  existsSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  statSync,
} from 'fs';
import { join, normalize } from 'path';

const resolvePath = (dirPath: string) => {
  if (existsSync(dirPath)) {
    readdirSync(dirPath).forEach((eachFileName) => {
      const eachFilePath = normalize(join(dirPath, eachFileName));
      if (statSync(eachFilePath).isDirectory()) resolvePath(eachFilePath);
      else {
        writeFileSync(
          eachFilePath,
          readFileSync(eachFilePath, 'utf-8').replaceAll(
            '../src',
            '../../dist',
          ),
          'utf-8',
        );
      }
    });
  }
};
resolvePath(normalize('./coverage'));
