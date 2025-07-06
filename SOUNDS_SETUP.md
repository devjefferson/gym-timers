# Configuração de Sons do Temporizador

## Arquivos de Som Necessários

Para que os sons específicos de cada etapa funcionem, você precisa adicionar os seguintes arquivos na pasta `assets/sounds/`:

### Sons por Etapa:

1. **preparar.mp3** - Som para a etapa "Preparar"
   - Recomendado: Som curto e agudo (ex: "beep" alto)
   - Duração: 0.5-1 segundo

2. **exercicio.mp3** - Som para a etapa "Exercício"
   - Recomendado: Som energético e motivacional
   - Duração: 1-2 segundos

3. **descanso.mp3** - Som para a etapa "Descansar"
   - Recomendado: Som suave e relaxante
   - Duração: 1-2 segundos

4. **descanso-ciclo.mp3** - Som para "Descanso entre ciclos"
   - Recomendado: Som diferente do descanso normal (ex: mais longo)
   - Duração: 2-3 segundos

5. **final.mp3** - Som para finalização do treino
   - Recomendado: Som de conquista/vitória
   - Duração: 2-3 segundos

6. **beep.mp3** - Som padrão (fallback)
   - Recomendado: Som genérico de beep
   - Duração: 0.5-1 segundo

## Como Adicionar os Sons:

### Opção 1: Usar Sons Online
1. Baixe sons gratuitos de sites como:
   - https://freesound.org/
   - https://mixkit.co/free-sound-effects/
   - https://www.zapsplat.com/

2. Converta para MP3 se necessário

3. Renomeie os arquivos conforme a lista acima

4. Coloque na pasta `assets/sounds/`

### Opção 2: Criar Sons Simples
Você pode usar ferramentas online para gerar sons:
- https://www.soundjay.com/beep-sounds.html
- https://www.beepgenerator.com/

### Opção 3: Usar Sons do Sistema
Se preferir, pode usar sons do sistema operacional e convertê-los.

## Estrutura Final:
```
assets/sounds/
├── preparar.mp3
├── exercicio.mp3
├── descanso.mp3
├── descanso-ciclo.mp3
├── final.mp3
└── beep.mp3
```

## Funcionamento:
- Cada etapa do temporizador tocará um som específico
- Som de início quando o temporizador é iniciado
- Som de finalização quando o treino termina
- Se um som não for encontrado, o app continuará funcionando silenciosamente
- Os sons são tocados quando uma etapa termina e a próxima começa
- A vibração também acontece junto com o som

## Notas:
- Formatos suportados: MP3, WAV, M4A
- Tamanho recomendado: < 1MB por arquivo
- Qualidade: 44.1kHz, 128kbps é suficiente 