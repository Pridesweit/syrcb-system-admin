import type { IPageQuery } from '@/api/interface'

export namespace ILoanContact {

  // 查询条件
  export interface Query extends IPageQuery {
    signingInstitution?: string
    customerType?: string
    customerName?: string
    idNumber?: string
    customerNumber?: string
    businessType?: string
    contractId?: string
    contractType?: string
    contractAmount?: number
    usedQuota?: number
    availableQuota?: number
    contractStartDateStart?: string
    contractStartDateEnd?: string
    contractEndDateStart?: string
    contractEndDateEnd?: string
    signedDateStart?: string
    signedDateEnd?: string
    terminationDateStart?: string
    terminationDateEnd?: string
    repaymentCycle?: string
    repaymentMethod?: string
    signedRate?: number
    guaranteeMethod?: string
    guaranteeContractId?: string
    encumbranceCertificateNumber?: string
    loanPurpose?: string
    customerManager?: string
    creditBusinessId?: string
    contractStatus?: string
    loanVideoPath?: string
    telRecordingPath?: string
    loanDataPath?: string
  }

  // 编辑form表单
  export interface Form {
    id?: number
    signingInstitution?: string
    customerType?: string
    customerName?: string
    idNumber?: string
    customerNumber?: string
    businessType?: string
    contractId?: string
    contractType?: string
    contractAmount?: number
    usedQuota?: number
    availableQuota?: number
    contractStartDate?: string
    contractEndDate?: string
    signedDate?: string
    terminationDate?: string
    repaymentCycle?: string
    repaymentMethod?: string
    signedRate?: number
    guaranteeMethod?: string
    guaranteeContractId?: string
    encumbranceCertificateNumber?: string
    loanPurpose?: string
    customerManager?: string
    creditBusinessId?: string
    contractStatus?: string
    loanVideoPath?: string
    telRecordingPath?: string
    loanDataPath?: string
 }

  // list或detail返回结构
  export interface Row {
    id?: number
    signingInstitution?: string
    customerType?: string
    customerName?: string
    idNumber?: string
    customerNumber?: string
    businessType?: string
    contractId?: string
    contractType?: string
    contractAmount?: number
    usedQuota?: number
    availableQuota?: number
    contractStartDate?: string
    contractEndDate?: string
    signedDate?: string
    terminationDate?: string
    repaymentCycle?: string
    repaymentMethod?: string
    signedRate?: number
    guaranteeMethod?: string
    guaranteeContractId?: string
    encumbranceCertificateNumber?: string
    loanPurpose?: string
    customerManager?: string
    creditBusinessId?: string
    contractStatus?: string
    loanVideoPath?: string
    telRecordingPath?: string
    loanDataPath?: string
  }

}