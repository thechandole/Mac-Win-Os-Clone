import { useState } from "react";
import folder from '../../../../../public/folder-mac.png';
import fileIcon from '../../../../../public/file.png';
import pdfIcon from '../../../../../public/pdf.png';
import { useWindowStore } from "../../../../core/useWindowStore";

/* ───── SHARED TYPE ───── */
export type FinderFile = {
  name: string;
  type: "file" | "folder";
  fileType?: string;
};

type FinderLayoutProps = {
  title: string;
  files: FinderFile[];
};

/* ───── ICON RESOLVER ───── */
function getIcon(file: FinderFile) {
  if (file.type === "folder") return folder;
  if (file.fileType === "pdf") return pdfIcon;
  return fileIcon;
}

/* ───── FILE TILE ───── */
function File({
  file,
  onOpen,
}: {
  file: FinderFile;
  onOpen: (file: FinderFile) => void;
}) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      onClick={() => setSelected((prev) => !prev)}
      onDoubleClick={() => onOpen(file)}
      className={`
        flex flex-col items-center gap-1 text-xs
        p-2 rounded cursor-default
        ${
          selected
            ? "bg-blue-500/30 ring-1 ring-blue-400"
            : "hover:bg-white/10"
        }
      `}
    >
      <img
        src={getIcon(file)}
        className="w-12 h-12 object-contain"
        alt={file.name}
        draggable={true}
      />
      <span className="truncate w-full text-center text-white">
        {file.name}
      </span>
    </div>
  );
}

/* ───── SIDEBAR ITEM ───── */
function SidebarItem({ label }: { label: string }) {

  
  return (
    <div className="px-2 py-1 rounded hover:bg-white/10 cursor-default">
      {label}
    </div>
  );
}

/* ───── MAIN LAYOUT ───── */
export function FinderLayout({ title, files }: FinderLayoutProps) {

  const { openWindow } = useWindowStore();

  return (
    <div className="flex h-full flex-1">
      {/* SIDEBAR */}
      <div className="w-48 border-r border-white/10 p-3 text-sm text-white">
        <div className="mb-3 text-xs opacity-60">Favorites</div>
        <SidebarItem label="Desktop" />
        <SidebarItem label="Documents" />
        <SidebarItem label="Downloads" />
        <SidebarItem label="Applications" />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4">
        <div className="text-sm text-white opacity-70 mb-3">
          {title}
        </div>

        <div className="grid grid-cols-5 gap-4 text-white">
          {files.map((file) => (
            <File
              key={file.name}
              file={file}
              onOpen={(file) => {
                if (file.type === "folder") {
                  console.log("Open folder:", file.name);
                } else {
                     openWindow("pdf-preview");
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
