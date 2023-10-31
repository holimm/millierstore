import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Carousel } from 'antd'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`h-fit w-full ${inter.className} bg-white`}
    >
      <Carousel className='w-10/12 mx-auto' autoplay>
        <div className='h-[50em] w-10/12 mt-16 bg-slate-500 text-white'>Test</div>
        <div className='h-[50em] w-10/12 mt-16 bg-slate-300 text-white'>Test</div>
        <div className='h-[50em] w-10/12 mt-16 bg-slate-100 text-white'>Test</div>
      </Carousel>
    </main>
  )
}
