const express =require ("express");
const contactRouter = express.Router();
const {check, validationResult} = require("express-validator");
const ContactModel = require("./models/contact")
const auth = require ("../middleware/auth")
const userModel = require("./models/schema")


// @ route    get api/contacts
// get all users contacts  private
contactRouter.get('/', auth, async(req,res)=>{
    try{
        // you find the user where is matches the re.user.id in the middleware and we sort by recent date
        // const contacts = await ContactModel.find ({user:req.user.id}.Sort({date:-1}))
        const contacts = await ContactModel.find ({user:req.user.id})
        res.json(contacts);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @ route    post api/contacts
// add contacts   private
contactRouter.post('/', [auth,[
    check('name', 'Name is required').not().isEmpty()

]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

const {name, email,phone,type} = req.body;
try{
    const newContact = new ContactModel({
        name,
        email,
        type,
        phone,
        user: req.user.id
    });
    const contact = await newContact.save();
    res.send(contact)
}catch(err){
    console.error(err.message)
    res.status(500).send('server Error')
}
})


// delete a contact
contactRouter.delete('/:id', (req,res)=>{
    res.send('delete contact')
})


module.exports = contactRouter;