import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import ReactSelect from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Create.module.css";

const defaultValues = {
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

const schema = yup.object().shape({
  carName: yup.string().required("Car name is required"),
  carOwnerName: yup.string().required("Car owner name is required"),
  description: yup.string().max(50).required("Description is required"),
  price: yup
    .number("Price number is required")
    .required("Price number is required"),
  carWeight: yup.number("Price number is required"),
  carColor: yup.string(),
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
      value: yup.string().required("State is required"),
    }),
  exchangeName: yup.string().nullable(),
  priceRange: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("State is required"),
    }),
});

const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "nestedItems",
    keyName: "nestedItemsId",
  });
  // const [data, setData] = useState(defaultValues);

  const onSubmit = (formData) => {
    alert(JSON.stringify(formData));
    // setData(formData);
  };

  console.log(errors);

  return (
    <div className={styles.create}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>Car Name</label>
        <input
          name="carName"
          placeholder="Alfa Romeo"
          {...register("carName")}
        />
        {errors.carName && (
          <p className={styles.error}>{errors.carName.message}</p>
        )}
        <label>{`Owner Name`}</label>
        <input
          name="carOwnerName"
          placeholder="Alexander"
          {...register("carOwnerName")}
        />
        {errors.carOwnerName && (
          <p className={styles.error}>{errors.carOwnerName.message}</p>
        )}
        <label>Description</label>
        <input
          name="description"
          placeholder="Some description here"
          {...register("description")}
        />
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
        <label>Price $</label>
        <input name="price" placeholder="Price" {...register("price")} />
        {errors.price && <p className={styles.error}>{errors.price.message}</p>}
        <label>Car weight (kg)</label>
        <input
          name="carWeight"
          placeholder="Optional: 2700"
          {...register("carWeight")}
        />
        {errors.carWeight && (
          <p className={styles.error}>{errors.carWeight.message}</p>
        )}
        <label>Car Color</label>
        <input
          name="carColor"
          placeholder="Optional: Red"
          {...register("carColor")}
        />
        {errors.carColor && (
          <p className={styles.error}>{errors.carColor.message}</p>
        )}

        <section>
          <section className={styles.selection}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={[
                    { value: "new", label: "new" },
                    { value: "used", label: "used" },
                    { value: "crashed", label: "crashed" },
                  ]}
                />
              )}
            />
            {errors.state && (
              <p className={styles.selectionError}>
                {errors.state.value.message}
              </p>
            )}
          </section>

          <section className={styles.selection}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={[
                    { value: "Sedan", label: "Sedan" },
                    { value: "Coupe", label: "Coupe" },
                    { value: "Hatch—back", label: "Hatch—back" },
                    { value: "Minivan", label: "Minivan" },
                    { value: "Sports car", label: "Sports car" },
                  ]}
                />
              )}
            />
            {errors.type && (
              <p className={styles.selectionError}>
                {errors.type.value.message}
              </p>
            )}
          </section>
        </section>

        <div className={styles.radio}>
          <div className={styles.radioOption}>
            <label>Exchange interests</label>
            <input
              type="radio"
              name="exchangeTrue"
              value="exchangeTrue"
              {...register("exchange")}
            />
          </div>

          <div className={styles.radioOption}>
            <label>No exchange</label>
            <input
              type="radio"
              name="exchangeFalse"
              value="exchangeFalse"
              {...register("exchange")}
            />
          </div>
        </div>

        {watch("exchange") == "exchangeTrue" && (
          <div className={styles.exchange}>
            <label>Wanted car model</label>
            <div className={styles.inputs}>
              <input
                name="exchangeName"
                placeholder="BMW"
                {...register("exchangeName")}
              />
              {errors.exchangeName && (
                <p className={styles.error}>{errors.exchangeName.message}</p>
              )}
              <section className={styles.selection}>
                <Controller
                  name="priceRange"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={[
                        { value: "1000-5000", label: "1000-5000" },
                        { value: "5000-20000", label: "5000-20000" },
                        { value: "20000-100000", label: "20000-100000" },
                      ]}
                    />
                  )}
                />
                {errors.state && (
                  <p className={styles.selectionError}>
                    {errors.state.value.message}
                  </p>
                )}
              </section>
            </div>
          </div>
        )}

        {fields.map((item, index) => {
          return (
            <div className={styles.array} key={item.nestedItemsId}>
              <label>Feature name</label>
              <input
                name={`nestedItems.${index}.name`}
                placeholder="Leather seats"
                {...register(`nestedItems[${index}].name`)}
              />
              <section className={styles.selection}>
                <Controller
                  name={`nestedItems.${index}.quality`}
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={[
                        { value: "bad", label: "bad" },
                        { value: "good", label: "good" },
                        { value: "excelent", label: "excelent" },
                      ]}
                    />
                  )}
                />
                {errors.state && (
                  <p className={styles.selectionError}>
                    {errors.state.value.message}
                  </p>
                )}
              </section>

              <button
                className={styles.remove}
                type="button"
                onClick={() => remove(index)}
              >
                ➖
              </button>
            </div>
          );
        })}

        <button
          className={styles.addNest}
          type="button"
          onClick={() => append({})}
        >
          ➕ Add new nested feature
        </button>

        <button
          type="button"
          onClick={() => {
            reset();
            // setData(defaultValues);
          }}
        >
          🗑️ Reset form
        </button>
        <button type="submit">✅ Submit</button>
      </form>
    </div>
  );
};

export default Create;
