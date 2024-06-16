// export const formatDate = (timestamp: number): string => {
//     const date = new Date(timestamp);
//     return date.toLocaleDateString('es-ES', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     }) + ' ' + date.toLocaleTimeString('es-ES', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }
  

  export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  