import logo from '../../../../public/assets/logo/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr';
interface Member {
    Name: string,
    Username: string
    Amount: number
}

const fetcher = (url: string) =>
    fetch(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }).then(res => res.json());
const Navbar: React.FC<{ token: string }> = (token) => {

    const { data, error } = useSWR("/api/member/my-info", fetcher,
        { refreshInterval: 1000 }
    );
    if (error) {

    }
    if (!data) {
        return (
            <div className=' w-[1200px] bg-gray-900'>
                <div className=' flex justify-between items-center p-2'>
                    <div className=' flex items-center  gap-4'>
                        <div>
                            <Image src={logo} alt='logo' width={20} height={20} />
                        </div>
                        <div className=' text-[14px]'>
                            <p className=' text-yellow-200'>name: </p>
                            <p className=' text-yellow-200'>username: </p>
                            <p className=' text-yellow-200'>ຍອດເງິນ: 0</p>
                        </div>
                        <div className=' text-[14px]'>
                            <p className=' text-yellow-200 flex gap-1'>
                                <Link href='/member/office'>ສະມາຊິກ</Link>-
                                <Link href='/member/office/history/my_history_credit'>ປະຫວັດເຄດິດ</Link>-
                                <Link href='/member/office/report'>ລາຍງານ</Link>-
                                <Link href='#'>ປະຊາສຳພັນ</Link>
                            </p>
                        </div>
                    </div>
                    <div>
                        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Logout
                        </button>
                    </div>
                </div>

            </div>
        )
    }
    if (data) {
        if (data)
            return (
                <div className=' w-[1200px] bg-gray-900'>
                    <div className=' flex justify-between items-center p-2'>
                        <div className=' flex items-center  gap-4'>
                            <div>
                                <Image src={logo} alt='logo' width={20} height={20} />
                            </div>
                            <div className=' text-[14px]'>
                                <p className=' text-yellow-200'>name: {data.Name}</p>
                                <p className=' text-yellow-200'>username: {data.Username}</p>
                                <p className=' text-yellow-300 text-[16px]'>ຍອດເງິນ: {data.Amount?.toLocaleString()}{" THB"}</p>
                            </div>
                            <div className=' text-[14px]'>
                                <p className=' text-yellow-200 flex gap-1'>
                                    <Link href='/member/office'>ສະມາຊິກ</Link>-
                                    <Link href='/member/office/history/my_history_credit'>ປະຫວັດເຄດິດ</Link>-
                                    <Link href='/member/office/report'>ລາຍງານ</Link>-
                                    <Link href='#'>ປະຊາສຳພັນ</Link>
                                </p>
                            </div>
                        </div>
                        <div>
                            <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Logout
                            </button>
                        </div>
                    </div>

                </div>
            )
    }
}

export default Navbar