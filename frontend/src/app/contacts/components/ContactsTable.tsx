'use client'

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ContactsTable({
  contacts,
  onEdit,
  onDelete,
}: {
  loading: boolean
  contacts: any[]
  onEdit: (c: any) => void
  onDelete: (c: any) => void
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 1,
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              '& th': {
                fontWeight: 700,
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Empresa</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {contacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ py: 4, textAlign: 'center' }}>
                No hay contactos.
              </TableCell>
            </TableRow>
          ) : (
            contacts.map((c) => (
              <TableRow
                key={c.id}
                hover
                sx={{
                  '& td': { textAlign: 'center' },
                  transition: 'background-color 0.2s ease',
                }}
              >
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email || '-'}</TableCell>
                <TableCell>{c.phone || '-'}</TableCell>
                <TableCell>{c.company || '-'}</TableCell>

                <TableCell>
                  <IconButton onClick={() => onEdit(c)} aria-label="editar" size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => onDelete(c)} aria-label="eliminar" size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}