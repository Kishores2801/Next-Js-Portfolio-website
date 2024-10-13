

import Link from "next/link";
import Image from "next/image";
import ProfileImg from '@/public/Profile_img.jpeg';

function StudioLogo(props: any) {
  const { renderDefault, title } = props;

  return (
    <div className="flex items-center space-x-2">
      <Image 
        className="rounded-full object-cover"
        height={40}
        width={40}
        src={ProfileImg}
        alt="logo"
      />
      {/* Render the default title or logo from Sanity */}
      <>{renderDefault({ title })}</>
    </div>
  )
}

export default StudioLogo;

       
