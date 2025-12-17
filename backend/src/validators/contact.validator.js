import { Contact } from "../models/Contact.js";
import { check, param } from "express-validator";
import { validateResult } from "../helpers/handleValidator.js";
import { validate as validateUUID } from "uuid";

// VALIDACIÓN CAMPOS CONTACTO
export const validateContact = [
  // NAME
  check("name")
    .optional({ nullable: true })
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ max: 100 })
    .withMessage("El nombre debe tener máximo 100 caracteres"),

  // EMAIL
  check("email")
    .optional({ nullable: true })
    .isEmail()
    .withMessage("Correo electrónico inválido")
    .isLength({ max: 255 })
    .withMessage("El correo electrónico debe tener máximo 255 caracteres")
    .custom(async (value, { req }) => {
      // Si es PUT y no enviaron email, no se valida duplicado
      if (req.method === "PUT" && (value === null || value === undefined)) return true;

      // CREATE
      if (req.method === "POST") {
        const existing = await Contact.unscoped().findOne({
          where: { email: value },
          paranoid: false
        });
        if (existing) throw new Error("Ya existe un contacto con este correo electrónico");
      }

      // UPDATE
      if (req.method === "PUT") {
        const { id } = req.params;
        const existing = await Contact.unscoped().findOne({
          where: { email: value },
          paranoid: false
        });
        if (existing && existing.id !== id) {
          throw new Error("Otro contacto ya utiliza este correo electrónico");
        }
      }

      return true;
    }),

  // PHONE
  check("phone")
    .optional({ nullable: true })
    .isMobilePhone()
    .withMessage("Número de teléfono inválido")
    .custom(async (value, { req }) => {
      // Si es PUT y no enviaron phone, no se valida duplicado
      if (req.method === "PUT" && (value === null || value === undefined)) return true;

      // CREATE
      if (req.method === "POST") {
        const existing = await Contact.unscoped().findOne({
          where: { phone: value },
          paranoid: false
        });
        if (existing) throw new Error("Ya existe un contacto con este número de teléfono");
      }

      // UPDATE
      if (req.method === "PUT") {
        const { id } = req.params;
        const existing = await Contact.unscoped().findOne({
          where: { phone: value },
          paranoid: false
        });
        if (existing && existing.id !== id) {
          throw new Error("Otro contacto ya utiliza este número de teléfono");
        }
      }

      return true;
    }),

  // COMPANY (opcional)
  check("company")
    .optional({ nullable: true })
    .isLength({ max: 150 })
    .withMessage("La empresa debe tener máximo 150 caracteres"),

  (req, res, next) => {
    validateResult(req, res, next);
  }
];

// VALIDACIÓN PARA :id (UUID)
export const validateContactId = [
  param("id").custom((value) => {
    if (!validateUUID(value)) {
      throw new Error("El id del contacto debe ser del tipo UUID");
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];