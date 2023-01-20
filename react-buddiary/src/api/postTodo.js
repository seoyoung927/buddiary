export const postTodo = async (toDo,selectedDate,categoryId) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/v1/api/todo/save';
    const month_ = ('00'+selectedDate.month).slice(-2);
    const date_ = ('00'+selectedDate.date).slice(-2);
    
    try {
        const response = await fetch(`${API_URL}${path}/${categoryId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({"title":toDo, "date": `${selectedDate.year}-${month_}-${date_}`, "categoryId":categoryId, "done": 0})
        });
        if (!response.ok) throw new Error('bad server condition');
      return true;
    } catch (e) {
      console.error('postToDo Error: ', e.message);
      return false;
    }
};
