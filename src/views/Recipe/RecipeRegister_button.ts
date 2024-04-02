import type {AxiosResponse, AxiosError} from "axios";
import axios from "axios";

//登録ボタン押下時の処理
 export function registerRecipe(recipeIngredientsList): void{
    console.log("保存ボタン開始");
    type ingredient_alredy_exist = {
        "id_ingredient":number,
        "num":number,
        "id_unit":number,
        "id_genre":number
    }
    type ingredient_not_exist = {
        "ingredient_name":string,
        "num":number,
        "id_unit":number,
        "id_genre":number
    }
    type request = {
    "name_recipe":string,
    "serving_size": number,
    "method":string,
    "ingredient_alredy_exist":ingredient_alredy_exist[],//すでに材料が材料テーブルに登録されているリスト
    "ingredient_not_exist":ingredient_not_exist[]//まだ材料が材料テーブルに登録されていないリスト
    }
    const ingredientsExistList: ingredient_alredy_exist[] = [];
    const ingredientsNotExistList: ingredient_not_exist[] = [];
    recipeIngredientsList.forEach((obj, index) => {
        if (typeof obj.name == "string"){
            ingredientsNotExistList.push(
                {
                    "ingredient_name":obj.name,
                    "num":obj.number,
                    "id_unit":obj.unit,
                    "id_genre":obj.genre
                }
            );
        }else{
            ingredientsExistList.push(
                {
                    "id_ingredient":obj.name["id_ingredient"],
                    "num":obj.number,
                    "id_unit":obj.unit,
                    "id_genre":obj.genre
                }
            )
        }

    });
    const request = {
            "name_recipe":recipeName.value,
            "serving_size": Number(recipeServingSize.value.replace("人", "")),//ex ["３人"]→3
            "method":recipeMethod.value,
            "ingredient_alredy_exist":ingredientsExistList,//すでに材料が材料テーブルに登録されているリスト
            "ingredient_not_exist":ingredientsNotExistList//まだ材料が材料テーブルに登録されていないリスト
        }

    axios.post("http://localhost:3334//register/recipe",
            JSON.stringify(request),
            {headers:{'Content-Type': 'application/json'}})
                .then((res: AxiosResponse) => {
                    console.log("register/recipe成功", res.data);
                    alert("レシピ登録に成功しました。");
                })
                .catch((e: AxiosError<{error: string}>) => {
                    alert("材料テーブル取得失敗");
                    return 
                })
}