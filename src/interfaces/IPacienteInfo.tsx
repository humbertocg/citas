interface IPacienteInfo {
  id: string;
  nombrePaciente: string;
  nombrePropietario: string;
  emailPropietario: string;
  telefono: string;
  sintomas: string;
  fechaAlta: Date;
  isActionsVisible: boolean;
}

export default IPacienteInfo;
