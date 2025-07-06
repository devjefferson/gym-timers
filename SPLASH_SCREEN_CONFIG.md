# Configuração da Splash Screen e Ícones

## Visão Geral

O app "Gym Timers - HIIT Timer" está configurado com uma splash screen personalizada e ícones otimizados para diferentes plataformas.

## Configurações Atuais

### Nome do App
- **Nome**: "Gym Timers - HIIT Timer"
- **Slug**: "gym-timers"
- **Versão**: 1.0.0

### Splash Screen
- **Imagem**: `./assets/images/splash-icon.png`
- **Dimensões**: 150x150 pixels
- **Modo de Redimensionamento**: "contain"
- **Cor de Fundo**: #222 (cinza escuro)
- **Suporte a Modo Escuro**: Sim

### Ícones
- **Ícone Principal**: `./assets/images/icon.png`
- **Ícone Adaptativo (Android)**: `./assets/images/adaptive-icon.png`
- **Favicon (Web)**: `./assets/images/favicon.png`

## Configuração no app.json

```json
{
  "expo": {
    "name": "Gym Timers - HIIT Timer",
    "slug": "gym-timers",
    "icon": "./assets/images/icon.png",
    "plugins": [
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 150,
          "imageHeight": 150,
          "resizeMode": "contain",
          "backgroundColor": "#222",
          "dark": {
            "image": "./assets/images/splash-icon.png",
            "backgroundColor": "#222"
          }
        }
      ]
    ]
  }
}
```

## Controle da Splash Screen

### No Layout Principal (`app/_layout.tsx`)

```typescript
// Manter a splash screen visível
SplashScreen.preventAutoHideAsync();

// Preparar recursos
async function prepare() {
  try {
    // Simular carregamento (1.5 segundos)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Aqui você pode adicionar outras inicializações
    // como carregar dados do AsyncStorage, configurar APIs, etc.
    
  } catch (e) {
    console.warn('Erro durante inicialização:', e);
  } finally {
    setAppIsReady(true);
  }
}

// Esconder quando tudo estiver pronto
if (appIsReady && loaded) {
  SplashScreen.hideAsync().catch(console.warn);
}
```

## Personalização

### Para Alterar o Nome do App
Edite a propriedade `name` no `app.json`:
```json
{
  "expo": {
    "name": "Seu Novo Nome"
  }
}
```

### Para Alterar a Splash Screen
1. Substitua o arquivo `./assets/images/splash-icon.png`
2. Ajuste as dimensões no `app.json` se necessário
3. Para diferentes cores de fundo:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#SUA_COR",
          "dark": {
            "backgroundColor": "#SUA_COR_ESCURA"
          }
        }
      ]
    ]
  }
}
```

### Para Alterar o Ícone
1. Substitua o arquivo `./assets/images/icon.png` (1024x1024px recomendado)
2. Para Android, substitua `./assets/images/adaptive-icon.png`
3. Para Web, substitua `./assets/images/favicon.png`

## Dicas de Design

### Splash Screen
- Use imagens PNG com fundo transparente
- Mantenha o design simples e limpo
- Teste em diferentes tamanhos de tela
- Considere o modo escuro

### Ícones
- Use formato PNG
- Tamanho recomendado: 1024x1024 pixels
- Mantenha margens seguras
- Teste em diferentes fundos

## Comandos Úteis

```bash
# Limpar cache do Expo
npx expo start --clear

# Rebuild após alterações de ícones
npx expo prebuild --clean

# Testar em dispositivo
npx expo run:ios
npx expo run:android
```

## Troubleshooting

### Splash Screen não aparece
- Verifique se o plugin está configurado corretamente
- Limpe o cache: `npx expo start --clear`
- Rebuild o projeto: `npx expo prebuild --clean`

### Ícone não atualiza
- Limpe o cache do dispositivo
- Rebuild o projeto
- Verifique se o arquivo tem o tamanho correto

### Problemas de Performance
- Reduza o tempo de splash screen se necessário
- Otimize as imagens
- Considere lazy loading para recursos pesados 