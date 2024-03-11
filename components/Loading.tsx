import Image from "next/image";

export default function Loading() {
    return (
        <div className='flex justify-center'>
            <div className="flex items-center h-[70vh]">
                <Image src="/loading.svg" alt="Loading" width={25} height={25} />
                <p className='p-2'>Loading</p>
            </div>
        </div>
    )
}