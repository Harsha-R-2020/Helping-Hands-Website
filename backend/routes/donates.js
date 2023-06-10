const router = require('express').Router();
let donate = require('../models/donate.model');
router.route('/v').get((req, res) => {
  const name = req.query.name;
  if(!name){
    return res.status(422).json({error:"/login"})
  }
  donate.find({ name: { $ne: name } })
    .then(donates => res.json(donates))
    .catch(err => res.status(400).json({error:"Some error occured"}));
});
router.route('/view').get((req, res) => {
  const name = req.query.name;
  if(!name){
    return res.status(422).json({error:"/login"})
  }
  donate.find({name: name})
    .then(donates => res.json(donates))
    .catch(err => res.status(400).json({error:"Some error occured"}));
});

router.route('/donate').post((req, res) => {
  const name=req.body.name;
  const pname = req.body.pname;
  const quant = req.body.quant;
  const description = req.body.description;
  if(!name){
    return res.status(422).json({error:"/login"})
  }
  else if(!pname || !quant || !description){
    return res.status(422).json({error:"Mandatory fields"})
  }
  else if(!pname.match(/^[a-zA-Z ]*$/)){
    return res.status(422).json({error:"Product Name should only contain alphabets"})
  }
  else if(!quant.match(/^[1-9][0-9]*$/)){
    return res.status(422).json({error:"Quantity is badly formatted"})
  }
  const newdonate = new donate({
    name,
    pname,
    quant,
    description,
  });

  newdonate.save()
  .then(() => res.json({message:'Donation added!'}))
  .catch(err => res.status(400).json({error:"Some error ocurred"}));;
});
router.route('/delete').delete((req, res) => {
  const id=req.query.id;
  donate.findByIdAndDelete(id)
    .then(() => res.json('Donation Deleted'))
    .catch(err => res.status(400).json('Internal Error..'));
});

module.exports = router;