import { existsSync, readdirSync, unlinkSync, rmdirSync, statSync } from 'fs';
import { join, normalize } from 'path';

const cleanDirectory = (dirPath: string) => {
  if (existsSync(dirPath)) {
    readdirSync(dirPath).forEach((eachFileName) => {
      const eachFilePath = normalize(join(dirPath, eachFileName));
      if (statSync(eachFilePath).isDirectory()) cleanDirectory(eachFilePath);
      else unlinkSync(eachFilePath);
    });
    rmdirSync(dirPath);
  }
};
cleanDirectory(normalize('./coverage'));
cleanDirectory(normalize('./dist'));
