import { exit } from "process";
import { runPromisifiedCommand } from "./CommandShell.task";

const matchMochaDependency = async () => {
  const nodeHeadVersionLevel = parseInt(
    (await runPromisifiedCommand("node -v")).trim().split(".")[0].slice(1)
  );
  if (nodeHeadVersionLevel < 8)
    await runPromisifiedCommand("npm install mocha@^6.x");
  else if (nodeHeadVersionLevel < 10)
    await runPromisifiedCommand("npm install mocha@^7.x");
  else if (nodeHeadVersionLevel < 12)
    await runPromisifiedCommand("npm install mocha@^8.x");
  exit(0);
};
matchMochaDependency();
