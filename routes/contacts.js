const express =require ("express");
const contactRouter = express.Router();

// @ route    get api/contacts
// get all users contacts  private
contactRouter.get('/', (req,res)=>{
    res.send('register a user')
})

// @ route    post api/contacts
// add contacts   private
contactRouter.post('/', (req,res)=>{
    res.send('register a user')
})


// delete a contact
contactRouter.delete('/:id', (req,res)=>{
    res.send('delete contact')
})


module.exports = contactRouter;