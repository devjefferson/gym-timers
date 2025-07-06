import { useConfig } from '@/components/ConfigContext';
import { Pause, Play } from '@tamagui/lucide-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

const PREPARAR = 'Preparar';
const EXERCICIO = 'Exercício';
const DESCANSAR = 'Descansar';
const DESCANSO_CICLO = 'Descanso entre ciclos';

const STAGE_COLORS = {
  [PREPARAR]: '#FFF700',
  [EXERCICIO]: '#7BFF7B',
  [DESCANSAR]: '#FF5C5C',
  [DESCANSO_CICLO]: '#FFD700',
} as any

export default function TimerScreen() {
  const { timers, selectedId } = useConfig();
  const preset = timers.find((t: any) => t.id === selectedId)!;
  const { preparar, exercicio, descanso, rodadas, ciclos, nome, descansoEntreCiclos } = preset;

  const [stage, setStage] = useState(PREPARAR);
  const [time, setTime] = useState(preparar);
  const [rodada, setRodada] = useState(1);
  const [ciclo, setCiclo] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  // Atualiza valores iniciais ao iniciar
  const handleStart = () => {
    setStage(PREPARAR);
    setTime(preparar);
    setRodada(1);
    setCiclo(1);
    setElapsed(0);
    setIsRunning(true);
  };

  // Função para tocar beep usando expo-av
  const playBeep = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/beep.mp3'),
        { shouldPlay: true }
      );
      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (!status.isLoaded || status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (e) {
      // Silencioso se não encontrar o arquivo
    }
  };

  // Função para avançar para a próxima etapa
  const nextStage = () => {
    Vibration.vibrate(300);
    playBeep();
    if (stage === PREPARAR) {
      setStage(EXERCICIO);
      setTime(exercicio);
    } else if (stage === EXERCICIO) {
      setStage(DESCANSAR);
      setTime(descanso);
    } else if (stage === DESCANSAR) {
      if (rodada < rodadas) {
        setRodada(rodada + 1);
        setStage(EXERCICIO);
        setTime(exercicio);
      } else if (ciclo < ciclos) {
        setStage(DESCANSO_CICLO);
        setTime(descansoEntreCiclos);
      } else {
        setIsRunning(false);
      }
    } else if (stage === DESCANSO_CICLO) {
      setCiclo(ciclo + 1);
      setRodada(1);
      setStage(PREPARAR);
      setTime(preparar);
    }
  };

  // Efeito para contagem regressiva
  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setTimeout(() => {
        setTime((t: number) => t - 1);
      }, 1000);
    } else if (isRunning && time === 0) {
      nextStage();
    }
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, time, stage, rodada, ciclo, preparar, exercicio, descanso, rodadas, ciclos]);

  // Efeito para tempo corrido
  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((e: number) => e + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Função de reset
  const handleReset = () => {
    setStage(PREPARAR);
    setTime(preparar);
    setRodada(1);
    setCiclo(1);
    setElapsed(0);
    setIsRunning(false);
  };

  // Próxima etapa
  let proximaEtapa = '';
  let proximoTempo = 0;
  if (stage === PREPARAR) {
    proximaEtapa = EXERCICIO;
    proximoTempo = exercicio;
  } else if (stage === EXERCICIO) {
    proximaEtapa = DESCANSAR;
    proximoTempo = descanso;
  } else if (stage === DESCANSAR && rodada < rodadas) {
    proximaEtapa = EXERCICIO;
    proximoTempo = exercicio;
  } else if (stage === DESCANSAR && rodada === rodadas && ciclo < ciclos) {
    proximaEtapa = DESCANSO_CICLO;
    proximoTempo = descansoEntreCiclos;
  } else if (stage === DESCANSO_CICLO) {
    proximaEtapa = PREPARAR;
    proximoTempo = preparar;
  } else {
    proximaEtapa = '';
    proximoTempo = 0;
  }

  // Função utilitária para exibir MM:SS
  function toMMSS(seg: number) {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{nome?.toUpperCase() || 'TEMPORIZADOR'}</Text>
        <Text style={styles.elapsed}>{toMMSS(elapsed)}</Text>
      </View>
      
      {/* Bloco principal colorido */}
      <View style={[styles.mainBlock, { backgroundColor: STAGE_COLORS[stage] || '#FFF700' }]}> 
        <Text style={styles.stage}>{stage.toUpperCase()}</Text>
        <Text style={styles.time}>
          {String(Math.floor(time / 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')}
        </Text>
      </View>
      
      {/* Próxima etapa/tempo */}
      {proximaEtapa && (
        <View style={[styles.nextBlock, { backgroundColor: STAGE_COLORS[proximaEtapa] || '#7BFF7B' }]}> 
          <Text style={styles.nextLabel}>{proximaEtapa.toUpperCase()}:</Text>
          <Text style={styles.nextTime}>
            {String(Math.floor(proximoTempo / 60)).padStart(2, '0')}:{String(proximoTempo % 60).padStart(2, '0')}
          </Text>
        </View>
      )}
      
      {/* Rodadas e ciclos */}
      <View style={styles.bottomRow}>
        <View style={styles.bottomItem}>
          <Text style={[styles.bottomNumber, { color: '#00BFFF' }]}>{rodadas - rodada + 1}</Text>
          <Text style={styles.bottomLabel}>RODADAS PARA TERMINAR</Text>
        </View>
        
        <TouchableOpacity style={styles.centerBtn} onPress={isRunning ? () => setIsRunning(false) : handleStart}>
          <View style={styles.centerBtnCircle}>
           
              {isRunning ? (
                 <Pause size={30} color="#FFF700" />
              ) : (
                <Play size={30} color="#FFF700" />
               
              )}
            
          </View>
          <Text style={styles.centerBtnText}>
            {isRunning ? 'PAUSAR' : rodada === 1 && ciclo === 1 && time === preparar ? 'INICIAR' : 'RETOMAR'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.bottomItem}>
          <Text style={[styles.bottomNumber, { color: '#FFF700' }]}>{ciclos - ciclo + 1}</Text>
          <Text style={styles.bottomLabel}>CICLOS PARA TERMINAR</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetBtnText}>RESETAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#222', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 24 
  },
  header: { 
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  headerTitle: { 
    color: '#FFF700', 
    fontWeight: 'bold', 
    fontSize: 18, 
    marginBottom: 4 
  },
  elapsed: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 20, 
    marginBottom: 2 
  },
  mainBlock: { 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 24 
  },
  stage: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#222', 
    marginBottom: 8, 
    letterSpacing: 2 
  },
  time: { 
    fontSize: 96, 
    fontWeight: 'bold', 
    color: '#222', 
    marginBottom: 8 
  },
  nextBlock: { 
    width: '100%', 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    paddingVertical: 12 
  },
  nextLabel: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#222', 
    marginRight: 8 
  },
  nextTime: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#222' 
  },
  bottomRow: { 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    marginTop: 24 
  },
  bottomItem: { 
    alignItems: 'center', 
    flex: 1 
  },
  bottomNumber: { 
    fontSize: 48, 
    fontWeight: 'bold' 
  },
  bottomLabel: { 
    color: '#aaa', 
    fontSize: 12, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 2 
  },
  centerBtn: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1 
  },
  centerBtnCircle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: '#333', 
    marginBottom: 4, 
    borderWidth: 6, 
    borderColor: '#FFF700', 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 8, 
    elevation: 4, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  centerBtnIcon: { 
    color: '#FFF700', 
    fontWeight: 'bold' 
  },
  centerBtnText: { 
    color: '#FFF700', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  resetBtn: { 
    marginTop: 24, 
    backgroundColor: '#FF5C5C', 
    paddingHorizontal: 32, 
    paddingVertical: 12, 
    borderRadius: 8 
  },
  resetBtnText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
}); 