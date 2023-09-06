import React, { useEffect, useState, useRef } from "react";

const Editor = ({ name, value, onChange, ...rest }) => {
  let editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setLoaded(true);
  }, []); // run on mounting

  return loaded ? (
    <CKEditor
      editor={ClassicEditor}
      config={{
        removePlugins: [
          "EasyImage",
          "ImageUpload",
          // "MediaEmbed",
          "Table",
          "TableToolbar",
        ],
      }}
      data={value}
      onChange={(_, editor) => onChange(editor.getData())}
      {...rest}
    />
  ) : (
    "Editor loading..."
  );
};

export default Editor;
