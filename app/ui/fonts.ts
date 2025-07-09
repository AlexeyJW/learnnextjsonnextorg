import {Inter as NextInter} from 'next/font/google'
import { Lusitana as NextLusitana } from 'next/font/google'

export const inter = NextInter ({subsets: ['latin']})
export const lusitana= NextLusitana ({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lusitana',})
