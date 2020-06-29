const headers = { "Content-Type": "application/json" };

export const getCarList = () =>
  fetch("/api/car").then((result) => {
    if (!result.ok) {
      throw Error(result.error);
    }
    return result.json();
  });

export const createCar = (carObject) =>
  fetch("/api/car", {
    method: "POST",
    headers,
    body: JSON.stringify(carObject),
  }).then((result) => {
    if (!result.ok) {
      throw Error(result.error);
    }
    return result.json();
  });

export const deleteCar = (carId) =>
  fetch(`/api/car/${carId}`, { method: "DELETE" }).then((result) => {
    if (!result.ok) {
      throw Error(result.error);
    }
  });

//can be used in case of open car details in new page,
// or get more detailed information in future
//
// export const getCar = (carId) =>
//   fetch(`/api/car/${carId}`).then((result) => {
//     if (!result.ok) {
//       throw Error(result.error);
//     }
//     return result.json();
//   });

export const updateCar = (carId, carObject) =>
  fetch(`/api/car/${carId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(carObject),
  }).then((result) => {
    if (!result.ok) {
      throw Error(result.error);
    }
    return result.json();
  });
