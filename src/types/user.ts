export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface UserDetail {
  id: number;
  nombre: string;
  apellidos: string;
  documento: string;
  tipo: "DNI" | "CE";
  email: string;
  celular: string;
}
