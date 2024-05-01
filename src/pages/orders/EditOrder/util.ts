import moment from 'moment';
import { IOrderDetailsResponse } from '../../../api/types/response/orders';
import { OrderFormFields } from '../../../components/orders/OrderForm';
import dayjs from 'dayjs';

export const initialValues: OrderFormFields = {
  collectionType: 'HOME_COLLECTION',
  patient: {},
  payment: {},
  homeCollection: {},
  camp: {}
};

export const mapOrderDetailResponseToForm = (response: IOrderDetailsResponse) => {
  if (!response || !response.data) return initialValues;

  const data: OrderFormFields = {
    camp: response.data.camp,
    collectionType: response.data.collection_type,
    patient: {},
    payment: {},
    homeCollection: {}
  };

  if ('patient' in response.data) {
    data.patient = {
      name: response.data.patient.name,
      email: response.data.patient.email,
      gender: response.data.patient.gender,
      mobile: response.data.patient.mobile,
      dob: response.data.patient.dob ? dayjs(response.data.patient.dob) : ''
    };
  }

  if ('payment' in response.data) {
    data.payment = {
      status: response.data.payment.status,
      mode: response.data.payment.mode,
      transactionId: response.data.payment.transaction_id,
      amount: response.data.payment.amount?.toString(),
      paid: response.data.payment.total_paid?.toString()
    };
  }

  if ('home_collection' in response.data) {
    data.homeCollection = {
      address: response.data.home_collection.address,
      locality: response.data.home_collection.locality,
      city: response.data.home_collection.city,
      pincode: response.data.home_collection.pin_code,
      lat: response.data.home_collection.lat,
      lng: response.data.home_collection.lng,
      alternateMobile: response.data.home_collection.alternate_mobile,
      scheduledTime: response.data.home_collection.scheduled_time,
      sampleProcessingLab: response.data.home_collection.sample_processing_lab,
      phleboId: response.data.home_collection.phlebo_id,
      phleboNotes: response.data.home_collection.phlebo_notes,
      runnerId: response.data.home_collection.runner_id,
      tubeType: response.data.home_collection.tube_type,
      barCode: response.data.home_collection.barcode
    };
  }

  if ('camp' in response.data) {
    data.camp = {
      address: response.data.camp.address,
      manager: {
        mobile: response.data?.camp?.manager?.mobile,
        name: response.data?.camp?.manager?.name
      },
      name: response.data.camp.name
    };

    if (response.data.camp.time) {
      data.camp.time = dayjs(response.data.camp.time);
    }
  }

  if ('remarks' in response.data) {
    data.oldRemarks = response.data.remarks || [];
  }

  console.debug(data);

  return data;
};
