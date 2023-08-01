import "./documentPreview.scss";

const DocumentPreview = () => {
  return (
    <div className="documentPreview">
      <div className="blackbg"></div>
      <div className="container">
        <div className="wrapper">
          <object
            data="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf?zoom=50"
            height={800}
            width={600}
          />
        </div>
      </div>
    </div>
  );
};
export default DocumentPreview;
