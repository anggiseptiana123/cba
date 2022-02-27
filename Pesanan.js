import { useState,useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import API from "../Services/Index";
import Topbar from "../Components/Topbar";


const Menu = () => {
    const [user_id, setUser_id] = useState(0);  
    const [id, setid] = useState(0);
    const [nomeja, setNomeja] = useState(0);
    const [menu_id, setMenu_id] = useState(0);
    const [jumlah, setJumlah] = useState(0);
    const [total, setTotal] = useState(0);
    const [isUpdate, setisUpdate] = useState(false);
    const [data, setData] = useState([]);
    const [datauser, setDatauser]= useState([]);
    const [datamenu, setDatamenu]= useState([]);
    const [dataharga, setDataharga]= useState([]);

    useEffect(() => {
        getData();
        getDatauser();
        getDatamenu();
        getDataharga();
      }, []);
    
      async function getData() {
        API.getPesanan().then((res) => {
          console.log(res.data);
          setData(res.data);
        });
      } 

      async function getDatauser() {
        API.getUser().then((res) => {
          console.log(res.data);
          setDatauser(res.data);
        });
      }

      async function getDatamenu() {
        API.getMenu().then((res) => {
          console.log(res.data);
          setDatamenu(res.data);
        });
      }

      async function getDataharga(event){
        setJumlah(event.target.value)
        API.getMenu().then((res)=>{
          setDataharga(res.data.harga);
          const harga = res.data.harga*jumlah;
          setTotal(harga)
          console.log("jumlah" + jumlah)
          console.log(harga)
        })
      }

      function simpan() {
        if (!isUpdate) {
          const formData = new FormData();
          formData.append("user_id", user_id);
          formData.append("nomeja", nomeja);
          formData.append("menu_id", menu_id);
          formData.append("jumlah", jumlah);
          formData.append("total", total);
          API.postPesanan(formData).then((res) => {
            alert("Berhasil Di Simpan");
            getData();
            setUser_id(0);
            setNomeja(0);
            setMenu_id(0);
            setJumlah(0);
            setTotal(0);
          });
        }else{
            const formData = new FormData();
            formData.append("user_id", user_id);
            formData.append("nomeja", nomeja);
            formData.append("menu_id", menu_id);
            formData.append("jumlah", jumlah);
            formData.append("total", total);
            API.updatePesanan(formData,id).then((res) => {
              alert("Berhasil Di Update");
              getData();
              setUser_id(0);
              setNomeja(0);
              setTotal(0);
              setMenu_id(0);
              setJumlah(0);
        });
    }
}

async function up(data) {
    setUser_id(data.user_id);
    setNomeja(data.nomeja);
    setid(data.id);
    setJumlah(data.jumlah);
    setMenu_id(data.menu_id);
    setTotal(data.total);
    setisUpdate(true);
  }

  async function del(id) {
    if (window.confirm("Yakin ingin menghapus  ? ")) {
      API.deletePesanan(id).then((res) => {
        alert("Berhasil Di Hapus");
        getData();
      });
    } else {
      getData();
    }
  }

    return(
        <div>
            <Topbar/>
              <div className="row">
                <Sidebar/>
                <div className="col-10">
                    <div className="row p-3">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                <h3 className="card-text">Form Menu</h3>
                                </div>
                                    <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="user"></label>
                                        <select name="user_id" id="user" className="form-control" required value={user_id} onChange={(e)=>setUser_id(e.target.value)}>
                                          <option>Nama Kasir</option>
                                          {datauser.map((item)=>(
                                            <option key={item.id.toString()} value={item.id}>
                                            {item.nama}
                                            </option>
                                            
                                          ))}
                                        </select>
                                    </div>

                                   
                                    <div className="form-group">
                                        <label htmlFor="nomeja"></label>
                                        <input type="number" className="form-control" name="nomeja" placeholder="Input nomeja" required value={nomeja} onChange={(e)=>setNomeja(e.target.value)}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="menu"></label>
                                        <select name="menu_id" id="menu" className="form-control" required value={menu_id} onChange={(e)=>setMenu_id(e.target.value)}>
                                          <option>Menu</option>
                                          {datamenu.map((item)=>(
                                            <option key={item.id.toString()} value={item.id}>
                                            {item.nama}
                                            </option>
                                            
                                          ))}
                                        </select>
                                    </div> 
                                    <div className="form-group">
                                        <label htmlFor="jumlah"></label>
                                        <input type="number" className="form-control" name="jumlah" placeholder="Input jumlah" required value={jumlah} onChange={(e)=>setJumlah(e.target.value)}></input>
                                    </div> 
                                    <div className="form-group">
                                        <label htmlFor="total"></label>
                                        <input type="number" className="form-control" name="total" placeholder="Input total" required value={total} onChange={(e)=>setTotal(e.target.value)}></input>
                                    </div>                 
                                    <div className="card-footer">
                                        <button className="btn btn-primary" type="submit" onClick={simpan}>Simpan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                        <div className="row">
                            <div className="table-responsive">
                                <table className="table table-hover-dark mt-2">
                                    <thead>
                                        <tr>
                                            <td>id</td>
                                            <td>Kasir</td>
                                            <td>Nomeja</td>
                                            <td>Menu</td>
                                            <td>Jumlah</td>
                                            <td>Total</td>
                                            <td>Option</td>
                                            <td>Option</td>
                                        </tr>
                                    </thead>
                                        {data.map((item) => (
                                    <tbody key={item.id.toString()}>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.user.nama}</td>
                                            <td>{item.nomeja}</td>
                                            <td>{item.menu.nama}</td>
                                            <td>{item.jumlah}</td>
                                            <td>{item.total}</td>
                                            <td>
                                            <button className="btn btn-danger" type="submit" onClick={()=>del(item.id)}>Delete</button>
                                            </td>
                                            <td>
                                            <button className="btn btn-secondary" onClick={()=>up(item)}>Edit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                         ))}
                                </table>
                            </div>
                        </div>
                    </div>  

                        
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}
export default Menu;