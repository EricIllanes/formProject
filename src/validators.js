import { validateRut } from "rutlib/lib";

const validatorRut = (value) => {
  return validateRut(value);
};

const validatorRegion = (value) => {
  return value !== "Seleccione Región"
};

const validatorComuna = (value) => {
  return value !== "Seleccione Comuna";
};

export { validatorRut, validatorRegion, validatorComuna };
