import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function Error() {

    const router = useRouter();
    const handleRefresh = () => {
        router.refresh();
    };

    return (
        <div className='flex justify-center'>
            <>Error</>
        </div>
    )
}