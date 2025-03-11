<template>
  <div class="table-box">
    <ProTable
      ref="proTableRef"
      title="客户信息"
      :indent="20"
      :columns="columns"
      :search-columns="searchColumns"
      :request-api="getTableList"
      row-key="id"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button type="primary"
          v-auth="'customer.info.create'"
          :icon="CirclePlus"
          @click="openAddEdit('新增客户信息')"
        >
          新增
        </el-button>
        <el-button
          v-auth="'customer.info.remove'"
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
          @click="batchDelete(scope.selectedListIds)"
        >
          批量删除
        </el-button>
        <el-button
          v-auth="'customer.info.import'"
          type="primary"
          :icon="Upload"
          plain
          @click="importData"
        >
          导入
        </el-button>
        <el-button
          v-auth="'customer.info.export'"
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
          v-auth="'customer.info.update'"
          type="primary"
          link
          :icon="EditPen"
          @click="openAddEdit('编辑客户信息', row, false)"
        >
          编辑
        </el-button>
        <el-button
            v-auth="'customer.info.remove'"
          type="primary"
          link
          :icon="Delete"
          @click="deleteInfo(row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <CustomerInfoForm ref="customerInfoRef" />
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
  createCustomerInfoApi,
  removeCustomerInfoApi,
  updateCustomerInfoApi,
  getCustomerInfoListApi,
  getCustomerInfoDetailApi,
  importCustomerInfoExcelApi,
  exportCustomerInfoExcelApi,
} from '@/api/modules/newLoanManage/customerInfo';
import { useHandleData } from '@/hooks/useHandleData';
import CustomerInfoForm from '@/views/newLoanManage/customerInfo/components/CustomerInfoForm.vue';
import type { ColumnProps, ProTableInstance, SearchProps } from '@/components/ProTable/interface';
import type { ICustomerInfo } from '@/api/interface/newLoanManage/customerInfo';
import ImportExcel from '@/components/ImportExcel/index.vue';
import { downloadTemplate } from '@/api/modules/system/common';
import { ElMessageBox } from "element-plus";
import { useDownload } from "@/hooks/useDownload";
defineOptions({
  name: 'CustomerInfoView'
})
const proTableRef = ref<ProTableInstance>();
// 表格配置项
const columns: ColumnProps<ICustomerInfo.Row>[] = [
  { type: 'selection', width: 80 },
  { prop: 'organizationName', label: '' },
  { prop: 'accountName', label: '' },
  { prop: 'idNumber', label: '' },
  { prop: 'address', label: '' },
  { prop: 'phoneNumber', label: '' },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]
// 搜索条件项
const searchColumns: SearchProps[] = [
  { prop: 'organizationName', label: '', el: 'input' },
  { prop: 'accountName', label: '', el: 'input' },
  { prop: 'idNumber', label: '', el: 'input' },
  { prop: 'address', label: '', el: 'input' },
  { prop: 'phoneNumber', label: '', el: 'input' },
]
// 获取table列表
const getTableList = (params: ICustomerInfo.Query) => {
  let newParams = formatParams(params);
  return getCustomerInfoListApi(newParams);
};
const formatParams = (params: ICustomerInfo.Query) =>{
  let newParams = JSON.parse(JSON.stringify(params));
  return newParams;
}
// 打开 drawer(新增、查看、编辑)
const customerInfoRef = ref<InstanceType<typeof CustomerInfoForm>>()
const openAddEdit = async(title: string, row: any = {}, isAdd = true) => {
  if (!isAdd) {
    const record = await getCustomerInfoDetailApi({ id: row?.id })
    row = record?.data
  }
  const params = {
    title,
    row: { ...row },
    api: isAdd ? createCustomerInfoApi : updateCustomerInfoApi,
    getTableList: proTableRef.value?.getTableList
  }
  customerInfoRef.value?.acceptParams(params)
}
// 删除信息
const deleteInfo = async (params: ICustomerInfo.Row) => {
  await useHandleData(
    removeCustomerInfoApi,
    { ids: [params.id] },
    `删除【${params.id}】客户信息`
  )
  proTableRef.value?.getTableList()
}
// 批量删除信息
const batchDelete = async (ids: (string | number)[]) => {
  await useHandleData(removeCustomerInfoApi, { ids }, '删除所选客户信息')
  proTableRef.value?.clearSelection()
  proTableRef.value?.getTableList()
}
// 导入
const ImportExcelRef = ref<InstanceType<typeof ImportExcel>>()
const importData = () => {
  const params = {
    title: '客户信息',
    templateName: '客户信息',
    tempApi: downloadTemplate,
    importApi: importCustomerInfoExcelApi,
    getTableList: proTableRef.value?.getTableList
  }
  ImportExcelRef.value?.acceptParams(params)
}
// 导出
const downloadFile = async () => {
  let newParams = formatParams(proTableRef.value?.searchParam as ICustomerInfo.Query);
  useDownload(exportCustomerInfoExcelApi, "客户信息", newParams);
};
</script>