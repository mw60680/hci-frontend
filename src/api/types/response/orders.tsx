export interface IPatientInfo {
  name: string;
  gender: string;
  dob: string;
  mobile: string;
  email: string;
}

export interface IPaymentInfo {
  status: string;
  mode: string;
  transaction_id: string;
  amount: number;
  amount_due: number;
  refund_status: string;
  total_paid: number;
  refund_amount: number;
}

export interface ICampInfo {
  manager: {
    name: string;
    mobile: string;
  };
  name: string;
  address: string;
  time: string;
}

export interface IOrdersListItem {
  patient: IPatientInfo;
  payment: IPaymentInfo;
  home_collection: {
    address: string;
    locality: string;
    city: string;
    pin_code: string;
    lat: string;
    lng: string;
    alternate_mobile: string;
    scheduled_time: string;
    sample_processing_lab: string;
    phlebo_id: string;
    phlebo_notes: string;
    runner_id: string;
    tube_type: string;
    barcode: string[];
  };
  camp: ICampInfo;
  remarks: string[];
  reports: [];
  client: string;
  uuid: string;
  collection_type: string;
  order_status: string;
  created_at: string;
  updated_at: string;
}

export interface IOrdersListResponse {
  data: IOrdersListItem[];
  meta: {
    page: number;
    size: number;
  };
}

export interface IOrderDetailsResponse {
  data: IOrdersListItem;
}
