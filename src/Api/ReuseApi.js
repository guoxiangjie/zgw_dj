/*
 * @Author: Guo Xiang Jie 
 * @Date: 2019-03-29 14:13:49 
 * @Last Modified by: Guo Xiang Jie
 * @Last Modified time: 2019-03-29 14:16:01
 * 接口复用and接口改写
 */
import {GetClassNewsList_Other} from './Api'

export const ClassNewsList_Other = (ColumnsId, PageIndex, PageSize, callback) => {
    GetClassNewsList_Other({
        ColumnsId: ColumnsId,
        PageIndex: PageIndex,
        PageSize: PageSize
    })
        .then(res => {
            let total = res.data.RowCount;
            let content = res.data.Other.OtherImg;
            callback({
                total: total,
                content: content
            });
        })
        .catch(err => {
            console.log(
                `GetClassNewsList_Other接口中ColumnsId为${ColumnsId}时接口数据异常`
            );
        });
}