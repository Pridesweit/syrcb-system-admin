import http from '@/api'
import { ADMIN_MODULE } from '@/api/helper/prefix'
import type { IPage } from '@/api/interface'
import type { ICutomerInfo } from '@/api/interface/cutomerinfo/cutomerInfo'
import type { UploadRawFile } from "element-plus/es/components/upload/src/upload";
import type { AxiosRequestConfig } from 'axios';

/**
* 查询列表
* @param params
* @returns {*}
*/
export const getCutomerInfoListApi = (params: ICutomerInfo.Query) => {
  return http.get<IPage<ICutomerInfo.Row>>(ADMIN_MODULE + `/cutomer-info`, params)
}

/**
* 添加
* @param params
* @returns {*}
*/
export const createCutomerInfoApi = (params: ICutomerInfo.Form) => {
  return http.post(ADMIN_MODULE + `/cutomer-info`, params)
}

/**
* 修改
* @param params
* @returns {*}
*/
export const updateCutomerInfoApi = (params: ICutomerInfo.Form) => {
  return http.put(ADMIN_MODULE + `/cutomer-info`, params)
}

/**
* 删除
* @param params
* @returns {*}
*/
export const removeCutomerInfoApi = (params: { ids: (string | number)[] }) => {
 return http.delete(ADMIN_MODULE + `/cutomer-info`, params)
}

/**
* 获取详情
* @param params
* @returns {*}
*/
export const getCutomerInfoDetailApi = (params: { id: number }) => {
  const { id } = params
  return http.get<ICutomerInfo.Row>(ADMIN_MODULE + `/cutomer-info/${id}`)
}

/**
* 导入excel
* @param params
*/
export const importCutomerInfoExcelApi = (params : UploadRawFile, config?: AxiosRequestConfig<{}> | undefined) => {
  return http.upload(ADMIN_MODULE + `/cutomer-info/import`, params, config)
}

/**
* 导出excel
* @param params
* @returns {*}
*/
export const exportCutomerInfoExcelApi  = (params: ICutomerInfo.Query) => {
  return http.download(ADMIN_MODULE + `/cutomer-info/export`, params)
}