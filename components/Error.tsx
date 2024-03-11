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
            <div className="flex justify-center items-center min-h-screen h-[90vh]">
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                        <CardDescription>There was an error fetching your data</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-center">
                        <Button onClick={handleRefresh}>Retry</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}