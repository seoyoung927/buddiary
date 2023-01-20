export const postFriend = async (id) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/v1/api/friend/save';
    
    try {
        const response = await fetch(`${API_URL}${path}/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({})
        });
        if (!response.ok) throw new Error('bad server condition');
      return true;
    } catch (e) {
      console.error('postFriend Error: ', e.message);
      return false;
    }
};
