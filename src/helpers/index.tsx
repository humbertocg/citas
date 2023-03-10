export const formatearFecha = (fecha: Date) => {
  const nuevaFecha = new Date(fecha);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return nuevaFecha.toLocaleDateString('es-MX', options);
};
