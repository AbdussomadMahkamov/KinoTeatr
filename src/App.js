import { useEffect, useState } from "react";

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
const KEY="92d61c80"

// fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=Terminator`);
// .then((e)=>e.json()).then((data)=>console.log(data));
// const query="sdkhkshjk";

export default function App(){
  const [kinolar, setKinolar] = useState(kinolarRuyhati);
  const [kurilganKinolar, setKurilganKinolar] = useState(kurilganKinolarRuyhati);
  const [yuklash, setYuklash] = useState(false);
  const [error, setError] = useState("");
  const [qidiruv, setQidiruv] = useState("");
  const [tanlangan, setTanlangan] = useState(null);

  useEffect(function(){
    
    async function fetchKinolar(){
      try{
        setYuklash(true);
        setError("");
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${qidiruv}`);
        if(!res.ok) throw new Error("Ma'lumotlarni yuklashda xatolik yuzaga keldi!");
        const data = await res.json();
        console.log(data.Search);
        if(data.Response === 'False') throw new Error("Siz qidirgan kino topilmadi");
        setKinolar(data.Search);
      // console.log(data);
      }
      catch(err){
        console.error(err);
        setError(err.message);
      }
      finally{
        setYuklash(false);
        if(qidiruv.length<3){
          setKinolar([]);
          setError("");
          return;
        }
      }
    }
    fetchKinolar();
    
  },[qidiruv])

  function TanlanganKino(id){
    setTanlangan((tanlangan)=>(id===tanlangan?null:id));
  }
  function TanlanganKinoYopish(){
    setTanlangan(null);
  }
  
  return(
    <>
      <Navbar>
        <Logo/>
        <Qidiruv qidiruv={qidiruv} setQidiruv={setQidiruv}/>
        <QidiruvNatija kinolar={kinolar}/>
      </Navbar>
      <Main>

        <Box>
        {/* { yuklash ? <Yuklovchi/> : <KinolarList kinolar={kinolar}/>} */}
        {yuklash && <Yuklovchi/>}
        {!yuklash && !error && <KinolarList kinolar={kinolar} TanlanganKino={TanlanganKino} />}
        {/* {error && qidiruv ? <ErrorMessage message={error} /> : ""} */}
        {error &&  <ErrorMessage message={error} /> }
        </Box>
        <Box>
        {tanlangan ? <TanlanganKinoInfo tanlangan={tanlangan} TanlanganKinoYopish={TanlanganKinoYopish}/>:
        <>
          <Xulosa kurilganKinolar={kurilganKinolar}/>
          <KinolarKurilganList kurilganKinolar={kurilganKinolar} />
        </>}
        </Box>

        {/* 2-usul */}
        {/* <Box element={<KinolarList kinolar={kinolar}/>}/>
        <Box element={
          <>
          <Xulosa kurilganKinolar={kurilganKinolar}/>
          <KinolarKurilganList kurilganKinolar={kurilganKinolar}/>
          </>
        } /> */}

        {/* 1-usul */}
        {/* <Box1 >
          <KinolarList kinolar={kinolar}/>
        </Box1>
        <Box2>
          <Xulosa kurilganKinolar={kurilganKinolar}/>
          <KinolarKurilganList kurilganKinolar={kurilganKinolar}/>
        </Box2> */}
      </Main>
    </>
  );
}

function TanlanganKinoInfo({tanlangan,TanlanganKinoYopish}){
  return(
    <div className="datails">
      <button className="btn-back" onClick={TanlanganKinoYopish}> &larr; </button>
      {tanlangan}
     console.log({tanlangan})
    </div>
  )
}

function Yuklovchi(){
  return <p className="loader">Yuklanmoqda</p>
}

function ErrorMessage({message}){
  return(
    <p className="error">
      <span>⚠️</span>Xatolik
    </p>
  )
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

function Qidiruv({qidiruv, setQidiruv}){
  
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

function Box({children}){
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

// function Box2({children}){
//   const [ochish2, setOchish2] = useState(true);
//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={()=>setOchish2((ochish)=>!ochish)} >
//       {ochish2?"➖":"➕"}
//       </button>
//       { ochish2 && 
//         <>
//         {children}
//         </> 
//       }
//     </div>
//   )
// }

function KinolarList({kinolar, TanlanganKino}){
  return(
    <ul className="list list-movies">
      {
        kinolar.map((kino)=>(
          <KinoList kino={kino} key={kino.imdbID} TanlanganKino={TanlanganKino} />
        ))
      }
    </ul> 
  )
}

function KinoList({kino, TanlanganKino}){
  return (
    <li onClick={()=>TanlanganKino(kino.imdbID)}>
      <img src={kino.Poster} alt={kino.Title}/>
      <h3>{kino.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{kino.Year}</span>
        </p>
      </div>
    </li>
  )
}

function KinolarKurilganList({kurilganKinolar}){
  return (
    <ul className="list">
      {kurilganKinolar.map((kino)=>(
        <KinoKurilganList kino={kino} key={kino.imdbID}/>
      ))}
    </ul>
  )
}

function KinoKurilganList({kino}){
  return(
    <li >
      <img src={kino.Poster} alt={kino.Title}></img>
      <h3>{kino.Title}</h3>
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