import { PlusSquare } from "lucide-react";

const UI = () => {
  return (
    <div className='absolute top-0 right-0 p-3'>
      <div className='flex gap-3'>
        <button className='bg-white border-slate-900
          rounded-lg border-2
          flex items-center justify-center
          cursor-pointer
          text-xl text-slate-900
          p-1'
        >
          <PlusSquare className='w-8 h-8' />
        </button>
      </div>
    </div>
  );
}

export default UI;