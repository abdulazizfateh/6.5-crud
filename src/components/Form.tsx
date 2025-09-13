import React, { useEffect, type Dispatch, type SetStateAction } from 'react'
// Type
import type { IStudent, IStudentForm } from '../types';
// React Query
import { useBlog } from '../api/hooks/useBlog';
// Icons
import { LoadingOutlined } from '@ant-design/icons';
// Form Validtion - yup
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { message } from 'antd';

const schema = yup
    .object({
        fname: yup.string().required(),
        lname: yup.string().required(),
        birthdate: yup.string().required(),
        address: yup.string().required(),
        phone_number: yup.string().required(),
    })
    .required()


const Form = ({ update, setUpdate }: { update: IStudent | null, setUpdate: Dispatch<SetStateAction<null | IStudent>> }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const { createBlog, updateBlog } = useBlog();
    const { mutate: mutateCreate, isPending: isPendingCreate } = createBlog;
    const { mutate: mutateUpdate, isPending: isPengingUpdate } = updateBlog;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (update) {
            reset({
                fname: update.fname,
                lname: update.lname,
                birthdate: update.birthdate,
                address: update.address,
                phone_number: update.phone_number,
            });
        } else {
            reset({
                fname: "",
                lname: "",
                birthdate: "",
                address: "",
                phone_number: ""
            });
        }
    }, [update]);

    const onSubmit = (data: IStudentForm) => {
        if (!(data.fname.trim() && data.lname.trim() || data.birthdate.trim() || data.address.trim() || data.phone_number.trim())) {
            return null
        }

        if (update) {
            const updatedData = {
                ...data,
                id: update.id
            }
            mutateUpdate(updatedData, {
                onSuccess: () => {
                    console.log("Update Success");
                    messageApi.success("Edited");
                    setUpdate(null);
                },
                onError: () => {
                    messageApi.error("Something went wrong! Couldn't edited, please try again");
                    console.log("Update Success");
                }
            });
        } else {
            const newBlog: IStudent = {
                ...data,
                id: (new Date().getTime()).toString(),
            }

            mutateCreate(newBlog, {
                onSuccess: () => {
                    console.log("Create Success");
                    messageApi.success("Created");
                    reset();
                },
                onError: () => {
                    messageApi.error("Something went wrong! Couldn't created, please try again");
                    console.log("Create Error");
                },
            });
        }
    }

    const handleEditCancel = () => {
        setUpdate(null);
    }

    return (
        <section className='section_form'>
            {contextHolder}
            <div className='container'>
                <div className='form_wrapper h-[190px] pt-4 flex flex-col gap-2'>
                    <h1 className='text-lg'>Create & Edit</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full sm:max-w-[850px] flex items-start gap-2 md:gap-3'>
                        <div className='flex flex-col gap-2 w-full'>
                            <input {...register("fname")} autoComplete='off' className={`w-full h-9 px-2 outline-none border ${errors.fname ? "border-pink-700" : "border-gray-400"}`} type="text" placeholder='Firstname' />
                            <input {...register("lname")} autoComplete='off' className={`w-full h-9 px-2 outline-none border ${errors.lname ? "border-pink-700" : "border-gray-400"}`} type="text" placeholder='Lastname' />
                            <input {...register("birthdate")} autoComplete='off' className={`w-full h-9 px-2 outline-none border ${errors.birthdate ? "border-pink-700" : "border-gray-400"}`} type="text" placeholder='Birthdate' />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <input {...register("address")} autoComplete='off' className={`w-full h-9 px-2 outline-none border ${errors.address ? "border-pink-700" : "border-gray-400"}`} type="text" placeholder='Address' />
                            <input {...register("phone_number")} autoComplete='off' className={`w-full h-9 px-2 outline-none border ${errors.phone_number ? "border-pink-700" : "border-gray-400"}`} type="text" placeholder='Phone Number' />
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-1'>
                                    <button onClick={handleEditCancel} type='button' className={`${update ? "block" : "hidden"} flex-1/2 h-9 border border-black cursor-pointer`}>
                                        Cancel
                                    </button>
                                    <button className={`${update ? "flex-1/2" : ""} h-9 w-full bg-primary cursor-pointer ${update && isPengingUpdate ? "opacity-70" : isPendingCreate ? "opacity-70" : ""}`} type='submit'>
                                        {
                                            isPendingCreate || isPengingUpdate ?
                                                <div className='flex items-center justify-center gap-2'>
                                                    <LoadingOutlined className='animate-spin text-white' />
                                                    {
                                                        update ? "Saving..." : "Creating..."
                                                    }
                                                </div>
                                                :
                                                <span>
                                                    {
                                                        update ? "Save" : "Create"
                                                    }
                                                </span>
                                        }
                                    </button>
                                </div>
                                <p className='text-pink-700'>{(errors.fname || errors.lname || errors.birthdate || errors.address || errors.phone_number) ? "Please, fill all inputs" : ""}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default React.memo(Form);