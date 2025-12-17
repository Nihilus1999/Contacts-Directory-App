'use client'

import { useState } from 'react'
import axios from '@/config/axios'
import { Button, Stack, Typography } from '@mui/material'
import { getAxiosErrorMessage } from '@/utils/axiosError'

export default function TestApiPage() {
  const [result, setResult] = useState<string>('')

  const testGet = async () => {
    try {
      const { data } = await axios.get('/contacts') // ajusta si tu ruta es otra
      setResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setResult(getAxiosErrorMessage(err))
    }
  }

  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      <Typography variant="h5">Test API</Typography>
      <Button variant="contained" onClick={testGet}>
        Probar GET /contacts
      </Button>

      <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
    </Stack>
  )
}
