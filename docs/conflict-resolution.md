# PR コンフリクト解消メモ

このリポジトリは `main` ブランチに push すると GitHub Pages へ自動デプロイされます。
PR でコンフリクトが出た場合は、以下の手順で解消してください。

## よくある衝突ポイント
- `.github/workflows/pages.yml`
- `README.md`
- `index.html` / `styles.css` / `app.js`

## 解消手順（例）
1. 最新の `main` を取得して rebase します。
2. コンフリクトが出たファイルを開き、`<<<<<<<` などのマーカーを削除しながら内容を統合します。
3. `git add` で解消したファイルをステージし、`git rebase --continue` で再開します。
4. PR を更新すると自動で再検証されます。

## GitHub Pages ワークフローの注意点
- Pages の Source は **GitHub Actions** を選択する必要があります。
- `.github/workflows/pages.yml` はルートをそのままデプロイする設定になっています。
