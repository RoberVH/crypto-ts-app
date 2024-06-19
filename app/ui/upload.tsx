import React, { useState} from 'react'
import PairTitleText from './pairTitleText';


interface UploadProps {
    setUserFile: (value:File | null) => void 
    readUserFile: (value:File) => void 
  }

const Upload: React.FC<UploadProps> =({setUserFile, readUserFile}) => {
   // const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
       // setFile(null)
        setError(null)
        setUserFile(null)
        if (selectedFile) {
            if (selectedFile.size > 250 * 1024 * 1024 * 1024 *1024 ) {
                setError("El archivo no debe superar 250 MB");
                setUserFile(null);
            } else {
                setError(null);
                setUserFile(selectedFile);
                readUserFile(selectedFile)
            }
        }
    };


    return (
        <div className="flex flex-col space-y-8  p-16 border">
            <PairTitleText title='Seleccione archivo (menor a 1MB)' text='' />
             <input className="border w-[50rem] " type="file" onChange={handleFileChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
    );

}
export default  Upload