# GRAIN - ベーカリーカフェ 静的サイト

大阪のベーカリーカフェ「GRAIN」のフロントエンド静的サイトです。  
HTML / SCSS / JavaScript のみで構築しており、WordPress テーマ移行のベースになっています。

## WordPress テーマ版

WordPress テーマとして移行したリポジトリは別途管理しています。  
→ [GRAIN WordPress テーマ](https://github.com/nanahara-7/grain-wordpress)

## 使用技術

- HTML
- SCSS / CSS
- JavaScript
- GSAP（アニメーション）
- Git / GitHub（バージョン管理）

## ページ構成

| ファイル | ページ |
|---|---|
| `index.html` | トップページ |
| `menu.html` | メニュー |
| `news.html` | お知らせ一覧 |
| `news-post.html` | お知らせ個別記事 |
| `contact.html` | お問い合わせ |
| `thanks.html` | 送信完了 |
| `privacy.html` | プライバシーポリシー |
| `404.html` | 404ページ |

## 主な実装内容

- GSAP を使ったローディング・スクロールアニメーション（初回のみローディング表示）
- ケンバーンズエフェクトを使ったヒーロースライドショー
- カテゴリーフィルター（GSAP アニメーション付き）
- メニューページのページネーション（JS 自作）
- モーダルウィンドウ（スライドイン）
- ドロワーメニュー
- レスポンシブデザイン対応
- カウントアップアニメーション
