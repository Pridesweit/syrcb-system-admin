import type { IPageQuery } from '@/api/interface'

export namespace ICutomerInfo {

  // 查询条件
  export interface Query extends IPageQuery {
    organizationName?: string
    accountName?: string
    idNumber?: string
    address?: string
    phoneNumber?: string
  }

  // 编辑form表单
  export interface Form {
    id?: number
    organizationName?: string
    accountName?: string
    idNumber?: string
    address?: string
    phoneNumber?: string
 }

  // list或detail返回结构
  export interface Row {
    id?: number
    organizationName?: string
    accountName?: string
    idNumber?: string
    address?: string
    phoneNumber?: string
  }

}