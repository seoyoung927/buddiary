export const putUpdateTodoDone = async (id,done) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/v1/api/todo/update/done';

    try {
      const response = await fetch(`${API_URL}${path}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({"done":done})
      });
      if (!response.ok) throw new Error('bad server condition');
      return response.json();
    } catch (e) {
      console.error('putUpdateTodoDone Error: ', e.message);
      return false;
    }
};
