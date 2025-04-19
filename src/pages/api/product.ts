import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const request_time = Math.floor(Date.now() / 1000);
        const hash = md5(`${request_time}${process.env.SECRET_KEY}productlist${process.env.OP_CODE}`);
        fetch(process.env.API_NAME + "/api/operators/available-products" +
            "?operator_code=" + process.env.OP_CODE +
            "&sign=" + hash +
            "&request_time=" + request_time)
            .then((response) => response.json())
            .then(async result => {
                console.log(result)
                const x: any = [{}];
                for (const i of result) {
                    if (i.game_type === "SLOT" && i.status === 'ACTIVATED') {
                        if (i.currency = "THB") {
                            x.push(i)
                        }
                        // console.log();

                    }
                }
                res.status(200).json(x);
            })
            .catch(err => {
                throw err
            })
    } else if (req.method === 'POST') {

    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
// const fetchProductList = () => {
//     const request_time = new Date().getTime();
//     const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}productlist${process.env.NEXT_PUBLIC_OP_CODE}`);
//     fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/available-products" +
//         "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
//         "&sign=" + hash +
//         "&request_time=" + request_time)
//         .then((response) => response.json())
//         .then(result => {
//             console.log(result)
//             // const x = [{}];
//             // result.forEach((item: any) => {
//             //     if (item.game_type === "SLOT" && item.status === 'ACTIVATED') {
//             //         x.push(item)
//             //     }
//             // });
//             // console.log(x);
//             //setProductList(x);
//         })
//         .catch(err => {
//             throw err
//         })
// }
// const handdlePlay = async (game: any) => {
//     try {
//         setLoadingGame(true);
//         const cookie = Cookies.get("userdata");
//         if (cookie) {
//             //const token = JSON.parse(cookie).token;
//             const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
//             const myHeaders = new Headers();
//             myHeaders.append("Content-Type", "application/json");
//             const request_time = new Date().getTime();

//             const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}launchgame${process.env.NEXT_PUBLIC_OP_CODE}`);
//             const raw = {
//                 "operator_code": process.env.NEXT_PUBLIC_OP_CODE,
//                 "member_account": JSON.parse(cookie).username,
//                 "password": JSON.parse(cookie).password,
//                 "currency": "THB",
//                 "game_code": game.game_code,
//                 "product_code": game.product_code,
//                 "game_type": game.game_type,
//                 "language_code": 0,
//                 "ip": ip.ip,
//                 "platform": "web",
//                 "sign": hash,
//                 "request_time": request_time,
//                 "operator_lobby_url": "http://infinity999.com",
//             }
//             fetch(`${process.env.NEXT_PUBLIC_API_NAME}/api/operators/launch-game`, {
//                 method: "POST",
//                 headers: myHeaders,
//                 body: JSON.stringify(raw),
//                 redirect: "follow"
//             })
//                 .then((response) => response.json())
//                 .then((result) => {
//                     console.log(result)
//                     if (result.code === 200) {
//                         router.push(result.url)
//                     } else {
//                         setLoadingGame(false);
//                         Swal.fire({
//                             icon: "warning",
//                             title: "<p>ຂໍອະໄພ</p>",
//                             html: "<p>ເກມກຳລັງປັບປຸງ</p>"
//                         })
//                     }
//                     setLoadingGame(false);
//                 }).catch((err) => {
//                     //Cookies.remove("userdata");
//                     console.log(err);
//                     setLoadingGame(false);
//                     Swal.fire({
//                         title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
//                         text: "020 98 399 064",
//                         icon: "error",
//                         background: '#000000',
//                         color: '#ffffff',
//                         showConfirmButton: false,
//                     }).then(() => {
//                         window.location.reload();
//                     });
//                 })
//         } else {
//             setLoadingGame(false);
//             Swal.fire({
//                 title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
//                 text: "020 98 399 064",
//                 icon: "error",
//                 background: '#000000',
//                 color: '#ffffff',
//                 showConfirmButton: false,
//             });
//         }
//     }
//     catch (err) {
//         console.log(err)
//         setLoadingGame(false);
//         Swal.fire({
//             title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
//             text: "02011223344",
//             icon: "error",
//             background: '#000000',
//             color: '#ffffff',
//             showConfirmButton: false,
//         });
//     }
// }