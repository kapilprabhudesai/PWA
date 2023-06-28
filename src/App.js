import './App.css';
import Axios from 'axios';


function App() {

  const postTasks = async () => {
    const res = await Axios.post('http://localhost:4000/api/tasks', {
      "id": 123,
      "info": "Some task"
    })
    console.log(res)
  }
  return (
    <div className="App">
      <button onClick={postTasks}>POST</button>
    </div>
  );
}

export default App;
