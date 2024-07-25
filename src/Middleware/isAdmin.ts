
import { NextApiRequest, NextApiResponse } from 'next';
const isAdmin = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
        const user: any = req.headers.data
        if(user.role === process.env.code_1){
            next();
        }else{
            res.status(400).json({status:'no', message: 'role not admin' });
        }
    } catch (err) {
        res.status(400).json({status:'no', message: 'noadmin' });
    }
};

export default isAdmin;