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

const sendEmail = require("../utils/sendEmail");

module.exports.FindDevsForPosition = async (req, res) => {
  try {
    const position = await PositionSchema.findById(req.params.positionId);
    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }

    const requiredSkills = position.Skills || [];

    const allSkills = await Skill.find().populate('devId');

    const matchingDevs = allSkills
      .filter(skillDoc => {
        const devSkills = skillDoc.languages || [];
        const commonSkills = devSkills.filter(skill => requiredSkills.includes(skill));
        return commonSkills.length >= 2 && skillDoc.devId;
      })
      .map(skillDoc => ({
        _id: skillDoc.devId._id,
        firstName: skillDoc.devId.firstName,
        lastName: skillDoc.devId.lastName,
        email: skillDoc.devId.email,
        bio: skillDoc.bio,
        languages: skillDoc.languages,
      }));

    // Respond immediately
    res.status(200).json(matchingDevs);

    // Then send emails asynchronously, without blocking response
matchingDevs.forEach(dev => {
  if (dev.email) {
    sendEmail(
      dev.email,
      "New Job Position Available",
      `Hi ${dev.firstName},

We’re excited to let you know that we’ve found a new job position — "${position.Name}" — that matches your skills and experience. 
We believe you could be a great fit for this opportunity and look forward to seeing your contribution.

If selected, you’ll be expected to join the team starting at 9:00 AM on the assigned workdays, collaborating with other talented developers 
to deliver high-quality results. This position is a great chance to grow your expertise, work on exciting projects, 
and make an impact.

Congrats for being part of our network! We’ll be in touch with more details soon.

Best regards,  
The Recruitment Team`
    ).catch(err => console.error(`Failed to send email to ${dev.email}:`, err));
  }
});


  } catch (error) {
    console.error('Error finding developers for position:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
