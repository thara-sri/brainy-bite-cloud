import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "../components/EditorToolbar";
import Image from "@tiptap/extension-image";
import api from "../api/axiosSetup";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../api/articleService";

export default function WriteArticle() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0].id);
      } catch (error) {
        console.error("Category retrieval failed:", error);
      }
    };
    loadCategories();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class:
            "rounded-xl shadow-lg border border-slate-200 my-8 mx-auto block max-w-full",
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        // Customize the style of the writing paper.
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[500px] p-8 border border-slate-200 rounded-b-xl bg-white shadow-sm",
      },
    },
  });

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadFile(file); // use uploadFile to send to S3
      setThumbnailUrl(url); // save URL
    } catch (error) {
      console.error("Thumbnail upload failed:", error);
      alert("thumbnail upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Header
      },
    });
    return response.data.url;
  };

  const handleImageClick = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      if (input.files?.length) {
        const url = await uploadFile(input.files[0]);
        editor?.chain().focus().setImage({ src: url }).run();
      }
    };
    input.click();
  };

  const handleSubmit = async () => {
    if (!editor || !title) return alert("กรุณาใส่ชื่อเรื่องและเนื้อหา");

    const articleData = {
      topic: title,
      description,
      content: editor.getHTML(), // HTML from Tiptap
      thumbnailUrl: thumbnailUrl,
      categoryId: Number(categoryId),
      status: "PUBLISHED",
    };

    try {
      await api.post("/articles", articleData);
      alert("บันทึกบทความสำเร็จ!");
      navigate("/"); // Saving complete. Return to the homepage.
    } catch (error) {
      console.error("Save failed:", error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="หัวข้อบทความ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl font-extrabold border-none focus:ring-0 placeholder:text-slate-300"
        />

        <div className="flex flex-col gap-4 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <label className="text-sm font-semibold text-slate-600">
            รูปภาพหน้าปกบทความ
          </label>

          <div className="flex items-center gap-6">
            {/* Preview */}
            <div className="w-40 h-24 bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-slate-400">ยังไม่มีรูป</span>
              )}
            </div>

            {/* Upload */}
            <div className="flex-1">
              <input
                type="file"
                id="thumbnail-upload"
                className="hidden"
                accept="image/*"
                onChange={handleThumbnailUpload}
              />
              <label
                htmlFor="thumbnail-upload"
                className={`inline-block px-6 py-2 rounded-full text-sm font-bold cursor-pointer transition-all ${
                  isUploading
                    ? "bg-slate-300 text-slate-500"
                    : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                }`}
              >
                {isUploading ? "กำลังอัปโหลด..." : "เลือกรูปภาพหน้าปก"}
              </label>
              <p className="mt-2 text-xs text-slate-400">
                แนะนำขนาด 1200x630 px (ไม่เกิน 2MB)
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="rounded-lg border-slate-200 text-sm text-slate-600"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="คำเกริ่นนำสั้นๆ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border-slate-200 text-slate-600 italic"
        />
      </div>

      {/* Tiptap Editor */}
      <EditorToolbar editor={editor} onImageClick={handleImageClick} />
      <EditorContent editor={editor} />

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          className="px-12 py-4 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition-all hover:-translate-y-1"
        >
          เผยแพร่บทความเลย
        </button>
      </div>
    </div>
  );
}
