import axios from '@/config/axios'
import type { Contact } from '@/models/contact.model'

export type ContactCreateDTO = Omit<Contact, 'id'>
export type ContactUpdateDTO = Omit<Contact, 'id'>

export const ContactsService = {
  list: async (): Promise<Contact[]> => {
    const { data } = await axios.get<Contact[]>('/contacts')
    return data
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