const PositionSchema = require('../models/position.model');

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
        // Handle validation errors
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
  PositionSchema.findOne({ _id: req.params.PositionId })
    .then(oneSinglePosition => {
      res.json(oneSinglePosition);
    })
    .catch((err) => {
      res.json(err);
    });
};

