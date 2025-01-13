import axios from 'axios';
import React from 'react'
interface User {
    "_id": string
    "Username": string
    "Password": string
    "Amount": number,
    "Role": string
    "isOnline": boolean,
    "status": boolean,
    "createdAt": string
    "updatedAt": string
}
interface Props {
    setUpdateUserList: React.Dispatch<React.SetStateAction<boolean>>
    user: User
    onCancel: () => void;
}
export const EditUser: React.FC<Props> = ({ setUpdateUserList, user, onCancel }) => {
    const [username, setUsername] = React.useState(user.Username);
    const [password, setPassword] = React.useState(user.Password);
    const [amount, setAmount] = React.useState<number>(user.Amount);
    const [loading, setLoading] = React.useState(false);
    const [enableBtn, setEnableBtn] = React.useState<boolean>(false)
    const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`/api/member/users`,
                {
                    id: user._id,
                    Password: password,
                }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            setLoading(false);
            if (res.data.code === 0 || res.data.code === 222) {
                setUpdateUserList(true);
                onCancel();
                window.alert(res.data.message);
            } else {
                window.alert(res.data.message)
            }
        } catch (error) {
            setLoading(false);
            throw error;
        }

    }
    return (
        <div className='w-[500px] mx-auto my-5'>
            {loading && <p className=' text-yellow-400 text-center'>loading...</p>}
            <form onSubmit={handleSumit}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Username</label>
                    <input
                        type='text'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none'
                        value={username}
                        readOnly
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Password</label>
                    <input
                        type='text'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        value={password}
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setEnableBtn(true);
                        }}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>ຈຳນວນເງິນ</label>
                    <input
                        type='text'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        value={amount.toLocaleString()}
                        readOnly
                    />
                </div>
                <div className=' flex justify-between gap-5'>
                    {enableBtn &&
                        <button
                            type='submit'
                            className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                        >
                            ບັນທຶກ
                        </button>}
                    <button
                        type='button'
                        onClick={onCancel}
                        className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    >
                        ຍົກເລີກ
                    </button>
                </div>
            </form>
        </div>
    )
}
export default EditUser
