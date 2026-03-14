import { Editor } from '@tiptap/react'
import { 
  Bold, Italic, List, ListOrdered, 
  Heading1, Heading2, Quote, Undo, Redo 
} from 'lucide-react'

interface Props {
  editor: Editor | null
}

export default function EditorToolbar({ editor }: Props) {
  if (!editor) return null

  // This function helps create visually appealing buttons and changes their color when the button is active. (Active)
  const ActionButton = ({ onClick, isActive, children }: any) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border border-slate-200 rounded-t-xl mb-[-1px]">
      <ActionButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <Heading1 size={20} />
      </ActionButton>

      <ActionButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <Heading2 size={20} />
      </ActionButton>

      <div className="w-[1px] h-8 bg-slate-300 mx-1" />

      <ActionButton 
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <Bold size={20} />
      </ActionButton>

      <ActionButton 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <Italic size={20} />
      </ActionButton>

      <div className="w-[1px] h-8 bg-slate-300 mx-1" />

      <ActionButton 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <List size={20} />
      </ActionButton>

      <ActionButton 
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <ListOrdered size={20} />
      </ActionButton>

      <ActionButton 
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
      >
        <Quote size={20} />
      </ActionButton>

      <div className="flex-1" />

      <button onClick={() => editor.chain().focus().undo().run()} className="p-2 text-slate-400 hover:text-slate-600">
        <Undo size={20} />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} className="p-2 text-slate-400 hover:text-slate-600">
        <Redo size={20} />
      </button>
    </div>
  )
}