import { useConfig } from '@/components/ConfigContext';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

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
      preparar: timer.preparar.toString(),
      exercicio: timer.exercicio.toString(),
      descanso: timer.descanso.toString(),
      rodadas: timer.rodadas.toString(),
      ciclos: timer.ciclos.toString(),
      descansoEntreCiclos: timer.descansoEntreCiclos.toString(),
    });
  };

  const saveEdit = () => {
    if (!editingTimer) return;

    const timer = timers.find(t => t.id === editingTimer);
    if (!timer) return;

    // Converter strings para números
    const preparar = parseInt(editValues.preparar) || 0;
    const exercicio = parseInt(editValues.exercicio) || 0;
    const descanso = parseInt(editValues.descanso) || 0;
    const rodadas = parseInt(editValues.rodadas) || 0;
    const ciclos = parseInt(editValues.ciclos) || 0;
    const descansoEntreCiclos = parseInt(editValues.descansoEntreCiclos) || 0;

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

  const parseTime = (timeString: string) => {
    const parts = timeString.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0]) || 0;
      const seconds = parseInt(parts[1]) || 0;
      return minutes * 60 + seconds;
    }
    return 0;
  };

  const formatTimeInput = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>CONFIGURAÇÃO</Text>
        
        {timers.map((timer) => (
          <View key={timer.id} style={styles.timerCard}>
            <View style={styles.timerHeader}>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  selectedId === timer.id && styles.selectedButton
                ]}
                onPress={() => setSelectedId(timer.id)}
              >
                <Text style={[
                  styles.selectButtonText,
                  selectedId === timer.id && styles.selectedButtonText
                ]}>
                  {selectedId === timer.id ? '✓ SELECIONADO' : 'SELECIONAR'}
                </Text>
              </TouchableOpacity>
              
              <View style={styles.actionButtons}>
                {editingTimer === timer.id ? (
                  <>
                    <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                      <Text style={styles.saveButtonText}>SALVAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                      <Text style={styles.cancelButtonText}>CANCELAR</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => startEditing(timer)}
                    >
                      <Text style={styles.editButtonText}>EDITAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(timer.id)}
                    >
                      <Text style={styles.deleteButtonText}>EXCLUIR</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>

            {editingTimer === timer.id ? (
              <View style={styles.editForm}>
                <TextInput
                  style={styles.input}
                  value={editValues.nome}
                  onChangeText={(text) => setEditValues(prev => ({ ...prev, nome: text }))}
                  placeholder="Nome do temporizador"
                  placeholderTextColor="#666"
                />
                
                <View style={styles.timeInputs}>
                  <View style={styles.timeInput}>
                    <Text style={styles.inputLabel}>Preparar</Text>
                    <TextInput
                      style={styles.input}
                      value={editValues.preparar}
                      onChangeText={(text) => setEditValues(prev => ({ ...prev, preparar: text }))}
                      placeholder="00:00"
                      placeholderTextColor="#666"
                    />
                  </View>
                  
                  <View style={styles.timeInput}>
                    <Text style={styles.inputLabel}>Exercício</Text>
                    <TextInput
                      style={styles.input}
                      value={editValues.exercicio}
                      onChangeText={(text) => setEditValues(prev => ({ ...prev, exercicio: text }))}
                      placeholder="00:00"
                      placeholderTextColor="#666"
                    />
                  </View>
                  
                  <View style={styles.timeInput}>
                    <Text style={styles.inputLabel}>Descansar</Text>
                    <TextInput
                      style={styles.input}
                      value={editValues.descanso}
                      onChangeText={(text) => setEditValues(prev => ({ ...prev, descanso: text }))}
                      placeholder="00:00"
                      placeholderTextColor="#666"
                    />
                  </View>
                  
                  <View style={styles.timeInput}>
                    <Text style={styles.inputLabel}>Descanso entre ciclos</Text>
                    <TextInput
                      style={styles.input}
                      value={editValues.descansoEntreCiclos}
                      onChangeText={(text) => setEditValues(prev => ({ ...prev, descansoEntreCiclos: text }))}
                      placeholder="00:00"
                      placeholderTextColor="#666"
                    />
                  </View>
                </View>
                
                <View style={styles.numberInputs}>
                  <View style={styles.numberInput}>
                    <Text style={styles.inputLabel}>Rodadas</Text>
                    <TextInput
                      style={styles.input}
                      value={editValues.rodadas}
                      onChangeText={(text) => setEditValues(prev => ({ ...prev, rodadas: text }))}
                      placeholder="0"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={styles.numberInput}>
                    <Text style={styles.inputLabel}>Ciclos</Text>
                    <TextInput
                      style={styles.input}
                      value={editValues.ciclos}
                      onChangeText={(text) => setEditValues(prev => ({ ...prev, ciclos: text }))}
                      placeholder="0"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.timerInfo}>
                <Text style={styles.timerName}>{timer.nome}</Text>
                
                <View style={styles.timerDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Preparar:</Text>
                    <Text style={styles.detailValue}>{formatTime(timer.preparar)}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Exercício:</Text>
                    <Text style={styles.detailValue}>{formatTime(timer.exercicio)}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Descansar:</Text>
                    <Text style={styles.detailValue}>{formatTime(timer.descanso)}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Descanso entre ciclos:</Text>
                    <Text style={styles.detailValue}>{formatTime(timer.descansoEntreCiclos)}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Rodadas:</Text>
                    <Text style={styles.detailValue}>{timer.rodadas}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Ciclos:</Text>
                    <Text style={styles.detailValue}>{timer.ciclos}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF700',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
  },
  timerCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectButton: {
    backgroundColor: '#555',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  selectedButton: {
    backgroundColor: '#FFF700',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  selectedButtonText: {
    color: '#222',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#00BFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  deleteButton: {
    backgroundColor: '#FF5C5C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  saveButton: {
    backgroundColor: '#7BFF7B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 10,
  },
  cancelButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 10,
  },
  editForm: {
    gap: 12,
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 16,
  },
  inputLabel: {
    color: '#FFF700',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  timeInputs: {
    gap: 8,
  },
  timeInput: {
    gap: 4,
  },
  numberInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  numberInput: {
    flex: 1,
    gap: 4,
  },
  timerInfo: {
    gap: 12,
  },
  timerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF700',
    textAlign: 'center',
  },
  timerDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 