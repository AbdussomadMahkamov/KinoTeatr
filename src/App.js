import { useState } from "react";

const kinolarRuyhati = [
  {
    id: "tt1375666",
    nomi: "Inception",
    yili: "2010",
    rasmi:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    id: "tt0133093",
    nomi: "The Matrix",
    yili: "1999",
    rasmi:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: "tt6751668",
    nomi: "Parasite",
    yili: "2019",
    rasmi:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const kurilganKinolarRuyhati = [
  {
    id: "tt0133093",
    nomi: "The Matrix",
    yili: "1999",
    rasmi:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      vaqti: 140,
      bahoUmumiy: 8.4, 
      bahoUser: 10
  },
  {
    id: "tt6751668",
    nomi: "Parasite",
    yili: "2019",
    rasmi:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
      vaqti: 128,
      bahoUmumiy: 9.6, 
      bahoUser: 8
  },
];
const urtacha =(massiv)=>massiv.reduce((a,b,c,massiv)=>a+b/massiv.length,0);

export default function App(){
  const [kinolar, setKinolar] = useState(kinolarRuyhati);
  const [kurilganKinolar, setKurilganKinolar] = useState(kurilganKinolarRuyhati);
  return(
    <>
      <Navbar>
        <Logo/>
        <Qidiruv/>
        <QidiruvNatija kinolar={kinolar}/>
      </Navbar>
      <Main>
        <Box1 >
          <KinolarList kinolar={kinolar}/>
        </Box1>
        <Box2>
          <Xulosa kurilganKinolar={kurilganKinolar}/>
          <KinolarKurilganList kurilganKinolar={kurilganKinolar}/>
        </Box2>
      </Main>
    </>
  );
}

function Navbar({children}){
  return (
    <nav className="nav-bar">
      {children}
    </nav>
  )
}

function Logo(){
  return (
    <div className="logo">
      <span>🎥 </span>
      <h1>Kinolar</h1>
    </div>
  )
}

function Qidiruv(){
  const [qidiruv, setQidiruv] = useState("");
  return (
    <input 
    className="search" 
    type="text" 
    placeholder="Kino qidirish..." 
    value={qidiruv} 
    onChange={(e)=>setQidiruv(e.target.value)}
    />
  )
}

function QidiruvNatija({kinolar}){
  return (
    <p className="num-results">
      Topildi {kinolar.length} ta natija
    </p>
  )
}

function Main({children}){
  return(
    <main className="main">
      {children}
    </main>
  )
}

function Box1({children}){
  const [ochish, setOchish] = useState(true);
  return(
    <div className="box">
      <button className="btn-toggle" onClick={()=>setOchish((ochish)=>!ochish)}>
        {ochish?"➖":"➕"}
      </button>
      {ochish && children}
    </div>
  )
}

function KinolarList({kinolar}){
  return(
    <ul className="list">
      {
        kinolar.map((kino)=>(
          <KinoList kino={kino} key={kino.id}/>
        ))
      }
    </ul> 
  )
}

function KinoList({kino}){
  return (
    <li>
      <img src={kino.rasmi} alt={kino.nomi}/>
      <h3>{kino.nomi}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{kino.yili}</span>
        </p>
      </div>
    </li>
  )
}

function Box2({children}){
  const [ochish2, setOchish2] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={()=>setOchish2((ochish)=>!ochish)} >
      {ochish2?"➖":"➕"}
      </button>
      { ochish2 && 
        <>
        {children}
        </> 
      }
    </div>
  )
}

function KinolarKurilganList({kurilganKinolar}){
  return (
    <ul className="list">
      {kurilganKinolar.map((kino)=>(
        <KinoKurilganList kino={kino} key={kino.id}/>
      ))}
    </ul>
  )
}

function KinoKurilganList({kino}){
  return(
    <li >
      <img src={kino.rasmi} alt={kino.nomi}></img>
      <h3>{kino.nomi}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{kino.bahoUmumiy} </span>
        </p>
        <p>
          <span>🌟</span>
          <span>{kino.bahoUser} </span>
        </p>
        <p>
          <span>⌛️</span>
          <span>{kino.vaqti} min</span>
        </p>
      </div>
    </li>
  )
}

function Xulosa({kurilganKinolar}){
  const urtachaUmumiyBaho =urtacha(kurilganKinolar.map((kino)=>kino.bahoUmumiy)) ;
  const urtachaUserBaho = urtacha(kurilganKinolar.map((kino)=>kino.bahoUser));
  const urtachaVaqt = urtacha(kurilganKinolar.map((kino)=>kino.vaqti));
  return (
    <div className="summary">
      <h2>Ko'rilgan kinolar</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{kurilganKinolar.length} ta </span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{urtachaUmumiyBaho} </span>
        </p>
        <p>
          <span>🌟</span>
          <span>{urtachaUserBaho} </span>
        </p>
        <p>
          <span>⌛️</span>
          <span>{urtachaVaqt} min</span>
        </p>
      </div>
    </div>
  )
}