import React, { useState, useEffect } from "react";
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import config from "@/global/config/config";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Editar({ idRss }: React.PropsWithoutRef<{ idRss: number }>) {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        enabled: true,
    });

    useEffect(() => {
        // Aquí puedes realizar una llamada a la API para obtener los datos del ítem a editar
        // Supongamos que la API devuelve un objeto con los datos del ítem
        fetch(`${config.apiUrl}/find/${idRss}`)
            .then(response => response.json())
            .then(data => {
                setFormData({
                    name: data[0].name,
                    url: data[0].url,
                    enabled: data[0].enabled,
                });
                            
            })
            .catch(error => {
                console.error('Error fetching item data:', error);
            });
    }, [idRss]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue});
    }

    const handleSubmit = (e) => 
    {
        e.preventDefault();

        if (!formData.name.trim() || !formData.url.trim()) {
            alert('Name and URL are required fields');
            return;
        }

        fetch(`${config.apiUrl}/update/${idRss}`, { 
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to edit item');
            }

            return response.json();
        })
        .then(data => {
            alert(data.message);
            window.location.href = 'dashboard';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to edit item');
        });
    }    
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Editar ítem</CardTitle>
                <CardDescription>
                    Edita la información del ítem.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="url">URL</Label>
                        <Input id="url" name="url" type="text" value={formData.url} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="enabled">Enabled</Label>
                        <Input id="enabled" name="enabled" type="checkbox" checked={formData.enabled} onChange={handleChange}/>
                    </div>
                    <Button type="submit" className='w-full'>Guardar cambios</Button>
                    
                </form>
                
                <a href={`dashboard`}>
                    <Button variant="outline">Cancelar</Button>
                </a>
            </CardContent>
        </Card>
    );
}