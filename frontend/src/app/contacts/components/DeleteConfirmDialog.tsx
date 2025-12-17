"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

export default function DeleteConfirmDialog({
  open,
  contact,
  onClose,
  onConfirm,
}: {
  open: boolean;
  contact: any | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
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
        Eliminar contacto
      </DialogTitle>

      <Divider />

      {/* Content */}
      <DialogContent sx={{ textAlign: "center", pt: 3 }}>
        <Typography>
          ¿Seguro que deseas eliminar a <b>{contact?.name}</b>?
        </Typography>
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
          color="error"
          onClick={onConfirm}
          sx={{
            borderRadius: 2,
            px: 4,
          }}
        >
          Eliminar
        </Button>
        <Button
          onClick={onClose}
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
