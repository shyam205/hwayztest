import { object, string, boolean } from 'yup'

export const stationSchema = object({
    station:string().required("Station field is required.")
  });