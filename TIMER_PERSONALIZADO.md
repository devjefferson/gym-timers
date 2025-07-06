# Timer Personalizado - Novo Card

## Visão Geral

Foi adicionado um novo card de timer chamado "Timer Personalizado" com todos os valores zerados, permitindo que o usuário configure completamente seu próprio treino.

## Características do Novo Timer

### **Configuração Inicial:**
```tsx
{
  id: '4',
  nome: 'Timer Personalizado',
  preparar: 0,
  exercicio: 0,
  descanso: 0,
  rodadas: 0,
  ciclos: 0,
  descansoEntreCiclos: 0,
}
```

### **Funcionalidades:**

✅ **Valores Zerados** - Todos os campos começam em 0  
✅ **Edição Completa** - Pode ser totalmente personalizado  
✅ **Seleção Automática** - Fica selecionado ao ser criado  
✅ **Proteção contra Exclusão** - Não pode deletar o último timer  

## Interface de Criação

### **Botão "CRIAR NOVO TIMER"**
- **Localização**: Topo da tela de configurações
- **Cor**: Verde (#7BFF7B)
- **Ação**: Cria um novo timer com valores zerados
- **Seleção**: Automaticamente seleciona o novo timer

### **Funcionalidade:**
```tsx
const handleCreateNewTimer = () => {
  createTimer({
    nome: 'Novo Timer',
    preparar: 0,
    exercicio: 0,
    descanso: 0,
    rodadas: 0,
    ciclos: 0,
    descansoEntreCiclos: 0,
  });
};
```

## Melhorias no Contexto

### **Nova Função createTimer:**
```tsx
const createTimer = (timerData: Omit<Timer, 'id'>) => {
  const newId = (Math.max(...timers.map(t => parseInt(t.id))) + 1).toString();
  const newTimer: Timer = {
    id: newId,
    ...timerData,
  };
  setTimers(prev => [...prev, newTimer]);
  setSelectedId(newId);
};
```

### **Interface Atualizada:**
```tsx
interface ConfigContextType {
  timers: Timer[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  updateTimer: (timer: Timer) => void;
  deleteTimer: (id: string) => void;
  createTimer: (timer: Omit<Timer, 'id'>) => void; // Nova função
}
```

## Fluxo de Uso

### **1. Criar Novo Timer**
1. Vá para a aba "Personalizar"
2. Clique em "+ CRIAR NOVO TIMER"
3. Novo timer é criado e selecionado automaticamente

### **2. Configurar Timer**
1. Clique em "EDITAR" no novo timer
2. Configure todos os valores desejados
3. Clique em "SALVAR"

### **3. Usar Timer**
1. Vá para a aba "Treino"
2. O timer personalizado já estará selecionado
3. Configure e inicie o treino

## Proteções Implementadas

### **Proteção contra Exclusão:**
```tsx
disabled={timers.length <= 1}
```
- Não permite deletar o último timer
- Garante que sempre haja pelo menos um timer disponível

### **ID Automático:**
```tsx
const newId = (Math.max(...timers.map(t => parseInt(t.id))) + 1).toString();
```
- Gera ID único automaticamente
- Evita conflitos de ID

## Benefícios

🎯 **Flexibilidade Total** - Usuário pode criar qualquer configuração  
🚀 **Facilidade de Uso** - Botão simples para criar novo timer  
🛡️ **Proteção de Dados** - Não perde todos os timers  
⚡ **Seleção Automática** - Novo timer fica ativo imediatamente  
📱 **UX Melhorada** - Interface intuitiva e responsiva  

## Exemplo de Uso

### **Criar Timer HIIT Personalizado:**
1. Clicar em "+ CRIAR NOVO TIMER"
2. Editar nome: "Meu HIIT"
3. Configurar:
   - Preparar: 00:10
   - Exercício: 00:30
   - Descanso: 00:15
   - Rodadas: 8
   - Ciclos: 2
   - Descanso entre ciclos: 01:00
4. Salvar e usar!

## Arquivos Modificados

### `components/ConfigContext.tsx`
- Adicionado timer personalizado aos defaults
- Implementada função createTimer
- Atualizada interface do contexto

### `app/(tabs)/settings.tsx`
- Adicionado botão de criar novo timer
- Implementada função handleCreateNewTimer
- Adicionada proteção contra exclusão do último timer

## Próximos Passos

1. **Validação de Entrada** - Verificar valores mínimos/máximos
2. **Templates** - Adicionar templates pré-configurados
3. **Import/Export** - Permitir salvar/carregar configurações
4. **Categorias** - Organizar timers por tipo de treino 