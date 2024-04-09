import { getFeed } from '@/global/services/rssService';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import config from '@/global/config/config';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function RSS({ idRss }: React.PropsWithoutRef<{ idRss: number }>) {
    const [feed, setFeed] = useState([] as any[])
    const [url, setUrl] = useState([] as any[]);

    useEffect(() => {
        const fetchDataAndUrl = async () => {
            const urlResponse = await fetch(`${config.apiUrl}/find/${idRss}`, {
                method: 'GET',
            });
            const urlJson = await urlResponse.json();
            const apiUrl = urlJson[0].url;
            setUrl(apiUrl);
    
            const response = await fetch(`/api/rss/get-parsed-rss?url=${apiUrl}`, {
                method: 'GET'
            });
            const json = await response.json();
            setFeed(json);
        };
    
        fetchDataAndUrl();
    }, []);

    const goToLink = (url: string) => {
        window.open(url, '_blank');
    };

    const goToBack = (url: string) => {
        window.location.href = url; // Cambia la URL actual
    };

    return (
        <>
            <div className="container mx-auto">
                <a onClick={() => goToBack(`dashboard`)}>
                    <Button variant="outline">Volver atras</Button>
                </a>
                <Table>
                    <TableCaption>A list of your recent RSS Added</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody id="rssTableBody">
                        { feed.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        {item.title}
                                        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                                        <p className="text-sm">{item.description.length > 500 ? item.description.slice(0, 500) + '...' : item.description}</p>
                                        <a onClick={() => goToLink(`${item.link}`)}>
                                            <Button variant="outline">Ir a la noticia</Button>
                                        </a>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}