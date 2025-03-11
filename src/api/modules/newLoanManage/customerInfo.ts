import http from '@/api'
import { ADMIN_MODULE } from '@/api/helper/prefix'
import type { IPage } from '@/api/interface'
import type { ICustomerInfo } from '@/api/interface/newLoanManage/customerInfo'
import type { UploadRawFile } from "element-plus/es/components/upload/src/upload";
import type { AxiosRequestConfig } from 'axios';

/**
* 查询列表
* @param params
* @returns {*}
*/
export const getCustomerInfoListApi = (params: ICustomerInfo.Query) => {
  return http.get<IPage<ICustomerInfo.Row>>(ADMIN_MODULE + `/customer-info`, params)
}

/**
* 添加
* @param params
* @returns {*}
*/
export const createCustomerInfoApi = (params: ICustomerInfo.Form) => {
  return http.post(ADMIN_MODULE + `/customer-info`, params)
}

/**
* 修改
* @param params
* @returns {*}
*/
export const updateCustomerInfoApi = (params: ICustomerInfo.Form) => {
  return http.put(ADMIN_MODULE + `/customer-info`, params)
}

/**
* 删除
* @param params
* @returns {*}
*/
export const removeCustomerInfoApi = (params: { ids: (string | number)[] }) => {
 return http.delete(ADMIN_MODULE + `/customer-info`, params)
}

/**
* 获取详情
* @param params
* @returns {*}
*/
export const getCustomerInfoDetailApi = (params: { id: number }) => {
  const { id } = params
  return http.get<ICustomerInfo.Row>(ADMIN_MODULE + `/customer-info/${id}`)
}

/**
* 导入excel
* @param params
*/
export const importCustomerInfoExcelApi = (params : UploadRawFile, config?: AxiosRequestConfig<{}> | undefined) => {
  return http.upload(ADMIN_MODULE + `/customer-info/import`, params, config)
}

/**
* 导出excel
* @param params
* @returns {*}
*/
export const exportCustomerInfoExcelApi  = (params: ICustomerInfo.Query) => {
  return http.download(ADMIN_MODULE + `/customer-info/export`, params)
}