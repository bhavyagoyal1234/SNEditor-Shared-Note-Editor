const express=require("express");
const router=express.Router();
const noteController=require("../controllers/note")

router.post("/add",noteController.createNotes);
router.post("/update",noteController.updateUsers);
router.get("/get",noteController.getNotes);
module.exports=router;
 