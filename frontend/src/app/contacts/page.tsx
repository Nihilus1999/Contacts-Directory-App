"use client";

import { useEffect, useMemo, useState } from "react";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";

import ContactsToolbar from "./components/ContactsToolbar";
import ContactsTable from "./components/ContactsTable";
import ContactFormDialog from "./components/ContactFormDialog";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import AppSnackbar from "./components/AppSnackbar";

// Ajusta este import a tu proyecto:
import { ContactsService } from "@/services/contacts.services";

function normalizeList(payload: any) {
  if (Array.isArray(payload)) return payload;
  if (payload?.contacts && Array.isArray(payload.contacts))
    return payload.contacts;
  if (payload?.data && Array.isArray(payload.data)) return payload.data;
  if (payload?.rows && Array.isArray(payload.rows)) return payload.rows;
  return [];
}

export default function ContactsPage() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info" as any,
  });

  // form
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // delete
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<any | null>(null);

  const showSnack = (severity: any, message: string) =>
    setSnack({ open: true, severity, message });
  const closeSnack = () => setSnack((s) => ({ ...s, open: false }));

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await ContactsService.list();
      setContacts(normalizeList(res));
    } catch (e: any) {
      showSnack(
        "error",
        e?.response?.data?.message || e?.message || "Error cargando contactos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchContacts();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return contacts;

    return contacts.filter((c) => {
      const a = String(c?.name ?? "").toLowerCase();
      const b = String(c?.email ?? "").toLowerCase();
      const d = String(c?.phone ?? "").toLowerCase();
      const f = String(c?.company ?? "").toLowerCase();
      return a.includes(q) || b.includes(q) || d.includes(q) || f.includes(q);
    });
  }, [contacts, search]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (c: any) => {
    setEditing(c);
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

  // RHF manda values
  const submitForm = async (values: any) => {
    const name = String(values?.name ?? "").trim();
    const email = String(values?.email ?? "").trim();
    const phone = String(values?.phone ?? "").trim();
    const company = String(values?.company ?? "").trim();

    if (!name) return showSnack("error", "El nombre es obligatorio.");
    if (!email) return showSnack("error", "El email es obligatorio.");
    if (!phone) return showSnack("error", "El teléfono es obligatorio.");

    const payload: any = { name, email, phone };

    if (editing?.id) {
      // UPDATE
      payload.company = company || null;
    } else {
      // CREATE
      if (company) payload.company = company;
    }

    try {
      if (editing?.id) {
        await ContactsService.update(editing.id, payload);
        showSnack("success", "Contacto actualizado.");
      } else {
        await ContactsService.create(payload);
        showSnack("success", "Contacto creado.");
      }

      closeForm();
      await fetchContacts();
    } catch (e: any) {
      const msg =
        e?.response?.data?.errors?.[0]?.msg ||
        e?.response?.data?.message ||
        e?.message ||
        "Error guardando contacto";

      showSnack("error", msg);
    }
  };

  const openDeleteConfirm = (c: any) => {
    setToDelete(c);
    setDeleteOpen(true);
  };

  const closeDelete = () => setDeleteOpen(false);

  const confirmDelete = async () => {
    if (!toDelete?.id) return;
    try {
      await ContactsService.remove(toDelete.id);
      showSnack("success", "Contacto eliminado.");
      closeDelete();
      await fetchContacts();
    } catch (e: any) {
      const msg =
        e?.response?.data?.errors?.[0]?.msg ||
        e?.response?.data?.message ||
        e?.message ||
        "Error guardando contacto";

      showSnack("error", msg);
    }
  };

  return (
    <Container sx={{ py: 4,  }}>
      <Stack spacing={2}>
        <Typography
          variant="h4"
          fontWeight={700}
          align="center"
          sx={{ letterSpacing: 0.5, mb: 2, color: "white" }}
        >
          Dirección de Contactos
        </Typography>

        <ContactsToolbar
          search={search}
          setSearch={setSearch}
          onCreate={openCreate}
        />

        {loading ? (
          <Stack alignItems="center" sx={{ py: 6 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <ContactsTable
            loading={loading}
            contacts={filtered}
            onEdit={openEdit}
            onDelete={openDeleteConfirm}
          />
        )}
      </Stack>

      <ContactFormDialog
        open={formOpen}
        editing={editing}
        onClose={closeForm}
        onSubmit={submitForm}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        contact={toDelete}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />

      <AppSnackbar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={closeSnack}
      />
    </Container>
  );
}
