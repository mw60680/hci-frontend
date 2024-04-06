export interface BaseListRequest {
  uuid: string;
  page: number;
  size: number;
  createdAtFrom: string;
  createdAtTo: string;
  updatedAtFrom: string;
  updatedAtTo: string;
}
