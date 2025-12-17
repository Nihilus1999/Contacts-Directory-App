import { Op, UniqueConstraintError } from "sequelize";
import { Contact } from "../models/Contact.js";
import { sequelize } from "../database/database.js";

// GET /contacts?search=
export const getContacts = async (req, res) => {
  try {
    const { search } = req.query;

    const where = search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
            { phone: { [Op.iLike]: `%${search}%` } },
            { company: { [Op.iLike]: `%${search}%` } }
          ]
        }
      : {};

    const contacts = await Contact.findAll({ where });

    if (contacts.length === 0) {
      return res.status(200).json({
        message:"No hay contactos registrados con el filtro proporcionado",
        data: []
      });
    }

    return res.status(200).json({
      message: "Contactos obtenidos correctamente",
      data: contacts
    });
  } catch (error) {
    console.error("getContacts error:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      detail: error.parent?.message || error.message
    });
  }
};

// GET /contacts/:id
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        message: `No se encontró ningún contacto con el id ${id}`
      });
    }

    return res.status(200).json({
      message: "Contacto obtenido correctamente",
      data: contact
    });
  } catch (error) {
    console.error("getContactById error:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      detail: error.parent?.message || error.message
    });
  }
};

// POST /contacts
export const createContact = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const contact = await Contact.create(req.body, { transaction });

    await transaction.commit();

    return res.status(201).json({
      message: "El contacto se creó correctamente",
      data: contact
    });
  } catch (error) {
    await transaction.rollback();
    console.error("createContact error:", error);

    // Defensa en capas (BD)
    if (error instanceof UniqueConstraintError) {
      const field = error.errors?.[0]?.path || "campo";
      return res.status(409).json({
        message: `El ${field} ya existe en la base de datos`
      });
    }

    return res.status(400).json({
      message: "Error al crear el contacto",
      detail: error.parent?.message || error.message
    });
  }
};

// PUT /contacts/:id
export const updateContact = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id, { transaction });

    if (!contact) {
      await transaction.rollback();
      return res.status(404).json({
        message: `No se encontró ningún contacto con el id ${id}`
      });
    }

    await contact.update(req.body, { transaction });

    await transaction.commit();

    return res.status(200).json({
      message: "El contacto se actualizó correctamente",
      data: contact
    });
  } catch (error) {
    await transaction.rollback();
    console.error("updateContact error:", error);

    if (error instanceof UniqueConstraintError) {
      const field = error.errors?.[0]?.path || "campo";
      return res.status(409).json({
        message: `El ${field} ya existe en la base de datos`
      });
    }

    return res.status(500).json({
      message: "Error interno del servidor",
      detail: error.parent?.message || error.message
    });
  }
};

// DELETE /contacts/:id
export const deleteContact = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id, { transaction });

    if (!contact) {
      await transaction.rollback();
      return res.status(404).json({
        message: `No se encontró ningún contacto con el id ${id}`
      });
    }

    await contact.destroy({ transaction });

    await transaction.commit();

    return res.status(200).json({
      message: "El contacto se eliminó correctamente"
    });
  } catch (error) {
    await transaction.rollback();
    console.error("deleteContact error:", error);

    return res.status(500).json({
      message: "Error interno del servidor",
      detail: error.parent?.message || error.message
    });
  }
};