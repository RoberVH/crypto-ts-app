import React, { useState} from 'react'

interface UploadProps {
    setUserFile: (value:File | null) => void 
  }

const Upload: React.FC<UploadProps> =({setUserFile}) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        setFile(null)
        setError(null)
        setUserFile(null)
        if (selectedFile) {
            if (selectedFile.size > 1024 * 1024) {
                setError("El archivo no debe superar 1 MB");
                setFile(null);
            } else {
                setError(null);
                setFile(selectedFile);
                setUserFile(selectedFile)
            }
        }
    };

    const handleUpload = () => {
        if (file) {
            // Lógica para manejar la carga del archivo
            console.log("Archivo cargado:", file);
        }
    };
    return (
        <div className="flex flex-col space-y-8 border p-16">
            <p>
                Subir archivo (menor a 1MB):
            </p>
             <input className="border " type="file" onChange={handleFileChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
    );

}
export default  Upload