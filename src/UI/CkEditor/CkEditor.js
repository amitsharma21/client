import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CkEditor = ({ ckEditorData, setCkEditorData }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={ckEditorData}
      onChange={(event, editor) => {
        setCkEditorData(editor.getData());
      }}
    />
  );
};

export default CkEditor;
