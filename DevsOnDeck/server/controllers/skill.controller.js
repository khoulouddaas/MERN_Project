const Skill=require("../models/skill.model")

module.exports.createNewSkill = (req, res) => {
  const devId = req.params.devId;
  const { languages, bio } = req.body;

  if (!devId) {
    return res.status(400).json({ error: 'devId is required in URL' });
  }

  Skill.create({ devId, languages, bio })
    .then(newSkill => res.json({ skill: newSkill }))
    .catch(err => res.status(400).json(err));
};


