import axios from 'axios';

export async function getListRSS(): Promise<any[]> {
    try {
        const response = await axios.get<any[]>('http://127.0.0.1:8000/api/getRSS');
        return response.data;
    } catch (error) {
        console.error('Error fetching RSS sources:', error);
        throw error;
    }
}
