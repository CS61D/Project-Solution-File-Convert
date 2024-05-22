import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const downloadFile = ({
  filename,
  fileType,
  file,
}: {
  filename: string;
  fileType: string;
  file: File;
}) => {
  const blob = new Blob([file], { type: "image/" + fileType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename + "." + fileType;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const stripExtension = (filename: string) => {
  const parts = filename.split(".");
  parts.pop();
  return parts.join(".");
};

export const formatFileSize = (size: number) => {
  const units = ["bytes", "KB", "MB", "GB", "TB"];

  let i = 0;
  while (size >= 1000 && i < units.length - 1) {
    size /= 1000;
    i++;
  }

  return `${size.toFixed(2)} ${units[i]}`;
};
