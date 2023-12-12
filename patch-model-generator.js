/* eslint-disable @typescript-eslint/no-var-requires */
const FS = require('fs');

console.group('Start model generator manual patches');
const genPath = './src/_models/prisma-class';

const files = FS.readdirSync(genPath);

for (const file of files) {
  const filePath = `${genPath}/${file}`;
  const fileContent = FS.readFileSync(filePath, { encoding: 'utf-8' });

  const newContent = fileContent.replace(/....\\node_modules@prismaclient/gi, '@prisma/client');
  FS.writeFileSync(filePath, newContent);
}

console.groupEnd();
