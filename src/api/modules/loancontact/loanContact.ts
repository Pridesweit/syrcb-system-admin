import http from '@/api'
import { ADMIN_MODULE } from '@/api/helper/prefix'
import type { IPage } from '@/api/interface'
import type { ILoanContact } from '@/api/interface/loancontact/loanContact'
import type { UploadRawFile } from "element-plus/es/components/upload/src/upload";
import type { AxiosRequestConfig } from 'axios';

/**
* 查询列表
* @param params
* @returns {*}
*/
export const getLoanContactListApi = (params: ILoanContact.Query) => {
  return http.get<IPage<ILoanContact.Row>>(ADMIN_MODULE + `/loan-contact`, params)
}

/**
* 添加
* @param params
* @returns {*}
*/
export const createLoanContactApi = (params: ILoanContact.Form) => {
  return http.post(ADMIN_MODULE + `/loan-contact`, params)
}

/**
* 修改
* @param params
* @returns {*}
*/
export const updateLoanContactApi = (params: ILoanContact.Form) => {
  return http.put(ADMIN_MODULE + `/loan-contact`, params)
}

/**
* 删除
* @param params
* @returns {*}
*/
export const removeLoanContactApi = (params: { ids: (string | number)[] }) => {
 return http.delete(ADMIN_MODULE + `/loan-contact`, params)
}

/**
* 获取详情
* @param params
* @returns {*}
*/
export const getLoanContactDetailApi = (params: { id: number }) => {
  const { id } = params
  return http.get<ILoanContact.Row>(ADMIN_MODULE + `/loan-contact/${id}`)
}

/**
* 导入excel
* @param params
*/
export const importLoanContactExcelApi = (params : UploadRawFile, config?: AxiosRequestConfig<{}> | undefined) => {
  return http.upload(ADMIN_MODULE + `/loan-contact/import`, params, config)
}

/**
* 导出excel
* @param params
* @returns {*}
*/
export const exportLoanContactExcelApi  = (params: ILoanContact.Query) => {
  return http.download(ADMIN_MODULE + `/loan-contact/export`, params)
}