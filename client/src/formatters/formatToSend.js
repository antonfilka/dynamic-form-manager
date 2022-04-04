/* eslint-disable guard-for-in */
import { filledDefaultValues } from "../DataModels/DataModels";

export const formatToSend = (data) => {
  const tempData = { ...data, state: data.state.value, type: data.type.value };

  if (data.exchange == "exchangeFalse") {
    delete tempData.exchange;
    delete tempData.exchangeName;
    delete tempData.priceRange;
    data.nestedItems.length == 0
      ? delete tempData.nestedItems
      : (tempData.nestedItems = tempData.nestedItems.map((item) => ({
          name: item?.name,
          quality: item.quality?.value,
        })));

    return tempData;
  } else {
    delete tempData.exchange;
    data.nestedItems.length == 0
      ? delete tempData.nestedItems
      : (tempData.nestedItems = tempData.nestedItems.map((item) => ({
          name: item?.name,
          quality: item.quality?.value,
        })));

    return {
      ...tempData,
      priceRange: tempData.priceRange.value,
    };
  }
};

export const formatToShow = (arr) => {
  const data = arr[0];
  const newFormat = {
    ...filledDefaultValues,
    id: data.id,
    carName: data.carName,
    carOwnerName: data.carOwnerName,
    description: data.description,
    price: Number(data.price),
    carWeight: Number(data.carWeight),
    carColor: data.carColor,
    exchange: data.exchangeName ? "exchangeTrue" : "exchangeFalse",
    exchangeName: data.exchangeName,
    state: { value: data.state, label: data.state },
    type: { value: data.type, label: data.type },
    priceRange: { value: data.priceRange, label: data.priceRange },
    nestedItems: data.features.map((item) => ({
      name: item.name,
      quality: { value: item.quality, label: item.quality },
    })),
  };
  return newFormat;
};

export const cleanUpdateRequest = (prev, curr) => {
  const prevModified = formatToSend(prev);
  const currModified = formatToSend(curr);

  const fields = Object.keys(currModified).filter(
    (item) => currModified[item] !== prevModified[item]
  );
  fields.push("id");
  for (const key in currModified) {
    fields.includes(key) ? null : delete currModified[key];
  }
  return currModified;
};

export const cleanCreateRequest = (curr) => {
  const currModified = formatToSend(curr);

  for (const key in currModified) {
    currModified[key] ? null : delete currModified[key];
  }

  console.log("final", currModified);

  return currModified;
};
