const express=require("express");
const router=express.Router();
const authRoute=require("./auth");
const noteRoute=require("./note");

router.use("/auth",authRoute);
router.use("/notes",noteRoute);


module.exports=router;
