import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from 'react'

interface RSS {
    id: number
    name: string
    url: string
    enabled: number
}

export function TableCustom() {
    const [rssSources, setRssSources] = useState<RSS[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/getRSS');
            const json = await response.json();
            setRssSources(json);
          };

        fetchData();
    }, []);
    
    const goToRSS = (url: string) => {
        window.location.href = url; // Cambia la URL actual
    };

    const deleteRSS = async (id: number) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
                method: 'DELETE',
            });
            // Actualiza la lista de fuentes de RSS después de eliminar
            setRssSources(rssSources.filter(rss => rss.id !== id));
        } catch (error) {
            console.error(`Error deleting RSS with ID ${id}:`, error);
        }
    };

    return (
        <>
        <div className="container mx-auto">
            <a href={`create`} onClick={() => goToRSS(`create`)}>
                <Button variant="secondary">Create new RSS</Button>
            </a>

            <Table>
                <TableCaption>A list of your recent RSS Added</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>Name</TableHead>
                        <TableHead>URL Source</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody id="rssTableBody" >
                    { rssSources.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.url}</TableCell>
                                <TableCell>{item.enabled ? 'Yes' : 'No'}</TableCell>
                                <TableCell className='text-right'>
                                    <a href={`rss-${item.id}`} onClick={() => goToRSS(`rss-${item.id}`)}>
                                        <Button variant="outline">Articulos</Button>
                                    </a>
                                    <a href={`edit-${item.id}`}>
                                        <Button variant="secondary">Edit</Button>
                                    </a>
                                    <a onClick={() => deleteRSS(item.id)}>
                                        <Button variant="destructive">Delete</Button>
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
