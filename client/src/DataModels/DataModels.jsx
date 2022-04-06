/* eslint-disable react/react-in-jsx-scope */
import * as yup from "yup";

export const filledDefaultValues = {
  carName: "Alfa Romeo",
  carOwnerName: "Anton",
  description: "Alfa Romeo Stelvio quadrifoglio v6",
  price: "66000",
  carWeight: "2200",
  carColor: "Red",
  state: { value: "new", label: "new" },
  type: { value: "Sports car", label: "Sports car" },
  exchange: "exchangeFalse",
  exchangeName: "BMW",
  priceRange: { value: "20000-100000", label: "20000-100000" },
  nestedItems: [
    { name: "Leather seats", quality: { value: "good", label: "good" } },
    { name: "Cruise control", quality: { value: "bad", label: "bad" } },
  ],
};

export const emptyDefaultValues = {
  carName: "",
  carOwnerName: "",
  description: "",
  price: "",
  carWeight: "",
  carColor: "",
  state: { value: "", label: "" },
  type: { value: "", label: "" },
  exchange: "exchangeFalse",
  exchangeName: "",
  priceRange: { value: "", label: "" },
};

export const schema = yup.object().shape({
  carName: yup.string().required("Car name is required"),
  carOwnerName: yup.string().required("Car owner name is required"),
  description: yup.string().max(50).required("Description is required"),
  price: yup.number().required().typeError("Price number is required"),
  carWeight: yup.number().typeError("Weight should be numeric"),
  carColor: yup.string().nullable(),
  state: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("State is required"),
    }),
  type: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("Type is required"),
    }),
  exchangeName: yup.string().nullable(),
  priceRange: yup.object().nullable().shape({
    value: yup.string().nullable(),
  }),
  nestedItems: yup.array(),
});
