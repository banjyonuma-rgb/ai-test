# ポケット集中タイマー

スマホから使える軽量な集中タイマーのサンプルです。GitHub Pages で公開して、ブラウザからアクセスできます。

## 何ができる？
- 15 / 25 / 45 分の集中タイマーをワンタップで開始
- 終了すると自動で 3 分休憩に切り替え
- 今日のミニ目標を登録して達成チェック（端末内に保存）

## GitHub Pages で自動公開する手順
1. このリポジトリを GitHub に push
2. GitHub の **Settings → Pages** を開く
3. **Build and deployment** で **Source** を **GitHub Actions** に変更
4. `main` ブランチに push すると自動で公開されます
5. Actions が完了したら表示される URL にアクセス

## PR コンフリクトの解消
PR でコンフリクトが出た場合は、`docs/conflict-resolution.md` の手順を確認してください。

## ローカルで確認する
```bash
python -m http.server 8000
```
`http://localhost:8000` を開いてスマホ表示を確認できます。
