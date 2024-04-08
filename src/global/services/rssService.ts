import axios from 'axios';

class rssService 
{
    async getListRSS(): Promise<boolean> 
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

}

export default new rssService();