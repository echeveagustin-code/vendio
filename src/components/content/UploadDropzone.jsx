import { useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

export default function UploadDropzone({ onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;
    onFilesSelected(files);
  }

  return (
    <section
      className={`mb-6 rounded-2xl border-2 border-dashed p-6 text-center transition sm:p-8 ${
        isDragging ? "border-brand-navy bg-brand-navy/5" : "border-brand-navy/15 bg-white"
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy/6 text-brand-navy">
        <MdOutlineCloudUpload className="text-3xl" />
      </div>
      <h3 className="mt-3 font-display text-lg font-extrabold text-brand-navy">
        Arrastrá tus fotos o videos acá
      </h3>
      <p className="mt-1 text-sm text-brand-ink/55">
        Formatos aceptados: JPG, PNG, MP4, MOV. Hasta 500 MB por archivo.
      </p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-brand-navy/15 bg-white px-4 text-sm font-bold text-brand-navy shadow-sm transition hover:bg-[#f6f7fb]"
      >
        Elegir archivos
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
    </section>
  );
}
