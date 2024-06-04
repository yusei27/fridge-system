import {defineStore} from "pinia";

//現状リロードでストアが吹っ飛ぶので、そのうちセッションストレージに保存するようにする
//https://qiita.com/tsuchinoko0102/items/7a8d4ad633291ac128e2

interface State {
    //基本的にストアにはmapを用意しているが、検索などをしない想定なので、アラートストアには用意しない
    notificationList: notification[];
}

interface notification {
    type:notification_type;
    message: string;
}
export type notification_type = "success" | "info" | "warning" | "error"

// type request = {
//     "table":string,
//     "columns": string[]
// }

export const usenotificationStore = defineStore({
    id:'notifications',
    state: (): State=> {
        return{
            notificationList: new Array<notification>()
        }
    },

        
    actions: {
        pushnotificationList(type:notification_type, message:string): void {
            this.notificationList.push({
                type:type,
                message:message
            })
            //アラートが表示されてから3秒後にそのアラート表示を削除する
            setTimeout(() => {
                this.notificationList.shift();
            }, 3000);


            // axiosClient.post("http://localhost/get_data/select/data",
            //     JSON.stringify(request),
            //     //{headers:{'Content-Type': 'application/json'}}
            // )
            //         .then((res: AxiosResponse) => {
            //             console.log("select/data_成功", res.data.data);
            //             this.genreList.splice(0)//配列のなかみを空に(再取得時のため)
            //             res.data.data.forEach((resData:genre) => {
            //                 const data: genre = {
            //                     id_genre: resData["id_genre"],
            //                     name_genre: resData["name_genre"],
            //                 };
            //                 this.genreListMap.set(String(data["id_genre"]), data);
            //                 this.genreList.push(data);
            //             });
            //         })
            //         .catch((e: AxiosError<{error: string}>) => {
            //             notification("材料テーブル取得失敗");
            //             return 
            //         })

        }
    }
})
