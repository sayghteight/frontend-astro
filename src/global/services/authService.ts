import axios from 'axios';
import config from '@/global/config/config';

class AuthService 
{

    async login(username: string, password: string): Promise<boolean> 
    {
        try {
            const response = await axios.post<{ token: string }>(`${config.apiUrl}/login_check`, { username, password });
            localStorage.setItem('token', response.data.token);
            return true;
          } catch (error) {
            console.error('Error during login:', error);
            return false;
          }
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
      return !!localStorage.getItem('token');
    }

    getToken(): string | null {
      return localStorage.getItem('token');
    }
}

export default new AuthService();