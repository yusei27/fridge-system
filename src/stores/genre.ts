import {defineStore} from "pinia";
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import axios from "axios"

//現状リロードでストアが吹っ飛ぶので、そのうちセッションストレージに保存するようにする
//https://qiita.com/tsuchinoko0102/items/7a8d4ad633291ac128e2

interface State {
    genreList: Array<genre>;
}

export interface genre{
    id_genre: number,
    name_genre: string,
};

type request = {
    "table":string,
    "columns": string[]
}

export const useGenreStore = defineStore({
    id:'genres',
    state: (): State=> ({genreList: new Array<genre>()}),

        
    actions: {
        initList(): void {
            console.log("ジャンルテーブル取得")
            //request作成
            const columns: string[] = ["id_genre", "name_genre"];
            const table2: string = 'genre_table'
            const request:request = {
                "table":table2,
                "columns":columns
            }

            axios.post("http://localhost:3334//select/data",
                JSON.stringify(request),
                {headers:{'Content-Type': 'application/json'}})
                    .then((res: AxiosResponse) => {
                        console.log("select/data_成功");
                        this.genreList.splice(0)//配列のなかみを空に(再取得時のため)
                        console.log("res data", res.data)
                        res.data.data.forEach((resData:genre) => {
                            const data: genre = {
                                id_genre: resData["id_genre"],
                                name_genre: resData["name_genre"],
                            };
                            this.genreList.push(data);
                        });
                        console.log("genreList store");
                        console.log(this.genreList);
                    })
                    .catch((e: AxiosError<{error: string}>) => {
                        alert("材料テーブル取得失敗");
                        return 
                    })

        }
    }
})