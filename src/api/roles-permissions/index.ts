import apiSlice from '..';
import { BASE_URL } from '../constants';
import { IRolesListResponse } from '../types/response/roles-permissions';

const rolesPermissionsApis = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    roles: build.query<IRolesListResponse, void>({
      query: () => ({
        url: `${BASE_URL}/roles`
      })
    })
  })
});

export const {
  useRolesQuery,
  useLazyRolesQuery
} = rolesPermissionsApis;

export default rolesPermissionsApis;
