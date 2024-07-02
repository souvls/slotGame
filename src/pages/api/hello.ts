import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'GET') {
        // Handle GET request
        res.status(200).json({ message: 'This is a GET request' });
    } else if (req.method === 'POST') {
        // Handle POST request
        const data = req.body;
        res.status(200).json({ message: 'This is a POST request'});
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}