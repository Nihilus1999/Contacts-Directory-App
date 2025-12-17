'use client'

import { Alert, Snackbar } from '@mui/material'

export default function AppSnackbar({
  open,
  message,
  severity,
  onClose,
}: {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
  onClose: () => void
}) {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert severity={severity} sx={{ fontWeight: 'bold' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
