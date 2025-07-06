import { useConfig } from '@/components/ConfigContext';
import { Button } from '@tamagui/button';
import {
  Text
} from '@tamagui/core';
import { ScrollView } from '@tamagui/scroll-view';
import { XStack, YStack } from '@tamagui/stacks';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { timers, selectedId, setSelectedId, updateTimer, deleteTimer } = useConfig();
  const [editingTimer, setEditingTimer] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    nome: string;
    preparar: string;
    exercicio: string;
    descanso: string;
    rodadas: string;
    ciclos: string;
    descansoEntreCiclos: string;
  }>({
    nome: '',
    preparar: '',
    exercicio: '',
    descanso: '',
    rodadas: '',
    ciclos: '',
    descansoEntreCiclos: '',
  });

  const startEditing = (timer: any) => {
    setEditingTimer(timer.id);
    setEditValues({
      nome: timer.nome,
      preparar: formatSecondsToMMSS(timer.preparar),
      exercicio: formatSecondsToMMSS(timer.exercicio),
      descanso: formatSecondsToMMSS(timer.descanso),
      rodadas: timer.rodadas.toString(),
      ciclos: timer.ciclos.toString(),
      descansoEntreCiclos: formatSecondsToMMSS(timer.descansoEntreCiclos),
    });
  };

  const saveEdit = () => {
    if (!editingTimer) return;

    const timer = timers.find((t: any) => t.id === editingTimer);
    if (!timer) return;

    // Converter strings para números usando a nova função
    const preparar = parseTimeToSeconds(editValues.preparar);
    const exercicio = parseTimeToSeconds(editValues.exercicio);
    const descanso = parseTimeToSeconds(editValues.descanso);
    const rodadas = parseInt(editValues.rodadas) || 0;
    const ciclos = parseInt(editValues.ciclos) || 0;
    const descansoEntreCiclos = parseTimeToSeconds(editValues.descansoEntreCiclos);

    console.log('Salvando timer:', {
      preparar,
      exercicio,
      descanso,
      rodadas,
      ciclos,
      descansoEntreCiclos
    });

    const updatedTimer = {
      ...timer,
      nome: editValues.nome,
      preparar,
      exercicio,
      descanso,
      rodadas,
      ciclos,
      descansoEntreCiclos,
    };

    updateTimer(updatedTimer);
    setEditingTimer(null);
  };

  const cancelEdit = () => {
    setEditingTimer(null);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este temporizador?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => deleteTimer(id) },
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Função para converter MM:SS para segundos
  const parseTimeToSeconds = (timeString: string) => {
    const parts = timeString.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0]) || 0;
      const seconds = parseInt(parts[1]) || 0;
      return minutes * 60 + seconds;
    }
    // Se não estiver no formato MM:SS, tenta converter como segundos direto
    return parseInt(timeString) || 0;
  };

  // Função para converter segundos para MM:SS
  const formatSecondsToMMSS = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView flex={1} padding={16} backgroundColor="#222">
          <Text
            fontSize={24}
            fontWeight="bold"
            color="#FFF700"
            textAlign="center"
            marginBottom={20}
            letterSpacing={2}
          >
            CONFIGURAÇÃO
          </Text>
          
          {timers.map((timer) => (
            <YStack
              key={timer.id}
              backgroundColor="#333"
              borderRadius={12}
              padding={16}
              marginBottom={16}
              gap={12}
            >
              <XStack justifyContent="space-between" alignItems="center" marginBottom={16}>
                <Button
                  backgroundColor={selectedId === timer.id ? "#FFF700" : "#555"}
                  paddingHorizontal={16}
                  paddingVertical={8}
                  borderRadius={6}
                  onPress={() => setSelectedId(timer.id)}
                >
                  <Text
                    color={selectedId === timer.id ? "#222" : "#fff"}
                    fontWeight="bold"
                    fontSize={12}
                  >
                    {selectedId === timer.id ? '✓ SELECIONADO' : 'SELECIONAR'}
                  </Text>
                </Button>
                
                <XStack gap={8}>
                  {editingTimer === timer.id ? (
                    <>
                      <Button
                        backgroundColor="#7BFF7B"
                        paddingHorizontal={12}
                        paddingVertical={6}
                        borderRadius={4}
                        onPress={saveEdit}
                      >
                        <Text color="#222" fontWeight="bold" fontSize={10}>
                          SALVAR
                        </Text>
                      </Button>
                      <Button
                        backgroundColor="#FFD700"
                        paddingHorizontal={12}
                        paddingVertical={6}
                        borderRadius={4}
                        onPress={cancelEdit}
                      >
                        <Text color="#222" fontWeight="bold" fontSize={10}>
                          CANCELAR
                        </Text>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        backgroundColor="#00BFFF"
                        paddingHorizontal={12}
                        paddingVertical={6}
                        borderRadius={4}
                        onPress={() => startEditing(timer as any)}
                      >
                        <Text color="#fff" fontWeight="bold" fontSize={10}>
                          EDITAR
                        </Text>
                      </Button>
                      <Button
                        backgroundColor="#FF5C5C"
                        paddingHorizontal={12}
                        paddingVertical={6}
                        borderRadius={4}
                        onPress={() => handleDelete(timer.id)}
                      >
                        <Text color="#fff" fontWeight="bold" fontSize={10}>
                          EXCLUIR
                        </Text>
                      </Button>
                    </>
                  )}
                </XStack>
              </XStack>

              {editingTimer === timer.id ? (
                <YStack gap={12}>
                  <TextInput
                    style={{
                      backgroundColor: "#444",
                      color: "#fff",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 6,
                      fontSize: 16,
                    }}
                    value={editValues.nome}
                    onChangeText={(text: string) => setEditValues(prev => ({ ...prev, nome: text }))}
                    placeholder="Nome do temporizador"
                    placeholderTextColor="#666"
                  />
                  
                  <YStack gap={8}>
                    <YStack gap={4}>
                      <Text color="#FFF700" fontWeight="bold" fontSize={14} marginBottom={4}>
                        Preparar
                      </Text>
                      <TextInput
                        style={{
                          backgroundColor: "#444",
                          color: "#fff",
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 6,
                          fontSize: 16,
                        }}
                        value={editValues.preparar}
                        onChangeText={(text: string) => setEditValues(prev => ({ ...prev, preparar: text }))}
                        placeholder="00:00"
                        placeholderTextColor="#666"
                      />
                    </YStack>
                    
                    <YStack gap={4}>
                      <Text color="#FFF700" fontWeight="bold" fontSize={14} marginBottom={4}>
                        Exercício
                      </Text>
                      <TextInput
                        style={{
                          backgroundColor: "#444",
                          color: "#fff",
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 6,
                          fontSize: 16,
                        }}
                        value={editValues.exercicio}
                        onChangeText={(text: string) => setEditValues(prev => ({ ...prev, exercicio: text }))}
                        placeholder="00:00"
                        placeholderTextColor="#666"
                      />
                    </YStack>
                    
                    <YStack gap={4}>
                      <Text color="#FFF700" fontWeight="bold" fontSize={14} marginBottom={4}>
                        Descansar
                      </Text>
                      <TextInput
                        style={{
                          backgroundColor: "#444",
                          color: "#fff",
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 6,
                          fontSize: 16,
                        }}
                        value={editValues.descanso}
                        onChangeText={(text: string) => setEditValues(prev => ({ ...prev, descanso: text }))}
                        placeholder="00:00"
                        placeholderTextColor="#666"
                      />
                    </YStack>
                    
                    <YStack gap={4}>
                      <Text color="#FFF700" fontWeight="bold" fontSize={14} marginBottom={4}>
                        Descanso entre ciclos
                      </Text>
                      <TextInput
                        style={{
                          backgroundColor: "#444",
                          color: "#fff",
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 6,
                          fontSize: 16,
                        }}
                        value={editValues.descansoEntreCiclos}
                        onChangeText={(text: string) => setEditValues(prev => ({ ...prev, descansoEntreCiclos: text }))}
                        placeholder="00:00"
                        placeholderTextColor="#666"
                      />
                    </YStack>
                  </YStack>
                  
                  <XStack gap={12}>
                    <YStack flex={1} gap={4}>
                      <Text color="#FFF700" fontWeight="bold" fontSize={14} marginBottom={4}>
                        Rodadas
                      </Text>
                      <TextInput
                        style={{
                          backgroundColor: "#444",
                          color: "#fff",
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 6,
                          fontSize: 16,
                        }}
                        value={editValues.rodadas}
                        onChangeText={(text: string) => setEditValues(prev => ({ ...prev, rodadas: text }))}
                        placeholder="0"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                      />
                    </YStack>
                    
                    <YStack flex={1} gap={4}>
                      <Text color="#FFF700" fontWeight="bold" fontSize={14} marginBottom={4}>
                        Ciclos
                      </Text>
                      <TextInput
                        style={{
                          backgroundColor: "#444",
                          color: "#fff",
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 6,
                          fontSize: 16,
                        }}
                        value={editValues.ciclos}
                        onChangeText={(text: string) => setEditValues(prev => ({ ...prev, ciclos: text }))}
                        placeholder="0"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                      />
                    </YStack>
                  </XStack>
                </YStack>
              ) : (
                <YStack gap={12}>
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    color="#FFF700"
                    textAlign="center"
                  >
                    {timer.nome}
                  </Text>
                  
                  <YStack gap={8}>
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text color="#aaa" fontSize={14}>Preparar:</Text>
                      <Text color="#fff" fontSize={14} fontWeight="bold">{formatTime(timer.preparar)}</Text>
                    </XStack>
                    
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text color="#aaa" fontSize={14}>Exercício:</Text>
                      <Text color="#fff" fontSize={14} fontWeight="bold">{formatTime(timer.exercicio)}</Text>
                    </XStack>
                    
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text color="#aaa" fontSize={14}>Descansar:</Text>
                      <Text color="#fff" fontSize={14} fontWeight="bold">{formatTime(timer.descanso)}</Text>
                    </XStack>
                    
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text color="#aaa" fontSize={14}>Descanso entre ciclos:</Text>
                      <Text color="#fff" fontSize={14} fontWeight="bold">{formatTime(timer.descansoEntreCiclos)}</Text>
                    </XStack>
                    
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text color="#aaa" fontSize={14}>Rodadas:</Text>
                      <Text color="#fff" fontSize={14} fontWeight="bold">{timer.rodadas}</Text>
                    </XStack>
                    
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text color="#aaa" fontSize={14}>Ciclos:</Text>
                      <Text color="#fff" fontSize={14} fontWeight="bold">{timer.ciclos}</Text>
                    </XStack>
                  </YStack>
                </YStack>
              )}
            </YStack>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 