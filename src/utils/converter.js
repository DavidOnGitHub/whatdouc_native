const convertDocsToFormData = documents => documents.reduce((converted, document) => {
  converted.append(document.name, document);
  return converted;
}, new FormData());

// const convertDocsToFormData = documents => {
//   const result = new FormData();
//   result.append('file', documents[0]);
//   console.log(result)
//
//   return result;
// }

export default {
  uploadDocuments: {
    toApi: convertDocsToFormData
  }
};
