import React, { useState } from 'react'
import PairTitleText from './pairTitleText';
import { MAX_SIZE_FILE } from '../lib/utils';


interface UploadProps {
    setUserFile: (value:File | null) => void 
    readUserFile: (value:File) => void 
  }

const Upload: React.FC<UploadProps> =({setUserFile, readUserFile}) => {
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        setError(null)
        setUserFile(null)
        if (selectedFile) {
            if (selectedFile.size > MAX_SIZE_FILE ) {
                setError(`El archivo no debe superar 100 MB`);
                setUserFile(null);
            } else {
                setError(null);
                setUserFile(selectedFile);
                readUserFile(selectedFile)
            }
        }
        e.target.value = '';
    };


    return (
        <div className="flex flex-col space-y-8  p-16 border">
            <PairTitleText title='Seleccione archivo (menor a 100 MB)' text='' />
             <input className="border w-[50rem] " type="file" onChange={handleFileChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
    );

}
export default  Upload