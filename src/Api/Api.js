import { get, post } from './http'
//首页
// let url = '/API'
// let stydy_url = 'NEWAPI'

let url = '/api/party'


export const GetIndexNewsList = params => get(url+'/GetIndexNewsList', params);
//政策宣贯栏目
export const GetClassNewsList_zcxg = params => get(url+'/GetClassNewsList_zcxg', params);
//栏目首页的分页新闻 
export const GetClassNewsList_Other = params => get(url+'/GetClassNewsList_Other', params);
//热门风采
export const GetClass_Hot = params => get(url+'/GetClass_Hot', params);
//获取新闻内容 
export const NewsContent = params => post(url+'/NewsContent', params);
//党员登录
export const PartMemberLogin = params => post(url+'/PartMemberLogin', params);
//党员列表
export const GetPartyMemberList = params => get(url+'/GetPartyMemberList', params);
//党员资料
export const GetPartMemberByID = params => post(url+'/GetPartMemberByID', params);
//点赞
export const Admire = params => post(url+'/Admire', params); 
//获取学习教育新闻列表
export const GetClassNewsList_Study  = params => get(url+'/GetClassNewsList_Study', params);
//获取学习教育新闻详情
export const NewsContent_Study  = params => post(url+'/NewsContent_Study', params);