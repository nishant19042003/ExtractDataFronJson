import { useState } from "react";

export default function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfUrl(URL.createObjectURL(file)); // Create a temporary URL for the PDF
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  return (
    <div className="flex justify-center items-center m-5 p-5">
      {/* File Input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="border-2 border-gray-400 p-2 rounded-md shadow-sm cursor-pointer"
      />

      {/* PDF Viewer */}
      <div className="border-2 border-gray-400 p-3 ml-5 rounded-md shadow-md w-[400px]">
        <h1 className="text-xl font-semibold mb-2">PDF Viewer</h1>

        {pdfUrl ? (
          <embed
            src={pdfUrl}
            type="application/pdf"
            className="w-full h-[500px] border-2 border-gray-300 rounded-md"
          />
        ) : (
          <div className="w-full h-[500px] flex justify-center items-center border-2 border-dashed border-gray-400 rounded-md text-gray-500">
            Upload a PDF to preview
          </div>
        )}
      </div>
    </div>
  );
}
