import Link from "next/link";
import Image from "next/image";
import ProfileImg from '@/public/Profile_img.jpeg';


function StudioLogo(props: any) {
  const {renderDefault, title}= props;

  return (
    <div>
      <Image 
        className="rounded-full object-cover"
        height={40}
        width={40}
        src={ProfileImg}
        alt="logo"
        />
        <>{renderDefault(props)}</>
    </div>
  )
}

export default StudioLogo;