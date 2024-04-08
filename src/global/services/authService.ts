import axios from 'axios';

class AuthService 
{
    async login(username: string, password: string): Promise<boolean> 
    {
        try {
            const response = await axios.post<{ token: string }>('https://puffer-openhost-backend.779pbk.easypanel.host/api/login_check', { username, password });
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