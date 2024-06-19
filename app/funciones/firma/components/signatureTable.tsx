import React from 'react';
import { TableRow } from '@/app/lib/globalTypes'
import { spacemono } from '@/app/ui/fonts'

  
  interface TableProps {
    data: TableRow[];
  }
  

interface TableProps {
  data: TableRow[];
}

const SignatureTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border-b-2 border-gray-300 block md:table-row">
            <th className="text-left p-2 md:table-cell">Nombre Archivo</th>
            <th className="text-left p-2 md:table-cell">Firma</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group text-sm">
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-200 block md:table-row">
              <td className="p-2 mr-2 md:table-cell overflow-hidden overflow-ellipsis whitespace-nowrap" style={{ maxWidth: '100px'}} title={row.fileName + ''}>{row.fileName}</td>
              <td className={`${spacemono.className} p-2 md:table-cell`} title={`${row.signature.slice(0, 8)}...${row.signature.slice(-10)}`}>{row.signature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SignatureTable;
