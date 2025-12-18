"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

import ContactsToolbar from "./components/ContactsToolbar";
import ContactsTable from "./components/ContactsTable";
import ContactFormDialog from "./components/ContactFormDialog";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import AppSnackbar from "./components/AppSnackbar";
import { ContactsService } from "@/services/contacts.services";

function extractList(data: any): any[] {
  return (
    data?.contacts ||
    data?.data ||
    data?.rows ||
    (Array.isArray(data) ? data : [])
  );
}

export default function ContactsPage() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info" as "info" | "success" | "error" | "warning",
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<any | null>(null);

  const showMessage = (severity: typeof snack.severity, message: string) =>
    setSnack({ open: true, severity, message });
  const closeMessage = () => setSnack((s) => ({ ...s, open: false }));

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await ContactsService.list();
      setContacts(extractList(response));
    } catch (err: any) {
      showMessage(
        "error",
        err?.response?.data?.message ||
          err?.message ||
          "No se pudieron cargar los contactos."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return contacts;

    return contacts.filter((c) => {
      const fields = [c.name, c.email, c.phone, c.company];
      return fields.some((f) => String(f ?? "").toLowerCase().includes(term));
    });
  }, [contacts, search]);

  const handleCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (contact: any) => {
    setEditing(contact);
    setFormOpen(true);
  };

  const handleFormClose = () => setFormOpen(false);

  const handleSubmit = async (values: any) => {
    const { name, email, phone, company } = values;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return showMessage("error", "Nombre, email y teléfono son obligatorios.");
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company?.trim() || null,
    };

    try {
      if (editing?.id) {
        await ContactsService.update(editing.id, payload);
        showMessage("success", "Contacto actualizado.");
      } else {
        await ContactsService.create(payload);
        showMessage("success", "Contacto creado.");
      }

      handleFormClose();
      await fetchContacts();
    } catch (err: any) {
      const msg =
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.message ||
        err?.message ||
        "Error al guardar el contacto.";
      showMessage("error", msg);
    }
  };

  const handleDeleteConfirm = (contact: any) => {
    setToDelete(contact);
    setDeleteOpen(true);
  };

  const handleDeleteCancel = () => setDeleteOpen(false);

  const handleDelete = async () => {
    if (!toDelete?.id) return;
    try {
      await ContactsService.remove(toDelete.id);
      showMessage("success", "Contacto eliminado.");
      handleDeleteCancel();
      await fetchContacts();
    } catch (err: any) {
      const msg =
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo eliminar el contacto.";
      showMessage("error", msg);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={2}>
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          sx={{ color: "white", mb: 2, letterSpacing: 0.5 }}
        >
          Directorio de Contactos
        </Typography>

        <ContactsToolbar
          search={search}
          setSearch={setSearch}
          onCreate={handleCreate}
        />

        {loading ? (
          <Stack alignItems="center" sx={{ py: 6 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <ContactsTable
            contacts={filteredContacts}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
          />
        )}
      </Stack>

      <ContactFormDialog
        open={formOpen}
        editing={editing}
        onClose={handleFormClose}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        contact={toDelete}
        onClose={handleDeleteCancel}
        onConfirm={handleDelete}
      />

      <AppSnackbar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={closeMessage}
      />
    </Container>
  );
}