'use server'

import { cookies } from 'next/headers'

export async function setCookie(name: string, value: string) {
  const now = new Date()
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
  // Tính toán số giây từ hiện tại đến cuối ngày
  const maxAge = Math.floor((endOfDay.getTime() - now.getTime()) / 1000)
  cookies().set({
    name: name,
    value: JSON.stringify(value),
    httpOnly: true,
    path: '/',
    maxAge: maxAge
  })
}

export async function getCookie(name: string) {
  const cookieStore = cookies();
  return cookieStore.get(name)
}

export async function deleteCookie(name:string) {
  cookies().delete(name)
}