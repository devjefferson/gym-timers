import AdvancedAdBanner from '@/components/AdvancedAdBanner';
import { useConfig } from '@/components/ConfigContext';
import { Button } from '@tamagui/button';
import { Stack, Text, View } from '@tamagui/core';
import { Pause, Play } from '@tamagui/lucide-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const [showAdBanner, setShowAdBanner] = useState(true);

  // Atualizar tempo quando o preset muda
  useEffect(() => {
    if (!isRunning) {
      setTime(preparar);
    } else if (stage === PREPARAR) {
      setTime(preparar);
    }
  }, [preparar, isRunning, stage]);

  // Atualiza valores iniciais ao iniciar
  const handleStart = () => {
    setStage(PREPARAR);
    setTime(preparar);
    setRodada(1);
    setCiclo(1);
    setElapsed(0);
    setIsRunning(true);
    
    // Tocar som de início
    playBeep(PREPARAR);
  };

  // Função para tocar beep específico para cada etapa
  const playBeep = async (currentStage: string) => {
    try {
      let soundFile;
      
      // Escolher som baseado na etapa
      switch (currentStage) {
        case PREPARAR:
          soundFile = require('@/assets/sounds/preparar.mp3');
          break;
        case EXERCICIO:
          soundFile = require('@/assets/sounds/exercicio.mp3');
          break;
        case DESCANSAR:
          soundFile = require('@/assets/sounds/descanso.mp3');
          break;
        case DESCANSO_CICLO:
          soundFile = require('@/assets/sounds/descanso-ciclo.mp3');
          break;
        case 'FINAL':
          soundFile = require('@/assets/sounds/final.mp3');
          break;
        default:
          soundFile = require('@/assets/sounds/beep.mp3');
      }
      
      const { sound } = await Audio.Sound.createAsync(
        soundFile,
        { shouldPlay: true }
      );
      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (!status.isLoaded || status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (e) {
      // Silencioso se não encontrar o arquivo
      console.log('Som não encontrado:', e);
    }
  };

  // Função para avançar para a próxima etapa
  const nextStage = () => {
    Vibration.vibrate(300);
    playBeep(stage);
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
        // Tocar som de finalização
        playBeep('FINAL');
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

  // Função para fechar o banner
  const handleCloseAd = () => {
    setShowAdBanner(false);
  };

  // Função para ação do botão do anúncio
  const handleAdButtonPress = () => {
    // Aqui você pode implementar a lógica para abrir um link, 
    // navegar para uma tela de promoção, etc.
    console.log('Anúncio clicado!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222' }}>
      {/* Banner de Anúncio */}
              <AdvancedAdBanner 
          visible={showAdBanner}
          title="PROMOÇÃO ESPECIAL"
          subtitle="Desconto de 50% em suplementos"
          backgroundColor="#FF6B35"
          textColor="#fff"
          showCloseButton={true}
          onClose={handleCloseAd}
          showButton={false}
          buttonText="VER OFERTA"
          onButtonPress={handleAdButtonPress}
        />
      
      <View
        flex={1}
        backgroundColor="#222"
        alignItems="center"
        justifyContent="center"
        paddingTop={24}
      >
        {/* Header */}
        <Stack width="100%" alignItems="center" marginBottom={8}>
          <Text
            color="#FFF700"
            fontWeight="bold"
            fontSize={18}
            marginBottom={4}
          >
            {nome?.toUpperCase() || 'TEMPORIZADOR'}
          </Text>
          <Text
            color="#fff"
            fontWeight="bold"
            fontSize={20}
            marginBottom={2}
          >
            {toMMSS(elapsed)}
          </Text>
        </Stack>
        
        {/* Bloco principal colorido */}
        <View
          width="100%"
          alignItems="center"
          justifyContent="center"
          paddingVertical={24}
          backgroundColor={STAGE_COLORS[stage] || '#FFF700'}
        > 
          <Text
            fontSize={32}
            fontWeight="bold"
            color="#222"
            marginBottom={8}
            letterSpacing={2}
          >
            {stage.toUpperCase()}
          </Text>
          <Text
            fontSize={96}
            fontWeight="bold"
            color="#222"
            marginBottom={8}
          >
            {String(Math.floor(time / 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')}
          </Text>
        </View>
        
        {/* Próxima etapa/tempo */}
        {proximaEtapa && (
          <Stack
            width="100%"
            alignItems="center"
            justifyContent="center"
            paddingVertical={12}
            backgroundColor={STAGE_COLORS[proximaEtapa] || '#7BFF7B'}
            flexDirection="row"
          > 
            <Text
              fontSize={20}
              fontWeight="bold"
              color="#222"
              marginRight={8}
            >
              {proximaEtapa.toUpperCase()}:
            </Text>
            <Text
              fontSize={32}
              fontWeight="bold"
              color="#222"
            >
              {String(Math.floor(proximoTempo / 60)).padStart(2, '0')}:{String(proximoTempo % 60).padStart(2, '0')}
            </Text>
          </Stack>
        )}
        
        {/* Rodadas e ciclos */}
        <Stack
          width="100%"
          justifyContent="space-around"
          alignItems="center"
          marginTop={24}
          flexDirection="row"
        >
          <Stack alignItems="center" flex={1}>
            <Text
              fontSize={48}
              fontWeight="bold"
              color="#00BFFF"
            >
              {rodadas - rodada + 1}
            </Text>
            <Text
              color="#aaa"
              fontSize={12}
              fontWeight="bold"
              textAlign="center"
              marginTop={2}
            >
              RODADAS PARA TERMINAR
            </Text>
          </Stack>
          
          <Stack alignItems="center" justifyContent="center" flex={1}>
            <Button
              size="$6"
              borderRadius={150}
              backgroundColor="#333"
              borderWidth={6}
              borderColor="#FFF700"
              shadowColor="#000"
              shadowOpacity={0.2}
              shadowRadius={8}
              marginBottom={6}
              onPress={isRunning ? () => setIsRunning(false) : handleStart}
              alignItems="center"
              justifyContent="center"
              width='$11'
              height='$11'
            >
              {isRunning ? (
                <Pause size={46} color="#FFF700" />
              ) : (
                <Play size={46} color="#FFF700" />
              )}
            </Button>
            <Text
              color="#FFF700"
              fontWeight="bold"
              fontSize={16}
            >
              {isRunning ? 'PAUSAR' : rodada === 1 && ciclo === 1 && time === preparar ? 'INICIAR' : 'RETOMAR'}
            </Text>
          </Stack>
          
          <Stack alignItems="center" flex={1}>
            <Text
              fontSize={48}
              fontWeight="bold"
              color="#FFF700"
            >
              {ciclos - ciclo + 1}
            </Text>
            <Text
              color="#aaa"
              fontSize={12}
              fontWeight="bold"
              textAlign="center"
              marginTop={2}
            >
              CICLOS PARA TERMINAR
            </Text>
          </Stack>
        </Stack>
        
        <Button
          marginTop={24}
          backgroundColor="#FF5C5C"
          paddingHorizontal={32}
          paddingVertical={12}
          borderRadius={8}
          onPress={handleReset}
        >
          <Text
            color="#fff"
            fontWeight="bold"
            fontSize={16}
          >
            RESETAR
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
} 