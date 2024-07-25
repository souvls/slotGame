import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isAdmin from '../../../Middleware/isAdmin';
import { update_money } from '@/Middleware/my-money';




// import { format } from 'date-fns'
// const getDate = () => {
//     const now = new Date();
//     const data = format(now, 'dd/MM/yy HH:mm:ss');
//     return data;
// }
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isAdmin(req, res, async () => {
        
            if (req.method === 'PATCH') {
                const result = await update_money();
                if(result){
                    res.status(200).json({ status: 'ok', message: 'success' });
                }else{
                    res.status(401).json({ status: 'no', message: 'no' });
                }
            } else {
                res.setHeader('Allow', ['PATCH']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    });


}