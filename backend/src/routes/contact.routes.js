import { Router } from "express";
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from "../controllers/contact.controller.js";

import {
  validateContact,
  validateContactId
} from "../validators/contact.validator.js";

const router = Router();

router.get("/", getContacts);
router.get("/:id", validateContactId, getContactById);
router.post("/", validateContact, createContact);
router.put("/:id", validateContactId, validateContact, updateContact);
router.delete("/:id", validateContactId, deleteContact);

export default router;
