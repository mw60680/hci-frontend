export interface IPermissionResponse {
  slug: string;
  label: string;
}

export interface IRoleResponse {
  slug: string;
  label: string;
  permissions: IPermissionResponse[];
}

export interface IRolesListResponse {
  data: IRoleResponse[];
}