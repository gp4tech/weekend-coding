import { DataType } from './data-type.model';

export interface Postulant extends DataType {
  fullName: string;
  institution: string;
  class: string;
}
