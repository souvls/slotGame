
import { NextApiRequest, NextApiResponse } from 'next';
const Maintenance = require("../Models/Maintenance");

const verifyJWTToken = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
        await Maintenance.findById("668a22755b202996ef18608e")
            .then((result: any) => {
                //console.log(result)
                if (result.Online === true) {
                    next();
                } else {
                    res.status(400).json({ status: 'off', message: 'ປິດປັປປຸງລະບົບ' });
                }
            })

    } catch (err) {
        console.log(err)
        res.status(400).json({ status: 'no', message: 'database error' });
    }
};

export default verifyJWTToken;