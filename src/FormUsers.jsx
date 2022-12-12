import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatRut, validateRut } from "rutlib";
import { validatorRegion, validatorComuna } from "./validators.js";
import Locations from "./jsonLocalities.js";
import Swal from "sweetalert2";

const FormUsers = () => {
  let valuesTable = [
    "Nombres",
    "Apellido Paterno",
    "Apellido Materno",
    "RUT",
    "Región",
    "Comuna",
    "Cód. Postal",
    "Borrar Usuario",
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { region: false, comuna: false },
  });

const [users, setUsers] = useState([]);
useEffect(() => {
    console.log(users)
}, [users])
  const [dataForPruebas, setDataForPruebas] = useState({});
  const watchRegion = watch("region");
  const watchComuna = watch("comuna");

  const onHandleSubmit = (data) => {
    setDataForPruebas(data);
    let rutFormat = formatRut(data.rut);
    if(users.some((e)=> e.rut===rutFormat)){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El rut ya está en uso",
      });

    } else {
        Swal.fire({
            icon: "success",
            title: "Usuario agregado",
            showConfirmButton: false,
            timer: 1500,
          });
          users.push({
              nombres: data.nombres,
              apellidoPaterno: data.apellidoPaterno,
              apellidoMaterno: data.apellidoMaterno,
              rut: rutFormat,
              region: data.region,
              comuna: data.comuna,
              codigoPostal: data.codigoPostal,
            })
            reset()
          
    }

  };
  const deleteUser = (value) => {
    setUsers(users.filter((e) => e.rut !== value.rut));
    console.log(111,value.rut)
    
    

};

  const comunasForSelect =
    Locations[
      Locations.indexOf(Locations.find((e) => e.region === watchRegion))
    ]?.comunas || [];

  return (
    <div className=" flex items-center flex-col py-10">
      <div className="shadow-md bg-sky-700 rounded px-8 pt-6 pb-8 mb-4 w-96 flex flex-col">
        <div className="mb-4">
          <form
            className="flex flex-col justify-center"
            onSubmit={handleSubmit((data) => {
              onHandleSubmit(data);
            })}
          >
            <input
              autoComplete="off"
              className="focus:border-green-100 focus:outline-none shadow appearance-none focus:border-4 rounded w-full py-2 px-3 my-5 text-grey-darker"
              type="text"
              name="nombres"
              placeholder="Nombres"
              {...register("nombres", {
                required: true,
                maxLength: 25,
                pattern: /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
              })}
            />
            {errors.nombres?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Este campo es requerido
              </span>
            )}
            {errors.nombres?.type === "maxLength" && (
              <span className="text-red-400 text-xs italic">
                Ingrese nombres válidos
              </span>
            )}
            {errors.nombres?.type === "pattern" && (
              <span className="text-red-400 text-xs italic">
                Solo se permiten letras
              </span>
            )}
            <input
              autoComplete="off"
              className="focus:border-sky-500 focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker"
              {...register("apellidoPaterno", {
                required: true,
                maxLength: 10,
                pattern: /^[a-zA-ZÀ-ÿ\s]{1,15}$/,
              })}
              name="apellidoPaterno"
              placeholder="Apellido Paterno"
            />
            {errors.apellidoPaterno?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Este campo es requerido
              </span>
            )}
            {errors.apellidoPaterno?.type === "maxLength" && (
              <span className="text-red-400 text-xs italic">
                Ingrese un apellido válido
              </span>
            )}
            {errors.apellidoPaterno?.type === "pattern" && (
              <span className="text-red-400 text-xs italic">
                Solo se permiten letras
              </span>
            )}
            <input
              autoComplete="off"
              className="focus:border-sky-500 focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker"
              {...register("apellidoMaterno", {
                required: true,
                maxLength: 10,
                pattern: /^[a-zA-ZÀ-ÿ\s]{1,15}$/,
              })}
              name="apellidoMaterno"
              placeholder="Apellido Materno"
            />
            {errors.apellidoMaterno?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Este campo es requerido
              </span>
            )}
            {errors.apellidoMaterno?.type === "maxLength" && (
              <span className="text-red-400 text-xs italic">
                Ingrese un apellido válido
              </span>
            )}
            {errors.apellidoMaterno?.type === "pattern" && (
              <span className="text-red-400 text-xs italic">
                Solo se permiten letras
              </span>
            )}
            <input
              autoComplete="off"
              className="focus:border-sky-500 focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker"
              {...register("rut", {
                required: true,
                validate: validateRut,
                minLength: 8,
              })}
              placeholder="Rut"
            />
            {errors.rut?.type === "minLength" && (
              <span className="text-red-400 text-xs italic">
                Ingrese un rut válido
              </span>
            )}
            {errors.rut?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Este campo es requerido
              </span>
            )}
            {errors.rut?.type === "validate" && (
              <span className="text-red-400 text-xs italic">
                Ingrese un rut válido
              </span>
            )}
            <ul>
              <li className=" bg-white group dropdown focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker">
                <a value={null}>{watchRegion || "Seleccione Región"}</a>
                <div className="group-hover:block dropdown-menu p-0 absolute hidden h-auto z-10">
                  <ul className="top-0 w-full bg-white shadow px-6 py-8 z-10">
                    {Locations.map((e, index) => {
                      return (
                        <li
                          className="hover:bg-gray-200 cursor-pointer w-full"
                          {...register("region", {
                            required: true,
                            validate: validatorRegion,
                          })}
                          key={index}
                          onClick={() => {
                            register().onChange({
                              target: { value: e.region, name: "region" },
                            });
                          }}
                        >
                          {e.region}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            </ul>
            {errors.region?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Seleccione una región
              </span>
            )}
            {errors.region?.type === "validate" && (
              <span className="text-red-400 text-xs italic">
                Seleccione una región
              </span>
            )}

            {watchRegion && watchRegion !== false && (
              <div>
                <ul>
                  <li className=" bg-white group dropdown focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker">
                    <a value={null} className="text-grey-darker">
                      {watchComuna || "Seleccione Comuna"}
                    </a>
                    <div className="group-hover:block dropdown-menu absolute hidden h-auto z-10">
                      <ul className="top-0 w-full bg-white shadow px-6 py-8">
                        {comunasForSelect.map((e, index) => {
                          return (
                            <li
                              className="hover:bg-gray-200 cursor-pointer w-full"
                              {...register("comuna", {
                                required: true,
                                validate: validatorRegion,
                              })}
                              key={index}
                              onClick={() => {
                                register().onChange({
                                  target: { value: e, name: "comuna" },
                                });
                              }}
                            >
                              {e}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            )}
            {errors.comuna?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Seleccione una comuna
              </span>
            )}
            <input
              autoComplete="off"
              className="focus:border-sky-500 focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker"
              {...register("codigoPostal", { pattern: /^[0-9]{1,15}$/ })}
              name="codigoPostal"
              placeholder="Código Postal"
            />
            {errors.codigoPostal?.type === "pattern" && (
              <span className="text-red-400 text-xs italic">
                Ingresar solo números
              </span>
            )}
            <button className="group relative self-center h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
              <div className="absolute inset-0 w-3 bg-lime-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-white">
                Crear Usuario
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className=" w-full flex justify-center pb-12">
        {users.length !== 0 ? (
          <table className="w-2/3 leading-normal pb-8">
            <thead className="px-5 py-3 h-16 border-b-2 border-blue-200 rounded-lg bg-gray-200 text-center text-pink-500 text-xs font-semibold text-gray-600 uppercase tracking-wider  ">
              <tr>
                {valuesTable?.map((value, index) => {
                  return (
                    <th className="text-base" key={index}>
                      {value}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              { users && users?.map((value, index) => {
                return (
                  <tr key={index} className="border rounded-lg">
                    <td className="px-5 py-5 border-b border-blue-200 text-center  bg-slate-50 text-sm text-sky-900">
                      {value.nombres}
                    </td>
                    <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                      {value.apellidoPaterno}
                    </td>
                    <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                      {value.apellidoMaterno}
                    </td>
                    <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                      {value.rut}
                    </td>
                    <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                      {value.region}
                    </td>
                    <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                      {value.comuna}
                    </td>
                    <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                      {value.codigoPostal}
                    </td>
                    <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm">
                      <button
                        className="group relative h-12 w-28 overflow-hidden rounded-lg bg-slate-50 text-lg shadow"
                        onClick={() => {
                          deleteUser(value);
                        }}
                      >
                        <div className="absolute inset-0 w-3 bg-red-300 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                        <span className="relative text-black group-hover:text-white my-5">
                          Borrar
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2 className=" flex justify-center text-sky-800 text-xl font-semibold">
            No hay usuarios registrados!{" "}
          </h2>
        )}
      </div>
    </div>
  );
};

export default FormUsers;
