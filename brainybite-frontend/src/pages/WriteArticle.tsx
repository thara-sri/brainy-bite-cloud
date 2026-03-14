import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from '../components/EditorToolbar'
import Image from '@tiptap/extension-image'
import api from '../api/axiosSetup'

export default function WriteArticle() {
  const editor = useEditor({
    extensions: [
        StarterKit,
        Image.configure({
            allowBase64: true,
            HTMLAttributes: {
                class: 'rounded-xl shadow-lg border border-slate-200 my-8 mx-auto block max-w-full',
            },
        }),
    ],
    content: '',
    editorProps: {
      attributes: {
        // Customize the style of the writing paper.
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-8 border border-slate-200 rounded-b-xl bg-white shadow-sm',
      },
    },
  })

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
          // Endpoint S3 in Spring Boot
          const response = await api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });

          // URL from S3
          const url = response.data.url;

          // Instruct Tiptap to insert an image at the cursor's location.
          editor?.chain().focus().setImage({ src: url }).run();

        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Image upload failed. Please try again.");
        }
      }
    };

    input.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">สร้างสรรค์บทความใหม่</h1>
      
      {/* Toolbar, ditor instance */}
      <EditorToolbar editor={editor} onImageClick={addImage} />
      
      <EditorContent editor={editor} />

      <div className="flex justify-end mt-8">
        <button className="px-10 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all active:scale-95">
          เผยแพร่บทความ
        </button>
      </div>
    </div>
  )
}