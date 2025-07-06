# Safe Area - Configuração

## Visão Geral

O Safe Area foi implementado para garantir que o conteúdo do app não fique sob áreas do sistema como barra de status, notch, home indicator, etc.

## Implementação

### 1. Dependência Instalada
```bash
npm install react-native-safe-area-context
```

### 2. Provider Global
```tsx
// app/_layout.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Resto do app */}
    </SafeAreaProvider>
  );
}
```

### 3. Uso nas Telas
```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TimerScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222' }}>
      {/* Conteúdo da tela */}
    </SafeAreaView>
  );
}
```

## Telas Configuradas

### ✅ Timer Screen
- **SafeAreaView** implementado
- **Fundo #222** consistente
- **Layout responsivo** para diferentes dispositivos

### ✅ Settings Screen  
- **SafeAreaView** implementado
- **KeyboardAvoidingView** mantido
- **ScrollView** funcional

## Benefícios

### 🛡️ **Proteção de Conteúdo**
- Evita que texto fique sob notch
- Respeita barra de status
- Adapta-se a diferentes telas

### 📱 **Compatibilidade**
- iPhone com notch
- Android com gestos
- Tablets
- Dispositivos com home indicator

### 🎨 **Design Consistente**
- Margens automáticas
- Padding adequado
- Visual uniforme

## Áreas Protegidas

### iOS
- **Status Bar** - Barra superior
- **Notch** - Área do sensor
- **Home Indicator** - Barra inferior
- **Dynamic Island** - Área interativa

### Android
- **Status Bar** - Barra superior
- **Navigation Bar** - Barra inferior
- **Gesture Area** - Área de gestos

## Configuração por Tela

### Timer Screen
```tsx
<SafeAreaView style={{ flex: 1, backgroundColor: '#222' }}>
  <View flex={1} paddingTop={24}>
    {/* Conteúdo centralizado */}
  </View>
</SafeAreaView>
```

### Settings Screen
```tsx
<SafeAreaView style={{ flex: 1, backgroundColor: '#222' }}>
  <KeyboardAvoidingView style={{ flex: 1 }}>
    <ScrollView flex={1} padding={16}>
      {/* Lista de configurações */}
    </ScrollView>
  </KeyboardAvoidingView>
</SafeAreaView>
```

## Hooks Disponíveis

### useSafeAreaInsets()
```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const insets = useSafeAreaInsets();

// Acessar valores específicos
const topInset = insets.top;
const bottomInset = insets.bottom;
const leftInset = insets.left;
const rightInset = insets.right;
```

### useSafeAreaFrame()
```tsx
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const frame = useSafeAreaFrame();

// Dimensões da área segura
const { width, height } = frame;
```

## Troubleshooting

### Conteúdo ainda aparece sob notch
- Verifique se `SafeAreaView` está envolvendo todo o conteúdo
- Confirme se o `backgroundColor` está definido

### Margens muito grandes
- Use `useSafeAreaInsets()` para controle fino
- Ajuste padding/margin conforme necessário

### Problemas no Android
- Verifique se `android:windowSoftInputMode` está configurado
- Teste em diferentes versões do Android

## Boas Práticas

✅ **Sempre use SafeAreaView** em telas principais  
✅ **Defina backgroundColor** para evitar transparência  
✅ **Teste em diferentes dispositivos**  
✅ **Use insets para controle fino** quando necessário  
✅ **Mantenha consistência** entre telas  

## Exemplo Avançado

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#222',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      {/* Conteúdo personalizado */}
    </View>
  );
}
``` 