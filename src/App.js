import { useEffect, useState } from "react";
import YulduzchaliBaholash from "./YulduzchaliBaholagich";

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
  const [kurilganKinolar, setKurilganKinolar] = useState([]);
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

  function KurilganKinolarniQushish(kino){
    setKurilganKinolar((kurilgan)=>[...kurilgan, kino])
  }
  
  function KurilganKinoniUchirish(id){
    setKurilganKinolar((kurilgan)=>kurilgan.filter((kino)=>kino.imdbID!==id))
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
        {tanlangan ? <TanlanganKinoInfo 
        tanlangan={tanlangan} 
        TanlanganKinoYopish={TanlanganKinoYopish} 
        KurilganKinolarniQushish={KurilganKinolarniQushish}
        kurilganKinolar={kurilganKinolar}/>:
        <>
          <Xulosa kurilganKinolar={kurilganKinolar}/>
          <KinolarKurilganList 
          kurilganKinolar={kurilganKinolar} 
          KurilganKinoniUchirish={KurilganKinoniUchirish}/>
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

// function TanlanganKinoInfo({tanlangan,TanlanganKinoYopish}){
//   const [kino, SetKino] = useState({});
//   const [yuklash, setYuklash] = useState(false);
//   const {
//     Title:title,
//     Year:year,
//     Poster:poster,
//     Runtime:runtime,
//     Plot:plot,
//     Released:released,
//     Actors:actors,
//     Director:director,
//     Genre:genre,
//     imdbRating,
//   } = kino;
//   useEffect(function(){
//     async function KinoYuklashId(){
//       setYuklash(true);
//       const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${tanlangan}`);
//       const data = await res.json();
//       console.log(data);
//       SetKino(data);
//       setYuklash(false);
//     }
//     KinoYuklashId()
//   },[tanlangan]) 
//   return(
//     <div className="datails">
//       {yuklash ? <Yuklovchi/>:
//       <>
//       <header>
//       <button className="btn-back" onClick={TanlanganKinoYopish}> &larr; </button>
//       <img src={poster} alt={title}/>
//       <div className="details-overview">
//         <h2>{title}</h2>
//         <p>{released} &bull; {runtime}</p>
//         <p>{genre}</p>
//         <p><span>⭐</span>{imdbRating} umumiy baho</p>
//       </div>
//       </header>
//         <section>
//           <div className="rating">
//             <YulduzchaliBaholash maxSize={10} size={24} />
//           </div>
//           <p><em>{plot}</em></p>
//           <p>Bosh ro'lda{actors}</p>
//           <p>{director} tomonidan suratga olingan</p>
//         </section>
      
//       </>}
//       {/* {tanlangan}
//      console.log({tanlangan}) */}
//     </div>
//   )
// }

function TanlanganKinoInfo({tanlangan,TanlanganKinoYopish, KurilganKinolarniQushish, kurilganKinolar}){
  const [kino,setkino] = useState({})
  const [yuklash,setyuklash] = useState(false)
  const [userBaho, setUserBaho] = useState("");
  const baholanganmi = kurilganKinolar.map((kino)=>kino.imdbID).includes(tanlangan);
  const baholanganKino = kurilganKinolar.find((kino)=>kino.imdbID===tanlangan)?.userBaho;
  const {
    Title:title,
    Year:year,
    Poster:poster,
    Runtime:runtime,
    Plot:plot,
    Released:released,
    Actors:actors,
    Director:director,
    Genre:genre,
    imdbRating,
  } = kino;

  function Qushish(){
    const YangiKurilganKino = {
      imdbID: tanlangan,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userBaho
    }
    KurilganKinolarniQushish(YangiKurilganKino);
    TanlanganKinoYopish();
  }
  useEffect(function(){
    async function KinoYuklash(){
      setyuklash(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${tanlangan}`);
      const data = await res.json();
      console.log(data);
      setkino(data)
      setyuklash(false)
    }
    KinoYuklash();
  },[tanlangan])
  return <div className="details">
    {yuklash?<Yuklovchi/>:
    <>
    <header>
    <button className="btn-back" onClick={TanlanganKinoYopish}>&larr;</button>
    <img src={poster} alt={title}/>
    <div className="details-overview">
      <h2>{title}</h2>
      <p>{released} &bull; {runtime}</p>
      <p>{genre}</p>
      <p><span>⭐️</span>{imdbRating} umumiy baho</p>
    </div>
    </header>
      <section>
        <div className="rating">
          {
            !baholanganmi ?
            <>
            <YulduzchaliBaholash maxSize={10} size={24} onSetBaho={setUserBaho}/>
           
            {userBaho > 0 &&
            <button 
            className="btn-add" 
            onClick={Qushish} >
              ➕ Ro'yxatga qo'shish
              </button>}
             </> : 
             <p>Bu kinoni {baholanganKino} 🌟bilan baholagansiz ⚠️</p>
          }
        </div>
        <p><em>{plot}</em></p>
        <p>Bosh ro'lda {actors}</p>
        <p>{director} tamonidan suratga olingan</p>
      </section>
   
    </>
}
    {/* {tanlangan} */}
  </div>
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

function KinolarKurilganList({kurilganKinolar, KurilganKinoniUchirish}){
  return (
    <ul className="list">
      {kurilganKinolar.map((kino)=>(
        <KinoKurilganList kino={kino} key={kino.imdbID}
        KurilganKinoniUchirish={KurilganKinoniUchirish}/>
      ))}
    </ul>
  )
}

function KinoKurilganList({kino, KurilganKinoniUchirish}){
  return(
    <li >
      <img src={kino.poster} alt={kino.title}></img>
      <h3>{kino.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{kino.imdbRating} </span>
        </p>
        <p>
          <span>🌟</span>
          <span>{kino.userBaho} </span>
        </p>
        <p>
          <span>⌛️</span>
          <span>{kino.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={()=>KurilganKinoniUchirish(kino.imdbID)}><span>❌</span></button>
      </div>
    </li>
  )
}

function Xulosa({kurilganKinolar}){
  const urtachaUmumiyBaho =urtacha(kurilganKinolar.map((kino)=>kino.imdbRating)) ;
  const urtachaUserBaho = urtacha(kurilganKinolar.map((kino)=>kino.userBaho));
  const urtachaVaqt = urtacha(kurilganKinolar.map((kino)=>kino.runtime));
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
          <span>{urtachaUmumiyBaho.toFixed(2)} </span>
        </p>
        <p>
          <span>🌟</span>
          <span>{urtachaUserBaho.toFixed(2)} </span>
        </p>
        <p>
          <span>⌛️</span>
          <span>{urtachaVaqt} min</span>
        </p>
      </div>
    </div>
  )
}