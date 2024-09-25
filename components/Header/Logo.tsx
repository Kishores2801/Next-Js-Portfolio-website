import Link from "next/link";
import Image from "next/image";
import ProfileImg from '@/public/Profile_img.jpeg';

const Logo = () => {
  return (
    <Link href ="/" className="flex items-center text-dark">
        <div className="w-16 rounded-full overflow-hidden border border-solid border-black mr-2">
          <Image src={ProfileImg} alt="Profile Image" className="w-full h-auto rounded-full hover:scale-125 transition-all ease duration-200"  />
        </div>
        <span className='font-bold text-xl'> Data Grid</span>
    </Link>
  )
}

export default Logo;