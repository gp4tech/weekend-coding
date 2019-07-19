import { DataType } from './data-type.model';

export interface Postulant extends DataType {
  fullName: string;
  institution: string;
  class: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  reason: string;
  accepted?: boolean;
  credentialSent?: boolean;
  confirmedAssistant?: boolean;
  checkIn?: boolean;
  feeForLunchReceived?: boolean;
  lunchDelivered?: boolean;
  firstSnackDelivered?: boolean;
  secondSnackDelivered?: boolean;
  visibleInSearch?: boolean;
  teachersWhoGavePoints?: any;
  rfid?: string;
}
