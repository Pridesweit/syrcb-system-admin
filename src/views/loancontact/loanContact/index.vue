<template>
  <div class="table-box">
    <ProTable
      ref="proTableRef"
      title=""
      :indent="20"
      :columns="columns"
      :search-columns="searchColumns"
      :request-api="getTableList"
      row-key="id"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button type="primary"
          v-auth="'loan.contact.create'"
          :icon="CirclePlus"
          @click="openAddEdit('新增')"
        >
          新增
        </el-button>
        <el-button
          v-auth="'loan.contact.remove'"
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
          @click="batchDelete(scope.selectedListIds)"
        >
          批量删除
        </el-button>
        <el-button
          v-auth="'loan.contact.import'"
          type="primary"
          :icon="Upload"
          plain
          @click="importData"
        >
          导入
        </el-button>
        <el-button
          v-auth="'loan.contact.export'"
          type="primary"
          :icon="Download"
          plain
          @click="downloadFile"
        >
          导出
        </el-button>
      </template>
      <template #operation="{ row }">
        <el-button
          v-auth="'loan.contact.update'"
          type="primary"
          link
          :icon="EditPen"
          @click="openAddEdit('编辑', row, false)"
        >
          编辑
        </el-button>
        <el-button
            v-auth="'loan.contact.remove'"
          type="primary"
          link
          :icon="Delete"
          @click="deleteInfo(row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <LoanContactForm ref="loanContactRef" />
    <ImportExcel ref="ImportExcelRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CirclePlus,
  Delete,
  EditPen,
  Upload,
  Download,
} from '@element-plus/icons-vue'
import ProTable from '@/components/ProTable/index.vue'
import {
  createLoanContactApi,
  removeLoanContactApi,
  updateLoanContactApi,
  getLoanContactListApi,
  getLoanContactDetailApi,
  importLoanContactExcelApi,
  exportLoanContactExcelApi,
} from '@/api/modules/loancontact/loanContact';
import { useHandleData } from '@/hooks/useHandleData';
import LoanContactForm from '@/views/loancontact/loanContact/components/LoanContactForm.vue';
import type { ColumnProps, ProTableInstance, SearchProps } from '@/components/ProTable/interface';
import type { ILoanContact } from '@/api/interface/loancontact/loanContact';
import ImportExcel from '@/components/ImportExcel/index.vue';
import { downloadTemplate } from '@/api/modules/system/common';
import { ElMessageBox } from "element-plus";
import { useDownload } from "@/hooks/useDownload";
defineOptions({
  name: 'LoanContactView'
})
const proTableRef = ref<ProTableInstance>();
// 表格配置项
const columns: ColumnProps<ILoanContact.Row>[] = [
  { type: 'selection', width: 80 },
  { prop: 'signingInstitution', label: '签约机构' },
  { prop: 'customerType', label: '客户类型' },
  { prop: 'customerName', label: '客户名称' },
  { prop: 'idNumber', label: '证件号码' },
  { prop: 'customerNumber', label: '客户号' },
  { prop: 'businessType', label: '业务品种' },
  { prop: 'contractId', label: '合同编号' },
  { prop: 'contractType', label: '合同类型' },
  { prop: 'contractAmount', label: '合同金额' },
  { prop: 'usedQuota', label: '已使用额度' },
  { prop: 'availableQuota', label: '可用额度' },
  { prop: 'contractStartDate', label: '合同起始日' },
  { prop: 'contractEndDate', label: '合同到期日' },
  { prop: 'signedDate', label: '签约日期' },
  { prop: 'terminationDate', label: '终止日期' },
  { prop: 'repaymentCycle', label: '还款周期' },
  { prop: 'repaymentMethod', label: '还款方式' },
  { prop: 'signedRate', label: '签约利率' },
  { prop: 'guaranteeMethod', label: '担保方式' },
  { prop: 'guaranteeContractId', label: '抵押/质押/保证合同编号' },
  { prop: 'encumbranceCertificateNumber', label: '他项权证号码' },
  { prop: 'loanPurpose', label: '借款原因' },
  { prop: 'customerManager', label: '客户经理' },
  { prop: 'creditBusinessId', label: '信贷业务编号' },
  { prop: 'contractStatus', label: '合同状态' },
  { prop: 'loanVideoPath', label: '贷款视频路径' },
  { prop: 'telRecordingPath', label: '电话录音路径' },
  { prop: 'loanDataPath', label: '贷款资料路径' },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]
// 搜索条件项
const searchColumns: SearchProps[] = [
  { prop: 'signingInstitution', label: '签约机构', el: 'input' },
  { prop: 'customerType', label: '客户类型', el: 'select' },
  { prop: 'customerName', label: '客户名称', el: 'input' },
  { prop: 'idNumber', label: '证件号码', el: 'input' },
  { prop: 'customerNumber', label: '客户号', el: 'input' },
  { prop: 'businessType', label: '业务品种', el: 'select' },
  { prop: 'contractId', label: '合同编号', el: 'input' },
  { prop: 'contractType', label: '合同类型', el: 'select' },
  { prop: 'contractAmount', label: '合同金额', el: 'input' },
  { prop: 'usedQuota', label: '已使用额度', el: 'input' },
  { prop: 'availableQuota', label: '可用额度', el: 'input' },
  { prop: 'contractStartDate', label: '合同起始日', el: 'input' },
  { prop: 'contractEndDate', label: '合同到期日', el: 'input' },
  { prop: 'signedDate', label: '签约日期', el: 'input' },
  { prop: 'terminationDate', label: '终止日期', el: 'input' },
  { prop: 'repaymentCycle', label: '还款周期', el: 'input' },
  { prop: 'repaymentMethod', label: '还款方式', el: 'input' },
  { prop: 'signedRate', label: '签约利率', el: 'input' },
  { prop: 'guaranteeMethod', label: '担保方式', el: 'input' },
  { prop: 'guaranteeContractId', label: '抵押/质押/保证合同编号', el: 'input' },
  { prop: 'encumbranceCertificateNumber', label: '他项权证号码', el: 'input' },
  { prop: 'loanPurpose', label: '借款原因', el: 'input' },
  { prop: 'customerManager', label: '客户经理', el: 'input' },
  { prop: 'creditBusinessId', label: '信贷业务编号', el: 'input' },
  { prop: 'contractStatus', label: '合同状态', el: 'select' },
  { prop: 'loanVideoPath', label: '贷款视频路径', el: 'input' },
  { prop: 'telRecordingPath', label: '电话录音路径', el: 'input' },
  { prop: 'loanDataPath', label: '贷款资料路径', el: 'input' },
]
// 获取table列表
const getTableList = (params: ILoanContact.Query) => {
  let newParams = formatParams(params);
  return getLoanContactListApi(newParams);
};
const formatParams = (params: ILoanContact.Query) =>{
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.contractStartDate && (newParams.contractStartDateStart = newParams.contractStartDate[0]);
  newParams.contractStartDate && (newParams.contractStartDateEnd = newParams.contractStartDate[1]);
  delete newParams.contractStartDate;
  newParams.contractEndDate && (newParams.contractEndDateStart = newParams.contractEndDate[0]);
  newParams.contractEndDate && (newParams.contractEndDateEnd = newParams.contractEndDate[1]);
  delete newParams.contractEndDate;
  newParams.signedDate && (newParams.signedDateStart = newParams.signedDate[0]);
  newParams.signedDate && (newParams.signedDateEnd = newParams.signedDate[1]);
  delete newParams.signedDate;
  newParams.terminationDate && (newParams.terminationDateStart = newParams.terminationDate[0]);
  newParams.terminationDate && (newParams.terminationDateEnd = newParams.terminationDate[1]);
  delete newParams.terminationDate;
  return newParams;
}
// 打开 drawer(新增、查看、编辑)
const loanContactRef = ref<InstanceType<typeof LoanContactForm>>()
const openAddEdit = async(title: string, row: any = {}, isAdd = true) => {
  if (!isAdd) {
    const record = await getLoanContactDetailApi({ id: row?.id })
    row = record?.data
  }
  const params = {
    title,
    row: { ...row },
    api: isAdd ? createLoanContactApi : updateLoanContactApi,
    getTableList: proTableRef.value?.getTableList
  }
  loanContactRef.value?.acceptParams(params)
}
// 删除信息
const deleteInfo = async (params: ILoanContact.Row) => {
  await useHandleData(
    removeLoanContactApi,
    { ids: [params.id] },
    `删除【${params.id}】`
  )
  proTableRef.value?.getTableList()
}
// 批量删除信息
const batchDelete = async (ids: (string | number)[]) => {
  await useHandleData(removeLoanContactApi, { ids }, '删除所选')
  proTableRef.value?.clearSelection()
  proTableRef.value?.getTableList()
}
// 导入
const ImportExcelRef = ref<InstanceType<typeof ImportExcel>>()
const importData = () => {
  const params = {
    title: '',
    templateName: '',
    tempApi: downloadTemplate,
    importApi: importLoanContactExcelApi,
    getTableList: proTableRef.value?.getTableList
  }
  ImportExcelRef.value?.acceptParams(params)
}
// 导出
const downloadFile = async () => {
  let newParams = formatParams(proTableRef.value?.searchParam as ILoanContact.Query);
  useDownload(exportLoanContactExcelApi, "", newParams);
};
</script>