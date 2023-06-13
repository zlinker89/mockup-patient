export interface IPatient {
  ID?: number;
  Apellido: string;
  Celular: string;
  CitaVencida: string;
  Convenio: string;
  Departamento: string;
  EPS: string;
  EstadoCivil: string;
  FIngreso: string;
  'Fecha Creacion': string;
  FechaNacimiento: string;
  Identificacion: string;
  Nombre: string;
  NumeroFijo: string;
  Ocupacion: string;
  ProximaCitaCita: string;
  Responsable: string;
  TipoIdentificacion: string;
  Vinculacion: string;
  correo: string;
  credito: string;
  origen: string;
  checked?: boolean;
  cf_1884?: string
  etapa?: IEtapa
  selectionColumnEtapa?: any[]
}

export interface IResponseCRM{
  nroContactosInsertados: number
  nroContactosActualizados: number
  nroOmitidos: number
}

interface IEtapa{
  etapa: string
  campo: string
}
