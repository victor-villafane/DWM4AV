import React from "react";

const FileProcess = () => {
  const jsonFileDownload = () => {
    const json_data = {
      name: "Dedar",
      age: "14",
      address: "House #28",
    };
    const fileName = "finename.json";
    const data = new Blob([JSON.stringify(json_data)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  };

  const jsonFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      const data = JSON.parse(e.target.result);
      console.log("Json Data", data);
    };
  };
  return (
    <div>
      <>
        <h2>Download JSON File</h2>
        <button onClick={jsonFileDownload}>Download JSON File</button>
      </>

      <hr />

      <>
        <h2>Upload JSON File</h2>
        <input type="file" onChange={jsonFileUpload} />
      </>
    </div>
  );
};

export default FileProcess;