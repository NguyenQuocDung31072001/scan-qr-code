import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hook/useLocalStorage";

const schema = yup.object().shape({
  Email: yup.string().email().required(),
  Password: yup.string().min(5),
});

type FormValues = {
  Email: string;
  Password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    if (data) {
      setEmail(data.Email);
      setPassword(data.Password);
      navigate("/scan_qrcode");
    }
  });
  return (
    <div className="flex flex-col items-center justify-center w-[24rem] h-[24rem] rounded-[10px] bg-gradient-to-r p-[6px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] shadow-md shadow-gray-400">
      <div className="text-[1.5rem] font-semibold text-transparent bg-clip-text bg-gradient-to-br from-indigo-800 via-purple-600 to-pink-800">
        Amanotes Login
      </div>
      <div className="mb-4 w-[15rem]">
        <p className="text-gray-600">Email</p>
        <input
          {...register("Email")}
          placeholder="Email"
          className="border-2 border-gray-500 px-2 py-2 rounded-[5px]"
        />
        {errors?.Email && (
          <p className="text-red-500">{errors.Email.message}</p>
        )}
      </div>
      <div className="mb-4 w-[15rem]">
        <p className="text-gray-600">Password</p>
        <input
          {...register("Password")}
          type="password"
          placeholder="Password"
          className="border-2 border-gray-500 px-2 py-2 rounded-[5px]"
        />
        {errors?.Password && (
          <p className=" text-red-500">{errors.Password.message}</p>
        )}
      </div>
      <div className="max-w-[15rem] w-full flex justify-center">
        <button
          onClick={onSubmit}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-white rounded-[10px] w-[10rem] px-4 py-2"
          //hover:bg-gradient-to-r hover:from-indigo-800 hover:via-purple-800 hover:to-pink-800
        >
          login
        </button>
      </div>
    </div>
  );
}
