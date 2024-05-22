export const ImageOutputFormat = [
  "png",
  "jpeg",
  "webp",
  "bmp",
  "ico",
  "tiff",
  "gif",
] as const;

export const ImageMimeTypes = {
  "image/png": [".png"],
  "image/jpeg": [".jpeg", ".jpg"],
  "image/webp": [".webp"],
  "image/bmp": [".bmp"],
  "image/ico": [".ico"],
  "image/tiff": [".tiff"],
  "image/gif": [".gif"],
  "image/heic": [".heic"],
};
