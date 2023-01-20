export const putUpdateFriendStatus = async (id) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/v1/api/friend/update/status';

    try {
      const response = await fetch(`${API_URL}${path}/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response.ok) throw new Error('bad server condition');
      return response.json();
    } catch (e) {
      console.error('putUpdateFriendStatus Error: ', e.message);
      return false;
    }
};
