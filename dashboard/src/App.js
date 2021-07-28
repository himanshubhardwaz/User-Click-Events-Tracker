import { useEffect, useState } from "react"
import Data from "./components/Data"
import CardComponent from "./components/Card"
import axios from "axios"
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [totalClicks, setTotalClicks] = useState(0);
  const [finalCount, setFinalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/userclicks');
      setData(response.data)
    }
    fetchData();
  }, [])

  useEffect(() => {
    let count = 0;
    let totalClicks = 0;
    console.log(data)
    data?.forEach(singleData => {
      if (singleData.type === 'Button') {
        count = count + singleData.clicks;
      }
      totalClicks = totalClicks + singleData.clicks;
    })
    console.log(count)
    setFinalCount(count)
    setTotalClicks(totalClicks)
  }, [data, setData])

  return (

    <div>
      <div className="cards" >
        <CardComponent header="Button" title="Total buttons click" body={`Total Button clicks is ${finalCount}`} />
        <CardComponent header="Text" title="Total Images click" body={`Total Button clicks is ${totalClicks - finalCount}`} />
        <CardComponent header="Image" title="Total Text click" body={`Total Button clicks is ${totalClicks - finalCount}`} />
      </ div>
      <Data data={data} />
    </div >
  );
}

export default App;