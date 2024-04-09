import React, { useState } from "react";
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


export function Create() {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        enabled: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue});
    }

        
    const goToBackCreate = (url: string) => {
        window.location.href = url; // Cambia la URL actual
    };

    const handleSubmit = (e) => 
    {
        e.preventDefault();

        if (!formData.name.trim() || !formData.url.trim()) {
            alert('Name and URL are required fields');
            return;
        }

        fetch(`${config.apiUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create RSS source');
            }

            return response.json();
        })
        .then(data => {
            alert(data.message);
            window.location.href = 'dashboard';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to create RSS source');
        });
    }    
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Crear nueva fuente RSS</CardTitle>
                <CardDescription>
                    Darás de alta una nueva fuente de RSS.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" placeholder="Titulo RSS" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="url" name="url" type="text" placeholder="URL RSS" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">enabled</Label>
                        <Input id="name" name="name" type="checkbox" checked={formData.enabled} onChange={handleChange}/>
                    </div>
                    <Button type="submit" className='w-full'>Crear</Button>
                    
                </form>
                
                <a href={`dashboard`}>
                    <Button variant="outline">Volver atras</Button>
                </a>
            </CardContent>
        </Card>
    );
}
