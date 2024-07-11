
import { NextApiRequest, NextApiResponse } from 'next';
const isMember = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
        const user: any = req.headers.data
        if(user.role === process.env.code_2){
            next();
        }else{
            res.status(400).json({status:'no', message: 'nomember' });
        }
    } catch (err) {
        res.status(400).json({status:'no', message: 'nomember' });
    }
};

export default isMember;