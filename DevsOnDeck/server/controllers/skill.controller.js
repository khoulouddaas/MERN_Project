const Skill=require("../models/skill.model")

module.exports.createNewSkill=(req,res)=>{
    Skill.create(req.body)
    .then(newSkill=>{
        res.json({Skill:newSkill})
    })
    .catch(err => res.status(400).json(err))
}

