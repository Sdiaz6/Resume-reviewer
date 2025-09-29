// src/utils/pdfReader.js
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Use CDN worker for browser
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function readPDF(file) {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Load PDF
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let text = "";
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      text += strings.join(" ") + "\n\n";
    }

    return text;
  } catch (err) {
    console.error("Error reading PDF:", err);
    return "Could not read PDF file. Make sure it contains selectable text.";
  }
}
