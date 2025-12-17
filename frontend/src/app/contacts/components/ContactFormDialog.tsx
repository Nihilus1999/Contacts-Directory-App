"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Divider,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

export default function ContactFormDialog({
  open,
  editing,
  onClose,
  onSubmit,
}: {
  open: boolean;
  editing: any | null;
  onClose: () => void;
  onSubmit: (values: any) => void;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) return;
    reset({
      name: editing?.name ?? "",
      email: editing?.email ?? "",
      phone: editing?.phone ?? "",
      company: editing?.company ?? "",
    });
  }, [open, editing, reset]);

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      {/* Title */}
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          pb: 1,
        }}
      >
        {editing ? "Editar contacto" : "Crear contacto"}
      </DialogTitle>

      <Divider />

      {/* Content */}
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={2.5}>
          {/* NAME */}
          <Controller
            name="name"
            control={control}
            rules={{
              required: "El nombre es obligatorio",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                required
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message as string}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            )}
          />

          {/* EMAIL */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                required
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message as string}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            )}
          />

          {/* PHONE */}
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9+\-\s()]{7,20}$/,
                message: "Teléfono inválido",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Teléfono"
                required
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message as string}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            )}
          />

          {/* COMPANY */}
          <Controller
            name="company"
            control={control}
            rules={{
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Empresa (opcional)"
                fullWidth
                error={!!errors.company}
                helperText={errors.company?.message as string}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            )}
          />
        </Stack>
      </DialogContent>

      <Divider />

      {/* Actions */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          sx={{
            borderRadius: 2,
            px: 4,
          }}
        >
          {editing ? "Guardar" : "Crear"}
        </Button>

        <Button
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            borderRadius: 2,
            px: 4,
          }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
