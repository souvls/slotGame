
import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';

const AddNewUser: React.FC<{ setUpdateUserList: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setUpdateUserList }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [amount, setAmount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState(false);

    const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username.length !== 4) {
            Swal.fire({
                title: "<p>ຊື່ຢູເຊີ້ ຕ້ອງ 4 ໂຕ</p>",
                icon: "error"
            });
            return
        }
        try {
            setLoading(true);
            const res = await axios.post(`/api/member/users`,
                {
                    Username: username,
                    Password: password,
                    Amount: amount
                }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            setLoading(false);
            if (res.data.code === 0 || res.data.code === 222) {
                setUsername('');
                setPassword('');
                setAmount(0);
                setUpdateUserList(true);
                window.alert(res.data.message)
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
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        value={username}
                        maxLength={4}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Password</label>
                    <input
                        type='password'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>ຈຳນວນເງິນ</label>
                    <input
                        type='number'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min={0}
                    />
                </div>
                <button
                    type='submit'
                    className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                    ເພີ່ມເຊີ
                </button>
            </form>
        </div>
    )
}

export default AddNewUser