import React, { useState, useEffect } from "react" 
import './app.css'

const audioRef = React.createRef();
  function App() {
      const [, setSegundos] = useState(0);
      const [ativo, setAtivo] = useState(false);
      const [somLigado, setSomLigado] = useState(false);
      const [numeroCiclosRcp, setNumeroCiclosRcp] = useState(0);
      const [tempoDroga, setTempoDroga] = useState(0);
      const [numeroDroga, setNumeroDroga] = useState(0);
      const [tempoTotal, setTempoTotal] = useState(0);
      const [tempoMassagemAtual, setTempoMassagemAtual] = useState(0);
    
      // metronomo
      const iniciarMetronomo = () => {
        audioRef.current.play()
      }

      // muteSound
      const muteSound = () => {
        const novoVolume = audioRef.current.volume === 0 ? 1 : 0;
        setSomLigado(novoVolume === 1); // Defina o estado com base no novo volume
        audioRef.current.volume = novoVolume;
      };

      // Iniciar RCP
      const iniciarRcp = () => {
        setAtivo(true);
        audioRef.current.volume = 1
        setSomLigado(true)
      };
    
      // Parar RCP
      const pausarRCP = () => {
        setAtivo(false);
        setSomLigado(false)
      };
      
      // Novo Ciclo RPC
      const IniciarNovoCiclo = () => {
          if (ativo) {
            setNumeroCiclosRcp(numeroCiclosRcp + 1);
            setTempoMassagemAtual(0);
          }
      };
  
      // Nova Droga
      const novaDroga = () => {
        if (ativo) {
           setTempoDroga(0);
           setNumeroDroga(numeroDroga + 1);
        }
      };

      // Zerar Dados
      const zerarDados = () => {
        setAtivo(false);
        setSegundos(0);
        setNumeroCiclosRcp(0);
        setTempoTotal(0);
        setTempoMassagemAtual(0);
        setTempoDroga(0);
        setNumeroDroga(0);
        audioRef.current.volume = 0
        setSomLigado(false)
      };
    
      // iniciar loop
      useEffect(() => {
        let interval;
    
        if (ativo) {
          interval = setInterval(() => {
              iniciarMetronomo()
              setSomLigado(true)
              setSegundos((segundos) => segundos + 0.5);
              setTempoDroga((tempoDroga) => tempoDroga + 0.5);
              setTempoTotal((tempoTotal) => tempoTotal + 0.5);
              setTempoMassagemAtual((tempoMassagemAtual) => tempoMassagemAtual + 0.5);
              
            }, 500);
              
        } else {
          clearInterval(interval);
        }
    
        return () => {
          clearInterval(interval);
        };
      }, [ativo]);
    
      function converterSegundosParaMinutosESegundos(segundos) {
        const minutos = Math.floor(segundos.toFixed(0) / 60);
        const segundosRestantes = segundos.toFixed(0) % 60;
        if (minutos < 1){
            return segundosRestantes.toString().padStart(2, '0') + "s"
          } else {
            return minutos + ":" + segundosRestantes.toString().padStart(2, '0') + "min"}                 
      }

      const cssTempoMassagem = tempoMassagemAtual > 120 ? 'cssTempoExcedido':'';
      const cssTempoDroga = tempoDroga > 180 ? 'cssTempoExcedido':'';
      
      const cssSom = somLigado === true  ? 'pulseOn':'pulseOff';

      return (
        <div className="container">
          
          <div className='title'> 
            <h1> RedCalc RCP-Helper</h1>
          </div>
         
          <div className='mainButton'>
            <button onClick={iniciarRcp}>Iniciar RCP</button> 
            <button onClick={pausarRCP}>Pausar RCP</button>
          </div>
          
          <div className={cssSom}>
            <button onClick={muteSound} > BPM </button>
          </div>
          <br/>
          
          <div className='actionButton'>
            <span> Ciclo Atual: {converterSegundosParaMinutosESegundos(tempoMassagemAtual)} </span>
            <div className={cssTempoMassagem}>
              <button onClick={IniciarNovoCiclo}>Trocar Massagem</button>
            </div>
            <span>  {numeroDroga > 0 ? (
              "Tempo da última Adrenalina: " + `${converterSegundosParaMinutosESegundos(tempoDroga)}`
              ): "Ainda não foi feito Adrenalina"
              } </span>          
            <div className={cssTempoDroga}> 
              <button onClick={novaDroga}>Nova Droga</button>
            </div>
          </div>
                    <br/>
         <div className='resumo'>
          <ul> 
            <li>Tempo Total de RCP: {converterSegundosParaMinutosESegundos(tempoTotal)} </li>
            <li>Número de ciclos: {numeroCiclosRcp}</li>
            <li>Dose de adrenalina: {numeroDroga}</li>
          </ul>
          </div>
          <div className='zerar'>
          <button onClick={zerarDados}>Zerar DADOS</button>
          </div>    
          <audio ref={audioRef} src="http://www.daveceddia.com/freebies/react-metronome/click1.wav" preload="auto" />
        </div>
      );
   
  
  }
  
  
export default App;


