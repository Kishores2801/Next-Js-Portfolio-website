import Logo from '../Header/Logo';
import Link from 'next/link';
import { SunIcon, LinkedinIcon, GithubIcon } from '../icons';
import Head from "../../app/(user)/head";




const Header = () => {
  
  return (
    <header className='w-full p-4 px-10 flex items-center justify-between'>
      <Logo />
      <Head/>
      
      <nav className='w-max rounded-full py-3 px-8 border border-solid border-black font-medium capitalize flex items-center fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm'>
        <Link href="#" className="mr-3 hover:underline">Home</Link>
        <Link href="/About" className="mr-3 hover:underline">About</Link>
        <Link href="/portfolio" className="mr-3 hover:underline">Portfolio</Link>
        <Link href="/blogs" className="mr-3 hover:underline">Blogs</Link>
        <Link href="/contact" className="mr-3 hover:underline">Contact me</Link>
        <button><SunIcon /></button>
      </nav>

      <div>
        <a href="https://www.linkedin.com/in/kishore-shan/" className="inline-block w-6 h-8 mr-4">
          <LinkedinIcon className='hover:scale-125 transition-all ease duration-200' />
        </a>
        <a href="https://github.com/Kishores2801/" className="inline-block w-6 h-8 mr-4">
          <GithubIcon className='hover:scale-125 transition-all ease duration-200' />
        </a>
      </div>
    </header>
  );
};

export default Header;
