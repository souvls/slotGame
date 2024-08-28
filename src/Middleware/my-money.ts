import md5 from "md5";

const Maintenance = require('../Models/Maintenance');
const Member = require('../Models/Member');
export const update_money = async () => {
    try {
        const now = new Date();
        const request_time = now.getTime();
        const hash = md5(request_time + '' + process.env.NEXT_PUBLIC_SECRET_KEY + "getwagers" + process.env.NEXT_PUBLIC_OP_CODE);
        const maintenance = await Maintenance.findById("668a22755b202996ef18608e");
        const members = await Member.find();
        const wager = await fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/wagers" + "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE + "&sign=" + hash + "&request_time=" + request_time).then((response) => response.json())
        for (const i of members) {
            var bet_amount = 0;
            var prized_amount = 0;
            const x = i.Name
            for (const j of wager.wagers) {
                if (new Date(j.created_at) >= new Date(maintenance.DateStart) && new Date(j.created_at) <= new Date(maintenance.DateEnd)) {
                    if (x === j.member_account.slice(0, -2)) {
                        bet_amount += j.bet_amount
                        prized_amount += j.prized_amount
                    }
                }
            }
            Member.findByIdAndUpdate(
                { _id: i._id },
                {
                    $set: {
                        Total_bet_amount: bet_amount,
                        Total_prized_amount: prized_amount,
                        Total_result: bet_amount - prized_amount,
                        Total_free: (bet_amount - prized_amount) - (bet_amount - prized_amount) * (i.PartnersPercent / 100),
                        Total_pay: (bet_amount - prized_amount) * (i.PartnersPercent / 100)
                    }
                },
                { new: true }
            ).then((result: any) => {
                //console.log(result)
                return true;
            })
        }
    } catch (err) {
        console.log(err)
        return true;
    }
}