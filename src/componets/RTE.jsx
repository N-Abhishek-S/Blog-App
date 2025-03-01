import React from "react";
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "Content"}
        control={control} // We pass the control here to access form state
        render={({ field: { onChange, value } }) => (
          <Editor
           apiKey='zdfowc99usdhmsk9a8dx6sgby2lg2atxe872uutmr9zfz8s9'
            value={value || defaultValue} // Bind value properly
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                
                content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange} // Inform react-hook-form of value changes
          />
        )}
      />
    </div>
  );
}
