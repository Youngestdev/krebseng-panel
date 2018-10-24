const BuildingModel = require("../model/buildingSchema");

exports.list = (req, res) => {

  BuildingModel.find({user: req.user.name}).then(
    building => {
      res.json(building);
    }
  )
    .catch(err => {
      console.log(err);
      res.status(422).send(err.errors);
    });

};

exports.get = (req, res) => {
  BuildingModel.findById(req.params.id).exec((err, building) => {
    if (err) res.status(404).send(err);
    res.json(building)
  })
};

exports.create = (req, res) => {
  const building = new BuildingModel(req.body);
  building.save()
    .then(building => {
      res.json('Server added successfully');
    })
    .catch(err => {
      res.status(400).send("Unable to create new item");
    });
};
