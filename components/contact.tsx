"use client";
import { MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {};

export default function Contact({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`Hi, my name is ${formData.name}.\n\n${formData.message}\n\nYou can reach me at ${formData.email}`);
    
    window.location.href = `mailto:Kishoreshan2801@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className='relative h-full sm:h-screen flex flex-col justify-center items-center text-center md:text-left max-w-7xl px-4 sm:px-6 md:px-8 mx-auto'>
      <h3 className='mt-4 sm:mt-6 md:mt-8 uppercase tracking-[4px] sm:tracking-[8px] md:tracking-[10px] text-blue-500 text-base sm:text-lg md:text-2xl'>
        Contact
      </h3>

      <div className='mt-2 sm:mt-3 md:mt-4 flex flex-col items-center'>
        <h4 className='text-sm sm:text-lg md:text-xl font-semibold'>
          Connect With Me
        </h4>
      </div>

      <div className='mt-4 sm:mt-6 md:mt-8 flex flex-col space-y-2 sm:space-y-4'>
        <div className='flex items-center space-x-2 sm:space-x-4 justify-center'>
          <EnvelopeIcon className='text-blue-500 h-5 w-5 sm:h-7 sm:w-7 animate-pulse' />
          <p className='text-xs sm:text-lg md:text-xl'>Kishoreshan2801@gmail.com</p>
        </div>

        <div className='flex items-center space-x-2 sm:space-x-4 justify-center'>
          <MapPinIcon className='text-blue-500 h-5 w-5 sm:h-7 sm:w-7 animate-pulse' />
          <p className='text-xs sm:text-lg md:text-xl'>Colombo, Sri Lanka</p>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit(onSubmit)} className='flex mt-6 sm:mt-8 md:mt-10 flex-col space-y-2 sm:space-y-4 w-full max-w-md px-2'>
        <div className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 w-full'>
          <input {...register("name", { required: true })} className='ContactInput flex-1 text-sm sm:text-base' placeholder='Name' type="text" />
          <input {...register("email", { required: true })} className='ContactInput flex-1 text-sm sm:text-base' placeholder='Email' type="email" />
        </div>
        <input {...register("subject", { required: true })} className='ContactInput w-full text-sm sm:text-base' placeholder="Subject" type="text" />
        {/* Increased text box size */}
        <textarea {...register("message", { required: true })} className='ContactInput w-full text-sm sm:text-base h-36 sm:h-48' placeholder="Message" rows={6} />
        <button className='bg-blue-700 py-2 px-4 sm:py-3 sm:px-6 rounded-md text-white font-bold text-sm sm:text-lg hover:bg-blue-800 transition duration-300'>
          Submit
        </button>
      </form>
    </div>
  );
}
