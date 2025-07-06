# Splash Screen - Configuração

## Visão Geral

A splash screen do app foi configurada usando o `expo-splash-screen`, que é a forma nativa e recomendada pelo Expo.

## Configuração Atual

### app.json
```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 120,
          "imageHeight": 120,
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

### Características:
- **Fundo**: #222 (escuro)
- **Imagem**: splash-icon.png (120x120px)
- **Modo**: contain (mantém proporção)
- **Tema escuro**: Mesma configuração

## Funcionamento

### 1. Inicialização
- `SplashScreen.preventAutoHideAsync()` - Mantém a splash visível
- Carregamento de fontes e recursos
- Aguarda 1 segundo para UX melhor

### 2. Preparação
- Fontes são carregadas
- Estado `appIsReady` é definido como true
- Splash screen é escondida automaticamente

### 3. Transição
- Splash desaparece suavemente
- App principal é exibido
- Status bar é configurada

## Arquivos Envolvidos

- **app.json** - Configuração da splash
- **app/_layout.tsx** - Lógica de controle
- **assets/images/splash-icon.png** - Imagem da splash

## Personalização

### Mudar a Imagem
1. Substitua `assets/images/splash-icon.png`
2. Ajuste `imageWidth` e `imageHeight` no app.json
3. Rebuild o app

### Mudar o Fundo
```json
{
  "backgroundColor": "#SUA_COR",
  "dark": {
    "backgroundColor": "#SUA_COR_ESCURA"
  }
}
```

### Mudar o Tamanho
```json
{
  "imageWidth": 150,
  "imageHeight": 150
}
```

## Vantagens do expo-splash-screen

✅ **Nativo** - Performance melhor  
✅ **Consistente** - Mesmo comportamento em todas as plataformas  
✅ **Configurável** - Fácil personalização  
✅ **Estável** - Menos bugs  
✅ **Oficial** - Suporte do Expo  

## Troubleshooting

### Splash não aparece
- Verifique se `preventAutoHideAsync()` está sendo chamado
- Confirme se a imagem existe em `assets/images/`

### Splash não desaparece
- Verifique se `hideAsync()` está sendo chamado
- Confirme se `appIsReady` e `loaded` são true

### Imagem distorcida
- Ajuste `resizeMode` para "contain" ou "cover"
- Verifique as dimensões da imagem 