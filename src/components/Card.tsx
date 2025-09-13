import React, { useState, type Dispatch, type SetStateAction } from 'react'
import { useBlog } from '../api/hooks/useBlog';
import { message } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import type { IStudent } from '../types';

const Card = ({ update, setUpdate, searchValue }: { update: IStudent | null, setUpdate: Dispatch<SetStateAction<null | IStudent>>, searchValue: string }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { getBlog, deleteBlog } = useBlog();
    const { mutate, isPending } = deleteBlog;

    const { data } = getBlog;
    const blogData: IStudent[] = data;
    const searchData: IStudent[] = data?.filter((item: IStudent) => ((item.fname + item.lname + item.address + item.phone_number + item.birthdate).toLowerCase()).includes((searchValue.toLowerCase().replace(/\s+/g, ""))));

    const [IDDelete, setIDDelete] = useState<string>("");

    const handleDelete = (id: string) => {
        setIDDelete(id);
        mutate(id, {
            onSuccess: () => {
                console.log("Delete Success");
                messageApi.success('Deleted');
                setIDDelete("");
                setUpdate(null);
            },
            onError: () => {
                console.log("Delete Error");
                messageApi.error('Something went wrong! Could\'nt deleted, please try again');
                setIDDelete("");
            }
        });
    }

    const handleEdit = (item: IStudent) => {
        setUpdate(item);
    }

    return (
        <section className='section_card'>
            {contextHolder}
            <div className='container'>
                <div className='card_wrapper pt-2 pb-16 flex flex-col gap-2'>
                    <h1 className='text-lg'>Students</h1>
                    <div className='cards grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 '>
                        {
                            (blogData && searchData) && [...searchData]?.reverse()?.map((item) => (

                                <div key={item.id} className={`${update?.id === item.id ? "border-[#99eb0c]" : "border-gray-400"} border py-2 flex flex-col tracking-wide`}>
                                    <div className='flex items-center justify-between border-b-[.5px] pb-2 mb-2 border-gray-400 px-2 sm:xpx-3'>
                                        <div>
                                            <UserOutlined className='text-lg' />
                                        </div>
                                        <div className='flex items-center gap-2 pr-1.5 sm:pr-1'>
                                            {
                                                update?.id === item.id ?
                                                    <button className='cursor-pointer border-r-[0.5px] opacity-40 border-gray-400 pr-2'>Editing...</button>
                                                    :
                                                    <button onClick={() => handleEdit(item)} className='cursor-pointer border-r-[0.5px] border-gray-400 pr-2'>Edit</button>
                                            }
                                            <button onClick={() => handleDelete(item.id)} className='w-11 h-6 cursor-pointer flex items-center justify-center text-pink-700 pl-2'>
                                                {
                                                    (isPending && IDDelete == item.id) ? <LoadingOutlined className='animate-spin text-white' /> : <span>Delete</span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1.5 px-2 md:px-3'>
                                        <div className='flex flex-col md:flex-row md:gap-1'>
                                            <p className='text-gray-600 text-[15px]'>Full name:</p>
                                            <p className='capitalize'>{item.fname} {item.lname}</p>
                                        </div>
                                        <div className='flex flex-col md:flex-row md:gap-1'>
                                            <p className='text-gray-600 text-[15px]'>Birthdate:</p>
                                            <p className='capitalize'>{item.birthdate}</p>
                                        </div>
                                        <div className='flex flex-col md:flex-row md:gap-1'>
                                            <p className='text-gray-600 text-[15px]'>Address:</p>
                                            <p className='capitalize'>{item.address}</p>
                                        </div>
                                        <div className='flex flex-col md:flex-row md:gap-1'>
                                            <p className='text-gray-600 text-[15px]'>Phone Number:</p>
                                            <p className='capitalize'>{item.phone_number}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section >
    )
}

export default React.memo(Card);