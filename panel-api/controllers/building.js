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
      res.json('Item added successfully');
    })
    .catch(err => {
      res.status(400).send("Unable to create new item");
    });
};

exports.update = (req, res) => {
  BuildingModel.updateOne({_id: req.params.id}, {
    $set:
      {
        title: req.body.title,
        address: req.body.address,
        neighborhood: req.body.neighborhood,
        date: req.body.date
      }
  }).then(building => {
    res.json("Item updated successfully");
  })
    .catch(err => {
      res.status(400).send("Unable to update item.")
    });
};

exports.delete = (req, res) => {
  BuildingModel.findByIdAndRemove({_id: req.params.id}).then(building => {
    res.json("Item deleted successfully");
  })
    .catch(err => {
      res.status(400).send("Unable to delete item");
    });
};
