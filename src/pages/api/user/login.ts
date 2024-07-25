import type { NextApiRequest, NextApiResponse } from 'next'
import checkMaintenance from '../../../Middleware/checkMaintenance';

const User = require('../../../Models/User');
const Token = require('../../../Middleware/Token');

// type ResponseData = {
//     status: string,
//     message: string,
//     token: string
// }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        if (req.method === 'POST') {
            try {
                // Handle POST request
                const { Username, Password } = req.body;
                const result = await User.findOne({ Username: Username, Password: Password })
                if (result) {
                    const token = await Token.genToken2(result._id, result.Username, result.Role)
                    res.status(200).json({ status: 'ok', message: 'login succes', token: token, result: {_id:result._id, Username:result.Username, Password:result.Password, Rold:result.Role} });
                } else {
                    res.status(200).json({ status: 'no', message: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານ ຜິດ! ກະລຸນາຕິດຕໍ່ ເອເຢັນ'});
                }
            } catch (err) {
                //throw err
                res.status(400).json({ status: 'no', message: err});

            }
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    })
}