import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white" >
      <header className="w-full px-4 py-3 shadow-md flex items-center justify-between" style={{backdropFilter: 'blur(20px)', position: 'fixed', top: 0, left: 0, right: 0, padding: '1rem', zIndex: 1000, color: 'black',boxShadow: '20px 20px 30px rgba(0, 0, 0, 0.1)'}}>
        <div>
          <Link href="/">
  <div className="rounded-full">
    <Image src="/images/snappy.png" alt="SnappyBooth" width={150} height={150} /> 
  </div>
</Link>
        </div>
        <nav className="flex gap-6 text-sm font-semibold text-neutral-700" style={{zIndex: 999}}>
          <Link href="/choose" className="hover:text-pink-500 transition py-2">Choose Layout</Link>
          <Link href="/about" className="hover:text-pink-500 transition py-2">About</Link>
          <Link href="/privacy-policy" className="hover:text-pink-500 transition py-2">Privacy Policy</Link>
          <Link href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition transform hover:scale-110 inline-flex items-center">Contact</Link>
          
        </nav>
      </header>
      <main >
        {children}
      </main>
    </div>
  );
}
