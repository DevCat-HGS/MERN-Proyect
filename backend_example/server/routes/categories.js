const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Crear una nueva categoría
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener una categoría por ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar una categoría por ID
router.patch('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar una categoría por ID
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
