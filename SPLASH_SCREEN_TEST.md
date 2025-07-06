# Teste da Splash Screen

## Como Testar

### 1. **Teste Básico**
```bash
# Limpar cache e reiniciar
npx expo start --clear

# Ou reiniciar completamente
npx expo start --reset-cache
```

### 2. **Verificar Configuração**
- ✅ `expo-splash-screen` está instalado
- ✅ Imagem `splash-icon.png` existe em `assets/images/`
- ✅ Configuração no `app.json` está correta
- ✅ CustomSplashScreen está implementado como fallback

### 3. **Teste em Dispositivo**
```bash
# Para iOS
npx expo run:ios

# Para Android
npx expo run:android
```

### 4. **Verificar Logs**
- Abra o console do Expo
- Procure por mensagens relacionadas à splash screen
- Verifique se há erros de carregamento

## Possíveis Problemas

### Problema 1: Splash Screen não aparece
**Solução:**
1. Verifique se a imagem existe: `ls assets/images/splash-icon.png`
2. Limpe o cache: `npx expo start --clear`
3. Rebuild: `npx expo prebuild --clean`

### Problema 2: Splash Screen aparece mas não some
**Solução:**
1. Verifique se `SplashScreen.hideAsync()` está sendo chamado
2. Adicione logs para debug:
```typescript
console.log('App ready:', appIsReady, 'Fonts loaded:', loaded);
```

### Problema 3: CustomSplashScreen não funciona
**Solução:**
1. Verifique se o componente está sendo importado corretamente
2. Teste com `visible={true}` para forçar exibição

## Debug Avançado

### Adicionar Logs
```typescript
useEffect(() => {
  async function prepare() {
    try {
      console.log('Iniciando preparação...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Preparação concluída');
    } catch (e) {
      console.warn('Erro durante inicialização:', e);
    } finally {
      console.log('Definindo app como pronto');
      setAppIsReady(true);
    }
  }

  prepare();
}, []);

useEffect(() => {
  console.log('Estado atual:', { appIsReady, loaded });
  if (appIsReady && loaded) {
    console.log('Escondendo splash screen...');
    SplashScreen.hideAsync();
  }
}, [appIsReady, loaded]);
```

### Teste Manual
```typescript
// Forçar exibição da splash screen
const [showSplash, setShowSplash] = useState(true);

useEffect(() => {
  setTimeout(() => {
    setShowSplash(false);
  }, 3000);
}, []);

// No JSX
<CustomSplashScreen visible={showSplash} />
```

## Configurações Alternativas

### Configuração 1: Splash Screen Nativa
```json
{
  "expo": {
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#222"
    }
  }
}
```

### Configuração 2: Plugin expo-splash-screen
```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 150,
          "imageHeight": 150,
          "resizeMode": "contain",
          "backgroundColor": "#222"
        }
      ]
    ]
  }
}
```

### Configuração 3: Custom Splash Screen
```typescript
// Usar apenas o CustomSplashScreen
// Remover configurações nativas do app.json
// Controlar completamente via React Native
```

## Comandos Úteis

```bash
# Limpar tudo
rm -rf node_modules
npm install
npx expo start --clear

# Verificar arquivos
ls -la assets/images/
file assets/images/splash-icon.png

# Testar em desenvolvimento
npx expo start --dev-client
``` 