import React from 'react';

interface WaitModalProps {
  message: string;
}

class WaitModal extends React.Component<WaitModalProps> {
  render() {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <h2 className="text-lg font-semibold mb-4">Por favor espere</h2>
          <p>{this.props.message}</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default WaitModal;
