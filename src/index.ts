import { PDFNet } from "@pdftron/pdfnet-node";
import path from "path";
import * as core from '@actions/core'
import fs from "fs";

async function bootstrap() {
  fs.readdirSync(".").forEach(file => {
    console.log(file);
  });
  const directoryPath = core.getInput('path')
  const name = core.getInput('name')
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

PDFNet.runWithCleanup(bootstrap, "")
  .catch(function (error) {
    console.log("Error: " + JSON.stringify(error));
  })
  .then(function () {
    PDFNet.shutdown();
  });
