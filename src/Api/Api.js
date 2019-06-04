import { get, post } from './http'
//首页
export const GetIndexNewsList = params => get('/GetIndexNewsList', params);
//政策宣贯栏目
export const GetClassNewsList_zcxg = params => get('/GetClassNewsList_zcxg', params);
//栏目首页的分页新闻 
export const GetClassNewsList_Other = params => get('/GetClassNewsList_Other', params);
//热门风采
export const GetClass_Hot = params => get('/GetClass_Hot', params);
//获取新闻内容 
export const NewsContent = params => post('/NewsContent', params);
//党员登录
export const PartMemberLogin = params => post('/PartMemberLogin', params);
//党员列表
export const GetPartyMemberList = params => get('/GetPartyMemberList', params);
//党员资料
export const GetPartMemberByID = params => post('/GetPartMemberByID', params);
//点赞
export const Admire = params => post('/Admire', params); 
