import { ORDER_COLLECTION_TYPE, ORDER_STATUS, PAYMENT_STATUS } from '../../../utils/constants';
import { BaseListRequest } from './base';

export interface IOrderPatientObject {
  name: string;
  gender: string;
  dob: string;
  mobile: string;
  email: string;
}

export interface IOrderPaymentObject {
  status: string;
  mode: string;
  transactionId: string;
  amount: string;
  paid: string;
}

export interface IOrderHomeCollectionObject {
  address: string;
  locality: string;
  city: string;
  pincode: string;
  lat: string;
  lng: string;
  alternateMobile: string;
  scheduledTime: string;
  sampleProcessingLab: string;
  phleboId: string;
  phleboNotes: string;
  runnerId: string;
  tubeType: string;
  barCode: string[];
}

export interface IOrderCampObject {
  address: string;
  name: string;
  time: string;
  manager: {
    name: string;
    mobile: string;
  };
}

export interface ICreateOrderRequest {
  collectionType: string;
  orderStatus?: string;
  patient?: Partial<IOrderPatientObject>;
  payment?: Partial<IOrderPaymentObject>;
  remarks?: string;
  clientId?: string;
  homeCollection?: Partial<IOrderHomeCollectionObject>;
  camp?: Partial<IOrderCampObject>;
}

export interface IOrdersListRequest extends BaseListRequest {
  collectionType: ORDER_COLLECTION_TYPE;
  clientId: string;
  patientName: string;
  patientMobile: string;
  patientEmail: string;
  paymentStatus: PAYMENT_STATUS;
  orderStatus: ORDER_STATUS;
  homeCollectionCity: string;
  campName: string;
}
