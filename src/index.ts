const core = require('@actions/core');
const github = require('@actions/github');
const { PDFNet } = require("@pdftron/pdfnet-node")
const fs = require("fs")
const path = require("path")

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}


async function bootstrap() {
  fs.readdirSync(".").forEach((file) => {
    console.log(file);
  });
  const directoryPath = core.getInput("path");
  const name = core.getInput("name");
  PDFNet.addResourceSearchPath("./Lib");
  const doc = await PDFNet.PDFDoc.create();
  if (!(await PDFNet.CADModule.isModuleAvailable())) {
    console.log("PDFTron SDK CAD module not available.");
  }
  const files = fs.readdirSync(directoryPath);
  for (let file in files) {
    const extension = files[file].split(".").pop();
    if (extension === "dwg") {
      const opts = new PDFNet.Convert.CADConvertOptions();
      opts.setPageWidth(800);
      opts.setPageHeight(600);
      opts.setRasterDPI(150);
      console.log(`adding ${files[file]}`);
      await PDFNet.Convert.fromCAD(
        doc,
        path.join(directoryPath, files[file]),
        opts
      );
    }
  }
  try {
    doc.save(`${name}.pdf`, PDFNet.SDFDoc.SaveOptions.e_linearized);
  } catch (e) {
    console.error(e);
  }
}
async function run(): Promise<void> {
  try {
    await PDFNet.runWithCleanup(bootstrap, "")
      .catch(function (error) {
        console.log("Error: " + JSON.stringify(error));
      })
      .then(function () {
        PDFNet.shutdown();
      });
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
