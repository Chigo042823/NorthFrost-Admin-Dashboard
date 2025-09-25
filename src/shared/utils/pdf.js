import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export function generatePdf(elementId) {
  const element = document.getElementById(elementId);

  html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgWidth = pdfWidth; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const x = (pdfWidth - imgWidth) / 2;
    const y = 10; // top margin

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("invoice.pdf");
  });
}

export function printPdf(elementId) {
  const element = document.getElementById(elementId);

  html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgWidth = pdfWidth; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const x = (pdfWidth - imgWidth) / 2;
    const y = 10; // top margin

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    pdf.autoPrint(); 
    const printBlob = pdf.output("bloburl");
    window.open(printBlob, "_blank");
  });
}