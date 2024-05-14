// import axios  from "axios";
 
// export const instance = axios.create({
//   withCredentials: true,
// })



//参考サイト　https://qiita.com/shira_qt/items/ab9fe50dc5dfce22dd59
import axios from 'axios';

//5秒以内にレスポンスが帰ってこないとタイムアウト
//https://blog.cosnomi.com/posts/1259/
//https://timmousk.com/blog/axios-timeout/
axios.defaults.timeout = 5000;

export const axiosClient = axios.create({
    // 必要に応じてconfigを設定
    //baseURL: 'http://localhost:3333',
    headers: {
      'Content-Type': 'application/json'
      //'content-type': 'application/x-www-form-urlencoded',
      //'Access-Control-Allow-Origin': 'https://localhost:5173',
    },
    withCredentials: true,
});

// リクエスト送信前に行いたい処理の定義
axiosClient.interceptors.request.use(req => {
    // リクエスト送信前に行いたい処理
    return req;
  }, err => {
    // リクエスト失敗時(ネットワークエラー等)に行いたい処理
    return Promise.reject(err);
});

// レスポンス受信後に行いたい処理の定義
axiosClient.interceptors.response.use(res => {
    // ステータスコードが200系以外の場合に実行する処理
    return res;
  }, err => {
    // ステータスコードが200系以外の場合に実行する処理
    return Promise.reject(err);
});