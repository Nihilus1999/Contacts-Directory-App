import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'

export default function page() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 560,
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
        }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h4" fontWeight={800}>
            Directorio de Contactos
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Aplicación sencilla para <b>registrar</b>, <b>editar</b>, <b>buscar</b> y <b>eliminar</b> contactos.
            Guarda nombre, correo, teléfono y empresa (opcional).
          </Typography>

          <Box sx={{ pt: 1 }}>
            <Link href="/contacts" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large" sx={{ borderRadius: 2, px: 4 }}>
                Ir a Contactos
              </Button>
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
