const router = require('express').Router();
const { Category, Product } = require('../../models');


// Finds all categories and includes the products associated with each category
router.get('/', (req, res) => {

  Category.findAll({
      include: [{ model: Product }],
    }).then((categoryData) => {
      res.json(categoryData);
    });
});

// Finds a single product by it's category id
router.get('/:id', (req, res) => {
  
  Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

// Creates a new category
router.post('/', (req, res) => {
 
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Updates a single category based on its id
router.put('/:id', (req, res) => {
  
  Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

// deletes a category by its associated ID
router.delete('/:id', (req, res) => {
  
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
