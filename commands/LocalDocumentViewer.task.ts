import express from "express";
import open from "open";
import path from "path";
const app: express.Application = express();
app.use(express.static(path.join(__dirname, "../docs")));
app.listen(process.env.npm_package_config_docViewPort, () => {
  open(`http://localhost:${process.env.npm_package_config_docViewPort}/`);
});
