# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# パッケージをインストール
COPY package.json package-lock.json ./
RUN npm install

# アプリケーションコードをコピー
COPY . .

# 開発サーバーを起動
EXPOSE 3000
CMD ["npm", "run", "dev"]
