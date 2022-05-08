
import './App.css';
import { useEffect, useState } from "react"


function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("")
  const [ShowRoomQunt, setQunt] = useState("")
  const [GodownQounty, setgodwnQunt] = useState("")
  const [id, setId] = useState(null)
    ;


    //  using hooks when page refrece then  data diplay 
  useEffect(() => {
    getData();


  }, []);


  //  fetch data from api 
  function getData() {
    fetch("http://localhost:3006/data").then((result) => {
      result.json().then((resp) => {
        setData(resp)
        setQunt(resp[0].ShowRoomQunt)
        setgodwnQunt(resp[0].GodownQounty)
        setId(resp[0].id)
        setName(resp[0].name)
      })
    })
  }
// pre-fill data select from Api sever 

  function selct(id) {
    let item = data[id - 1]
    setId(item.id)
    setName(item.name)
    let a = 3;
    let b = item.ShowRoomQunt;
    let c = a - b
    setQunt(b+c)
    setgodwnQunt(item.GodownQounty-c)
 
// alert limit of space 
      setTimeout((val) => {
        if (c < 3 && c !== 0) {
          alert(`${c} Cars Space Abilabe please update`,)

        } else {
          alert(`No Space Abilabe for this Cars`,)
        }
      }, 1000);
    }
    
  // update cars data 


  function update(e) {
    e.preventDefault()
    let itemData = { id, name, ShowRoomQunt, GodownQounty };

//  update cars qountity from godwon with validation cars parkings space 

    if (ShowRoomQunt > 3) {
      alert("No Parking Space Limit For This Cars")
      if (ShowRoomQunt < 0) {
        alert("out of stoke")
      }
    } else {
      fetch(`http://localhost:3006/data/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(itemData)
        }).then((result) => {
          result.json().then((resp1) => {
            alert("update Sucsess-full")
            getData();
          })
        })
    }
  }
  return (
    <div className="App">
      <div className="container  my-10">
        <h2 > Update Instruction</h2>
        <h4>Select Buttun For Update Cars Item</h4>
        
        <div className="row justify-content-between ">
          <div className="col-12 col-sm-3">
            <h1>ShowRoom</h1>
            <table className="table table-dark table-hover ">

              <thead>
                <tr>
                  <th scope="col">SL</th>
                  <th scope="col">CARS </th>
                  <th scope="col">QOUNTITY</th>
                  <th scope="col">UPDATE</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item) =>

                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.ShowRoomQunt}</td>
                      <td> <button type="radio" onClick={() => selct(item.id)} /></td>
                    </tr>

                  )
                }
              </tbody>
            </table>
          </div>

          <div className="col-12 col-sm-3">
            <h1>Godown</h1>
            <table className="table table-dark table-hover ">
              <thead>
                <tr>
                  <th scope="col">SL</th>
                  <th scope="col">CARS </th>
                  <th scope="col">QOUNTITY</th>

                </tr>
              </thead>
              <tbody>
                {
                  data.map((item) =>

                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.GodownQounty}</td>
                    </tr>

                  )
                }
              </tbody>
            </table>

          </div>
        </div>
        {/* onChange={(e) => setQunt(e.target.value)} */}
        <input type="text" value={name} /><br />
        <input type="number" value={ShowRoomQunt}  /><br />
        <input type="number" value={GodownQounty} /><br />
        <button onClick={update}>UPDATE</button>
      </div>


    </div>
  );
}

export default App;
