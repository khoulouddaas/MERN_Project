const PositionSchema = require('../models/position.model');
const Developer = require('../models/developer.model');
const Skill = require('../models/skill.model');
// Read All
module.exports.FindAllPosition = async (req, res) => {
  try {
    const allPositions = await PositionSchema.find();
    res.status(200).json(allPositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create
module.exports.createPosition = (req, res) => {
  PositionSchema.create(req.body)
    .then(newPosition => {
      res.status(201).json({ message: 'Position created successfully', position: newPosition });
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        for (const field in err.errors) {
          validationErrors[field] = err.errors[field].message;
        }
        return res.status(400).json({ error: 'Validation failed', validationErrors });
      }
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Read One
module.exports.FindOneSinglePosition = (req, res) => {
  PositionSchema.findOne({ _id: req.params.positionId })
    .then(oneSinglePosition => {
      res.json(oneSinglePosition);
    })
    .catch((err) => {
      res.json(err);
    });
};


module.exports.FindDevsForPosition = async (req, res) => {
  try {
    const position = await PositionSchema.findById(req.params.positionId);
    if (!position) return res.status(404).json({ message: 'Position not found' });

    const requiredSkills = position.Skills || [];

    // Load all skills and populate devId to get developer info
    const allSkills = await Skill.find().populate('devId');

    // Filter developers who have at least 2 matching skills
    const matchingDevs = allSkills
      .filter(skillDoc => {
        const devSkills = skillDoc.languages || [];
        const commonSkills = devSkills.filter(skill => requiredSkills.includes(skill));
        return commonSkills.length >= 2 && skillDoc.devId; // Ensure developer exists
      })
      .map(skillDoc => ({
        _id: skillDoc.devId._id,
        firstName: skillDoc.devId.firstName,
        lastName: skillDoc.devId.lastName,
        bio: skillDoc.bio,
        languages: skillDoc.languages,
      }));

    res.status(200).json(matchingDevs);
  } catch (error) {
    console.error('Error finding developers for position:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
