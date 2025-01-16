import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const basicAuth = Buffer.from(`INFINITY999THB:ffa959af-503f-4bcc-8ba8-578bf32fba8f`).toString('base64');
        // const requestOptions = {
        //     method: "POST",
        //     redirect: "follow",
        //     headers: {
        //         Authorization: `Basic ${credentials}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: {
        //         "username": "test00001",
        //         "productId": "PRETTY"
        //     }
        // };

        // fetch("https://test.ambsuperapi.com/member", requestOptions)
        //     .then((response) => response.text())
        //     .then((result) => console.log(JSON.parse(result)))
        //     .catch((error) => console.error(error));
        try {

            //       API_NAME = https://production.gsimw.com
            // AMB_API_NAME = https://test.ambsuperapi.com
            // AMB_URL = https://api688.net
            // AMB_SCRET = 846efe94-8787-49eb-9094-4d8d14d3c30f
            const result = await axios.post(`https://test.ambsuperapi.com/member`,
                {
                    "username": "test00001",
                    "productId": "PRETTY"
                },
                {
                    headers: {
                        'Authorization': `Basic ${basicAuth}`,
                        'Content-Type': 'application/json',
                    },
                })
            console.log(result.data)
            res.status(200).json(result.data);
        } catch (error) {
            console.log(error)
            res.status(200).json(error);

        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}