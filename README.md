# Hebith-FX

A synthesizer and real-time effects instrument for the mobile web.

**https://shitake.github.io/hebith-fx-pages/**

```mermaid
%%{init: {"theme": "base", "themeVariables": {"fontSize": "13px", "primaryColor": "#f3f3f0", "primaryTextColor": "#3a3a37", "primaryBorderColor": "#c6c6c0", "lineColor": "#a5a59e", "edgeLabelBackground": "#fbfbf9", "tertiaryColor": "#fbfbf9", "clusterBkg": "#fbfbf9", "clusterBorder": "#dedcd6"}}}%%
flowchart TD
    KEYS["鍵盤"]:::play
    ARP["ARP<br> 16 ステップ × 2 レイヤー"]:::play
    PADS["4×4 パッド"]:::play

    SYNTH["SYNTH<br> 2 OSC + ノイズ / 2 フィルタ / LFO"]:::voice
    DRUM["DRUM<br> 16 ボイス"]:::voice

    TONE["音色加工<br> FOLD / RING / COMB / フィルタ"]:::proc

    subgraph RT["リアルタイム加工"]
        FX["PUNCH FX<br> 16 種"]:::proc
        BOK["BOKEH<br> グラニュラー 11 種"]:::proc
        LOOP["LOOPER<br> 焼き付けと重ね録り"]:::proc
    end

    SPACE["THROW / SPACE<br> ディレイ・リバーブ"]:::send
    OUT["OUT"]:::out

    KEYS --> SYNTH
    ARP --> SYNTH
    PADS --> DRUM
    SYNTH --> TONE
    DRUM --> TONE
    TONE --> FX --> BOK --> LOOP
    LOOP --> SPACE --> OUT

    classDef play  fill:#e7ecef,stroke:#b7c2c8,color:#3a3a37
    classDef voice fill:#e9ece4,stroke:#bcc4b2,color:#3a3a37
    classDef proc  fill:#f1ece3,stroke:#ccc2b1,color:#3a3a37
    classDef send  fill:#eae9f0,stroke:#c0bece,color:#3a3a37
    classDef out   fill:#dedbd5,stroke:#aeaaa2,color:#3a3a37
```

| 図の色 | 種類 |
|--------|------|
| 青灰 | 演奏面 |
| 緑灰 | 音源 |
| 砂 | 加工 |
| 藤 | 空間系 |
| 濃灰 | 出力 |

| 項目 | 内容 |
|------|------|
| 使い方 | [ユーザマニュアル](https://shitake.github.io/hebith-fx-pages/manual/)(日本語 / English) |
| 動作環境 | モバイル Web(スマートフォンでの利用を想定)。タブレット・デスクトップでも動作する |
| 依存 | なし。一度開けばオフラインで動作する |
| ライセンス | [MIT](LICENSE) |
