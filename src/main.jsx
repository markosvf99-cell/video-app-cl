import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const initialVideos = [
  {id:1,title:'Bem-vindo ao VideoRenda',author:'VideoRenda',likes:128,src:''},
  {id:2,title:'Seu primeiro vídeo pode começar aqui',author:'Criador',likes:76,src:''}
];

function App(){
  const [tab,setTab]=useState('Início');
  const [videos,setVideos]=useState(initialVideos);
  const [file,setFile]=useState(null);
  const [likes,setLikes]=useState({});
  const addVideo=()=>{
    if(!file) return;
    const url=URL.createObjectURL(file);
    setVideos(v=>[{id:Date.now(),title:file.name,author:'Você',likes:0,src:url},...v]);
    setFile(null);
    document.getElementById('videoFile').value='';
  };
  return <div className="app">
    <header><div className="logo">Video<span>Renda</span></div><div className="coins">💰 0 pontos</div></header>
    <main>
      {tab==='Início' && <>
        <section className="hero"><h1>Crie. Assista. Ganhe.</h1><p>Uma base para sua futura plataforma de vídeos.</p></section>
        <section className="upload"><h2>Publicar vídeo</h2><input id="videoFile" type="file" accept="video/*" onChange={e=>setFile(e.target.files[0]||null)}/><button onClick={addVideo}>Publicar</button></section>
        <section><h2>Feed de vídeos</h2><div className="feed">{videos.map(v=><article className="card" key={v.id}>{v.src?<video controls src={v.src}/>:<div className="placeholder">🎬</div>}<h3>{v.title}</h3><small>@{v.author}</small><button className="like" onClick={()=>setLikes(x=>({...x,[v.id]:!x[v.id]}))}>❤️ {v.likes+(likes[v.id]?1:0)}</button></article>)}</div></section>
      </>}
      {tab==='Carteira' && <section className="page"><h1>💰 Carteira</h1><div className="balance">R$ 0,00</div><p>Área preparada para futuras recompensas e monetização.</p></section>}
      {tab==='Perfil' && <section className="page"><h1>👤 Meu perfil</h1><p>Vídeos publicados: {videos.filter(v=>v.author==='Você').length}</p></section>}
    </main>
    <nav>{['Início','Carteira','Perfil'].map(x=><button className={tab===x?'active':''} key={x} onClick={()=>setTab(x)}>{x}</button>)}</nav>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
