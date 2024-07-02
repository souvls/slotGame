class isSuperAdmin{
    static check = async (req, res, next)=>{
        if(req.data.role === process.env.SUPER_ADMIN_KEY){ 
            return next();
        }else{
            return res.status(401).json({ status: "no", msg: "ບໍ່ໄດ້ຮັບອະນຸຍາດ" });
        }
    }
}
module.exports = isSuperAdmin;