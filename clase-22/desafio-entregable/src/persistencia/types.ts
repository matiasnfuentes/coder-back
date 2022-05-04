export interface DAO<T> {
  obtener(id: string): Promise<T>;
  obtenerTodos(): Promise<T[]>;
  guardar(elementoAGuardar: T): Promise<T>;
  eliminar(id: string): Promise<void>;
  modificar(id: string, modificacion: Modificacion<T>): Promise<T>;
}

type Modificacion<T> = Partial<T>;
