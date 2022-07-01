import { httpService } from "./configURL";

export const authService = {
  dangNhap: (dataDangNhap) => {
    return httpService.post(`/api/auth/login`, dataDangNhap);
  },

  dangKy: (dataDangKy) => {
    return httpService.post(`/api/auth/register`, dataDangKy);
  },
};
