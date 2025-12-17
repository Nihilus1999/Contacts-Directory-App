'use client'

import { Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700}>
        Contacts
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Lista, búsqueda, crear/editar y eliminar contactos.
      </Typography>
    </Container>
  )
}
