export interface User {
  idPersona: string;
  //apellidoCompleto: string;
  razonSocial: string;
  numeroDocumentoIdentidad: string;
}

export interface UserDetail {
  id: string;
  nombre: string;
  apellidos: string;
  documento: string;
  tipoDocumento: string;
  tipoPersona: string;
  email: string;
  celular: string;
  razonSocial: string;
}
