'use client'

import { Button, Stack, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

export default function ContactsToolbar({
  search,
  setSearch,
  onCreate,
}: {
  search: string
  setSearch: (v: string) => void
  onCreate: () => void
}) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems="center"
    >
      <TextField
        placeholder="Buscar contactos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreate}
        sx={{
          whiteSpace: 'nowrap',
          borderRadius: 2,
          px: 3,
        }}
      >
        Nuevo
      </Button>
    </Stack>
  )
}
