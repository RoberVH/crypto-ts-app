import { toastSuccess } from "./successmsg";

export const MAX_SIZE_FILE = 104_857_600; // procesa archivos hasta 100 MB
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

type TextRef = {
  current: HTMLParagraphElement | null
}

export  const copyToClipboard = ( {textRef}:{textRef: TextRef}) => {
    const text = textRef.current?.innerText || ''
    navigator.clipboard.writeText(text).then(() => {
      toastSuccess('Copiado al portapapeles')
    }).catch(err => {
      console.error('Error al copiar el texto: ', err)
    })
}
