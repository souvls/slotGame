import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const product_code = req.query.product_code;
        const request_time = Math.floor(Date.now() / 1000);
        const hash = md5(`${request_time}${process.env.SECRET_KEY}gamelist${process.env.OP_CODE}`);
        fetch(process.env.API_NAME + "/api/operators/provider-games" +
            "?product_code=" + product_code +
            "&operator_code=" + process.env.OP_CODE +
            "&game_type=" + "SLOT" +
            "&sign=" + hash +
            "&request_time=" + request_time
            // "&offset=" + 24 +
            // "&size=" + 24

        )
            .then((response) => response.json())
            .then(result => {
                const x = result.provider_games.reduce((acc: any, current: any) => {
                    if (current.status === "ACTIVATED" && !acc.find((item: any) => (item.game_code === current.game_code))) {
                        acc.push(current);
                    }
                    return acc;
                }, []);
                // console.log(result)
                // const x: any = [{}];
                // for (const i of result.provider_games) {
                //     // console.log(i)
                //     if (i.status === "ACTIVATED") {
                //         // const z = x.find((x: any) => x.game_name === i.game_name);

                //         // console.log(z?.game_name)
                //         if (i.game_name === "Heist Stakes") {
                //             x.push(i)

                //         }

                //     }
                // }
                res.status(200).json({ length: x.length, game: x });
                // console.log(game);
                // setGames(game);/
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    } else if (req.method === 'POST') {

    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}