const { PDFNet } = require("@pdftron/pdfnet-node");
const path = require("path");
const fs = require("fs");

async function bootstrap() {
  PDFNet.addResourceSearchPath("./CAD/lib/Lib");
  const doc = await PDFNet.PDFDoc.create();
  if (!(await PDFNet.CADModule.isModuleAvailable())) {
    console.log("PDFTron SDK CAD module not available.");
  }
  const directoryPath = path.join(__dirname, "../Schematics and BOM/");
  const files = fs.readdirSync(directoryPath);
  for (file in files) {
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
    doc.save("newVersion.pdf", PDFNet.SDFDoc.SaveOptions.e_linearized);
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
