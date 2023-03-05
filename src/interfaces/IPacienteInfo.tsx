interface IPacienteInfo {
  id: string;
  nombrePaciente: string;
  nombrePropietario: string;
  emailPropietario: string;
  telefono: string;
  sintomas: string;
  fechaAlta: Date;
}

export default IPacienteInfo;
