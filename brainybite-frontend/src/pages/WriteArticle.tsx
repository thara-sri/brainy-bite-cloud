import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from '../components/EditorToolbar'

export default function WriteArticle() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        // Customize the style of the writing paper.
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-8 border border-slate-200 rounded-b-xl bg-white shadow-sm',
      },
    },
  })

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">สร้างสรรค์บทความใหม่</h1>
      
      {/* Toolbar, ditor instance */}
      <EditorToolbar editor={editor} />
      
      <EditorContent editor={editor} />

      <div className="flex justify-end mt-8">
        <button className="px-10 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all active:scale-95">
          เผยแพร่บทความ
        </button>
      </div>
    </div>
  )
}