import axios from '@/config/axios'
import type { Contact } from '@/models/contact.model'

export type ContactCreateDTO = Omit<Contact, 'id'>
export type ContactUpdateDTO = Omit<Contact, 'id'>

function normalizeContacts(payload: unknown): Contact[] {
  if (Array.isArray(payload)) return payload as Contact[]
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>

    if (Array.isArray(obj.contacts)) return obj.contacts as Contact[]
    if (Array.isArray(obj.data)) return obj.data as Contact[]
    if (Array.isArray(obj.rows)) return obj.rows as Contact[]
    if (obj.result && typeof obj.result === 'object') {
      const r = obj.result as Record<string, unknown>
      if (Array.isArray(r.contacts)) return r.contacts as Contact[]
      if (Array.isArray(r.data)) return r.data as Contact[]
    }
  }

  return []
}

export const ContactsService = {
  list: async (): Promise<Contact[]> => {
    const { data } = await axios.get('/contacts')
    return normalizeContacts(data)
  },

  create: async (payload: ContactCreateDTO): Promise<Contact> => {
    const { data } = await axios.post<Contact>('/contacts', payload)
    return data
  },

  update: async (id: number, payload: ContactUpdateDTO): Promise<Contact> => {
    const { data } = await axios.put<Contact>(`/contacts/${id}`, payload)
    return data
  },

  remove: async (id: number): Promise<void> => {
    await axios.delete(`/contacts/${id}`)
  },
}
