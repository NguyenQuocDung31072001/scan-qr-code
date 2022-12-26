import axiosConfig from "../config/axios.config";
export const getListUser = () => {};

export const checkinUser = async (id: string) => {
  try {
    const result = await axiosConfig.post(`/api/user/checkin/${id}`);
    console.log({ result });
    return Promise.resolve(result);
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};
