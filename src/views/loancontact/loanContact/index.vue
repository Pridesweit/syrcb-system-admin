<template>
  <div class="table-box">
    <!-- <el-button type="primary" @click="openFolder('D:\\迅雷云盘')">主要按钮</el-button> -->
    <ProTable ref="proTableRef" title="" :indent="20" :columns="columns" :search-columns="searchColumns"
      :request-api="getTableList" :row-class-name="rowStyle" :cell-style="cellStyle" row-key="id">
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button type="primary" v-auth="'loan.contact.create'" :icon="CirclePlus" @click="openAddEdit('新增')">
          新增
        </el-button>
        <el-button v-auth="'loan.contact.remove'" type="danger" :icon="Delete" plain :disabled="!scope.isSelected"
          @click="batchDelete(scope.selectedListIds)">
          批量删除
        </el-button>
        <el-button v-auth="'loan.contact.import'" type="primary" :icon="Upload" plain @click="importData">
          导入
        </el-button>
        <el-button v-auth="'loan.contact.export'" type="primary" :icon="Download" plain @click="downloadFile">
          导出
        </el-button>
      </template>
      <template #operation="{ row }">
        <el-button v-auth="'loan.contact.update'" type="primary" link :icon="EditPen" @click="openEditPath('编辑', row)">
          编辑
        </el-button>
        <!-- <el-button v-auth="'loan.contact.remove'" type="primary" link :icon="Delete" @click="deleteInfo(row)">
          删除
        </el-button> -->

        <el-button v-auth="'loan.contact.remove'" type="primary" link :icon="Delete"
          @click="openMainFolder(row.signingInstitution)">
          跳转目录
        </el-button>

        <el-button v-auth="'loan.contact.remove'" :type="getButtonType(row.loanDataPath)" link :icon="Document"
          @click="openFolder(row.loanDataPath)">
          资料
        </el-button>
        <el-button v-auth="'loan.contact.remove'" :type="getButtonType(row.loanVideoPath)" link :icon="VideoCamera"
          @click="openFolder(row.loanVideoPath)">
          视频
        </el-button>
        <el-button v-auth="'loan.contact.remove'" :type="getButtonType(row.telRecordingPath)" link :icon="PhoneFilled"
          @click="openFolder(row.telRecordingPath)">
          录音
        </el-button>
      </template>
    </ProTable>
    <LoanContactForm ref="loanContactRef" />
    <PathForm ref="pathEditRef"></PathForm>
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
  VideoCamera,
  PhoneFilled,
  Document
   
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
import type { ColumnProps, ProTableInstance, SearchProps, SearchRenderScope } from '@/components/ProTable/interface';
import type { ILoanContact } from '@/api/interface/loancontact/loanContact';
import ImportExcel from '@/components/ImportExcel/index.vue';
import { downloadTemplate } from '@/api/modules/system/common';
import { ElMessageBox } from "element-plus";
import { useDownload } from "@/hooks/useDownload";
import type { VNode } from 'vue';
import type path from 'path';
import PathForm from './components/PathForm.vue';
defineOptions({
  name: 'LoanContactView'
})

//定义机构Map
const branchMap = new Map<string, string>();
// branchMap.set("20566", "E:/文件上传/LocalUser/ailian"); branchMap.set("20542", "E:/文件上传/LocalUser/baichun"); branchMap.set("20540", "E:/文件上传/LocalUser/banqiao"); branchMap.set("20507", "E:/文件上传/LocalUser/baodong"); branchMap.set("20554", "E:/文件上传/LocalUser/baozhong"); branchMap.set("20541", "E:/文件上传/LocalUser/caie"); branchMap.set("20536", "E:/文件上传/LocalUser/chayuantou"); branchMap.set("20565", "E:/文件上传/LocalUser/chenjiaqiao"); branchMap.set("20503", "E:/文件上传/LocalUser/chengdong"); branchMap.set("20517", "E:/文件上传/LocalUser/chengnan"); branchMap.set("20513", "E:/文件上传/LocalUser/chengxi"); branchMap.set("20549", "E:/文件上传/LocalUser/daxiang"); branchMap.set("20516", "E:/文件上传/LocalUser/daijia"); branchMap.set("20539", "E:/文件上传/LocalUser/dutouqiao"); branchMap.set("20529", "E:/文件上传/LocalUser/gaochongshan"); branchMap.set("20504", "E:/文件上传/LocalUser/gongyejie"); branchMap.set("20538", "E:/文件上传/LocalUser/gongyeyuan"); branchMap.set("20547", "E:/文件上传/LocalUser/guangchang"); branchMap.set("20527", "E:/文件上传/LocalUser/huochebeizhan"); branchMap.set("20525", "E:/文件上传/LocalUser/huochezhan"); branchMap.set("20544", "E:/文件上传/LocalUser/jiancaicheng"); branchMap.set("20551", "E:/文件上传/LocalUser/jianshelu"); branchMap.set("20509", "E:/文件上传/LocalUser/jinxing"); branchMap.set("20523", "D:/文件上传/LocalUser/luoshi"); branchMap.set("20519", "D:/文件上传/LocalUser/minzhoudonglu"); branchMap.set("20520", "D:/文件上传/LocalUser/nanzhan"); branchMap.set("20518", "D:/文件上传/LocalUser/qiliping"); branchMap.set("20558", "D:/文件上传/LocalUser/shaoshuidonglu"); branchMap.set("20548", "D:/文件上传/LocalUser/shehu"); branchMap.set("20515", "D:/文件上传/LocalUser/shentan"); branchMap.set("20511", "D:/文件上传/LocalUser/shiqiao"); branchMap.set("20526", "D:/文件上传/LocalUser/shuangqing"); branchMap.set("20557", "D:/文件上传/LocalUser/shuangyonglu"); branchMap.set("20524", "D:/文件上传/LocalUser/tanjiang"); branchMap.set("20567", "D:/文件上传/LocalUser/tianjiang"); branchMap.set("20563", "D:/文件上传/LocalUser/weiyuan"); branchMap.set("20552", "D:/文件上传/LocalUser/wuyilu"); branchMap.set("20560", "D:/文件上传/LocalUser/xiwaijie"); branchMap.set("20533", "D:/文件上传/LocalUser/xintanzhen"); branchMap.set("20562", "D:/文件上传/LocalUser/yanjiangqiao"); branchMap.set("20505", "D:/文件上传/LocalUser/yangxiqiao"); branchMap.set("20561", "D:/文件上传/LocalUser/yingchunlu"); branchMap.set("20500", "D:/文件上传/LocalUser/yingyebu"); branchMap.set("20521", "D:/文件上传/LocalUser/yuxi"); branchMap.set("20537", "D:/文件上传/LocalUser/yunshui"); branchMap.set("20555", "D:/文件上传/LocalUser/zhongxinlu"); branchMap.set("20531", "D:/文件上传/LocalUser/zhuangyuanzhou");
branchMap.set("20566", "E:\\文件上传\\LocalUser\\ailian"); branchMap.set("20542", "E:\\文件上传\\LocalUser\\baichun"); branchMap.set("20540", "E:\\文件上传\\LocalUser\\banqiao"); branchMap.set("20507", "E:\\文件上传\\LocalUser\\baodong"); branchMap.set("20554", "E:\\文件上传\\LocalUser\\baozhong"); branchMap.set("20541", "E:\\文件上传\\LocalUser\\caie"); branchMap.set("20536", "E:\\文件上传\\LocalUser\\chayuantou"); branchMap.set("20565", "E:\\文件上传\\LocalUser\\chenjiaqiao"); branchMap.set("20503", "E:\\文件上传\\LocalUser\\chengdong"); branchMap.set("20517", "E:\\文件上传\\LocalUser\\chengnan"); branchMap.set("20513", "E:\\文件上传\\LocalUser\\chengxi"); branchMap.set("20549", "E:\\文件上传\\LocalUser\\daxiang"); branchMap.set("20516", "E:\\文件上传\\LocalUser\\daijia"); branchMap.set("20539", "E:\\文件上传\\LocalUser\\dutouqiao"); branchMap.set("20529", "E:\\文件上传\\LocalUser\\gaochongshan"); branchMap.set("20504", "E:\\文件上传\\LocalUser\\gongyejie"); branchMap.set("20538", "E:\\文件上传\\LocalUser\\gongyeyuan"); branchMap.set("20547", "E:\\文件上传\\LocalUser\\guangchang"); branchMap.set("20527", "E:\\文件上传\\LocalUser\\huochebeizhan"); branchMap.set("20525", "E:\\文件上传\\LocalUser\\huochezhan"); branchMap.set("20544", "E:\\文件上传\\LocalUser\\jiancaicheng"); branchMap.set("20551", "E:\\文件上传\\LocalUser\\jianshelu"); branchMap.set("20509", "E:\\文件上传\\LocalUser\\jinxing"); branchMap.set("20523", "D:\\文件上传\\LocalUser\\luoshi"); branchMap.set("20519", "D:\\文件上传\\LocalUser\\minzhoudonglu"); branchMap.set("20520", "D:\\文件上传\\LocalUser\\nanzhan"); branchMap.set("20518", "D:\\文件上传\\LocalUser\\qiliping"); branchMap.set("20558", "D:\\文件上传\\LocalUser\\shaoshuidonglu"); branchMap.set("20548", "D:\\文件上传\\LocalUser\\shehu"); branchMap.set("20515", "D:\\文件上传\\LocalUser\\shentan"); branchMap.set("20511", "D:\\文件上传\\LocalUser\\shiqiao"); branchMap.set("20526", "D:\\文件上传\\LocalUser\\shuangqing"); branchMap.set("20557", "D:\\文件上传\\LocalUser\\shuangyonglu"); branchMap.set("20524", "D:\\文件上传\\LocalUser\\tanjiang"); branchMap.set("20567", "D:\\文件上传\\LocalUser\\tianjiang"); branchMap.set("20563", "D:\\文件上传\\LocalUser\\weiyuan"); branchMap.set("20552", "D:\\文件上传\\LocalUser\\wuyilu"); branchMap.set("20560", "D:\\文件上传\\LocalUser\\xiwaijie"); branchMap.set("20533", "D:\\文件上传\\LocalUser\\xintanzhen"); branchMap.set("20562", "D:\\文件上传\\LocalUser\\yanjiangqiao"); branchMap.set("20505", "D:\\文件上传\\LocalUser\\yangxiqiao"); branchMap.set("20561", "D:\\文件上传\\LocalUser\\yingchunlu"); branchMap.set("20500", "D:\\文件上传\\LocalUser\\yingyebu"); branchMap.set("20521", "D:\\文件上传\\LocalUser\\yuxi"); branchMap.set("20537", "D:\\文件上传\\LocalUser\\yunshui"); branchMap.set("20555", "D:\\文件上传\\LocalUser\\zhongxinlu"); branchMap.set("20531", "D:\\文件上传\\LocalUser\\zhuangyuanzhou");



// branchMap.set("20566", "E:\文件上传\LocalUser\ailian"); branchMap.set("20542", "E:\文件上传\LocalUser\baichun"); branchMap.set("20540", "E:\文件上传\LocalUser\banqiao"); branchMap.set("20507", "E:\文件上传\LocalUser\baodong"); branchMap.set("20554", "E:\文件上传\LocalUser\baozhong"); branchMap.set("20541", "E:\文件上传\LocalUser\caie"); branchMap.set("20536", "E:\文件上传\LocalUser\chayuantou"); branchMap.set("20565", "E:\文件上传\LocalUser\chenjiaqiao"); branchMap.set("20503", "E:\文件上传\LocalUser\chengdong"); branchMap.set("20517", "E:\文件上传\LocalUser\chengnan"); branchMap.set("20513", "E:\文件上传\LocalUser\chengxi"); branchMap.set("20549", "E:\文件上传\LocalUser\daxiang"); branchMap.set("20516", "E:\文件上传\LocalUser\daijia"); branchMap.set("20539", "E:\文件上传\LocalUser\dutouqiao"); branchMap.set("20529", "E:\文件上传\LocalUser\gaochongshan"); branchMap.set("20504", "E:\文件上传\LocalUser\gongyejie"); branchMap.set("20538", "E:\文件上传\LocalUser\gongyeyuan"); branchMap.set("20547", "E:\文件上传\LocalUser\guangchang"); branchMap.set("20527", "E:\文件上传\LocalUser\huochebeizhan"); branchMap.set("20525", "E:\文件上传\LocalUser\huochezhan"); branchMap.set("20544", "E:\文件上传\LocalUser\jiancaicheng"); branchMap.set("20551", "E:\文件上传\LocalUser\jianshelu"); branchMap.set("20509", "E:\文件上传\LocalUser\jinxing"); branchMap.set("20523", "D:\文件上传\LocalUser\luoshi"); branchMap.set("20519", "D:\文件上传\LocalUser\minzhoudonglu"); branchMap.set("20520", "D:\文件上传\LocalUser\nanzhan"); branchMap.set("20518", "D:\文件上传\LocalUser\qiliping"); branchMap.set("20558", "D:\文件上传\LocalUser\shaoshuidonglu"); branchMap.set("20548", "D:\文件上传\LocalUser\shehu"); branchMap.set("20515", "D:\文件上传\LocalUser\shentan"); branchMap.set("20511", "D:\文件上传\LocalUser\shiqiao"); branchMap.set("20526", "D:\文件上传\LocalUser\shuangqing"); branchMap.set("20557", "D:\文件上传\LocalUser\shuangyonglu"); branchMap.set("20524", "D:\文件上传\LocalUser\tanjiang"); branchMap.set("20567", "D:\文件上传\LocalUser\tianjiang"); branchMap.set("20563", "D:\文件上传\LocalUser\weiyuan"); branchMap.set("20552", "D:\文件上传\LocalUser\wuyilu"); branchMap.set("20560", "D:/文件上传/LocalUser/xiwaijie"); branchMap.set("20533", "D:/文件上传/LocalUser/xintanzhen"); branchMap.set("20562", "D:\文件上传\LocalUser\yanjiangqiao"); branchMap.set("20505", "D:\文件上传\LocalUser\yangxiqiao"); branchMap.set("20561", "D:\文件上传\LocalUser\yingchunlu"); branchMap.set("20500", "D:\文件上传\LocalUser\yingyebu"); branchMap.set("20521", "D:\文件上传\LocalUser\yuxi"); branchMap.set("20537", "D:\文件上传\LocalUser\yunshui"); branchMap.set("20555", "D:\文件上传\LocalUser\zhongxinlu"); branchMap.set("20531", "D:\文件上传\LocalUser\zhuangyuanzhou");
const branchCodeMap = new Map<string, string>();
branchCodeMap.set("20500", "营业部"); branchCodeMap.set("20503", "城东支行"); branchCodeMap.set("20504", "工业街分理处"); branchCodeMap.set("20505", "洋溪桥支行"); branchCodeMap.set("20507", "宝东支行"); branchCodeMap.set("20509", "金星分理处"); branchCodeMap.set("20511", "石桥分理处"); branchCodeMap.set("20513", "城西支行"); branchCodeMap.set("20515", "神滩支行"); branchCodeMap.set("20516", "戴家支行"); branchCodeMap.set("20517", "城南支行"); branchCodeMap.set("20518", "七里坪分理处"); branchCodeMap.set("20519", "敏洲东路支行"); branchCodeMap.set("20520", "南站支行"); branchCodeMap.set("20521", "雨溪支行"); branchCodeMap.set("20523", "罗市支行"); branchCodeMap.set("20524", "檀江支行"); branchCodeMap.set("20525", "火车站支行"); branchCodeMap.set("20526", "双清支行"); branchCodeMap.set("20527", "火车北站支行"); branchCodeMap.set("20529", "高崇山支行"); branchCodeMap.set("20531", "状元洲支行"); branchCodeMap.set("20533", "新滩镇支行"); branchCodeMap.set("20536", "茶元头支行"); branchCodeMap.set("20537", "云水支行"); branchCodeMap.set("20538", "工业园支行"); branchCodeMap.set("20539", "渡头桥支行"); branchCodeMap.set("20540", "板桥支行"); branchCodeMap.set("20541", "蔡锷支行"); branchCodeMap.set("20542", "百春支行"); branchCodeMap.set("20544", "建材城支行"); branchCodeMap.set("20547", "广场支行"); branchCodeMap.set("20548", "佘湖支行"); branchCodeMap.set("20549", "大祥支行"); branchCodeMap.set("20551", "建设路支行"); branchCodeMap.set("20552", "五一路支行"); branchCodeMap.set("20554", "宝中支行"); branchCodeMap.set("20555", "中心路支行"); branchCodeMap.set("20557", "双拥路支行"); branchCodeMap.set("20558", "邵水东路支行"); branchCodeMap.set("20560", "西外街支行"); branchCodeMap.set("20561", "迎春路支行"); branchCodeMap.set("20562", "沿江桥支行"); branchCodeMap.set("20563", "魏源支行"); branchCodeMap.set("20565", "陈家桥支行"); branchCodeMap.set("20566", "爱莲支行"); branchCodeMap.set("20567", "田江分理处");




const proTableRef = ref<ProTableInstance>();
// 表格配置项
const columns: ColumnProps<ILoanContact.Row>[] = [
  { type: 'selection', width: 50 },
  //   { prop: 'telRecordingPath', label: '是否电联', width: 100,render({ row }) {
  //     return row.telRecordingPath ? '是' : '否';
  // }},
  {
    prop: 'signingInstitution', label: '签约机构', width: 140, render({ row }) {
      if (row.signingInstitution != null) {
        if (branchCodeMap.has(row.signingInstitution)) {
          return branchCodeMap.get(row.signingInstitution) || "";
        }
        return row.signingInstitution.toString();
      }
      return ""
    }
  },
  // { prop: 'customerType', label: '客户类型', width: 100 },
  { prop: 'customerName', label: '客户名称', width: 90 },
  { prop: 'idNumber', label: '证件号码', width: 225 },
  { prop: 'phoneNumber', label: '电话号码', width: 152 },
  { prop: 'customerManager', label: '客户经理', width: 90 },
  // { prop: 'customerNumber', label: '客户号', width: 100 },
  { prop: 'businessType', label: '业务品种', width: 135 },
  { prop: 'contractId', label: '合同编号', width: 100 },
  { prop: 'contractAmount', label: '合同金额', width: 95 },
  { prop: 'usedQuota', label: '已使用额度', width: 102 },
  { prop: 'signedRate', label: '签约利率', width: 95 },
  // { prop: 'availableQuota', label: '可用额度', width: 100 },
  { prop: 'contractStartDate', label: '合同起始日', width: 125 },
  { prop: 'contractEndDate', label: '合同到期日', width: 125 },
  { prop: 'remarks', label: '备注', width: 142 },


  // { prop: 'guaranteeMethod', label: '担保方式', width: 100 },

  // { prop: 'creditBusinessId', label: '信贷业务编号', width: 100 },
  // { prop: 'contractStatus', label: '合同状态', width: 100 },
  { prop: 'operation', label: '操作', width: 200, fixed: 'right' }
]
// const branchList :SearchRenderScope = {
//     options:
// }
// 搜索条件项
const searchColumns: SearchProps[] = [
  {
    prop: 'signingInstitution', label: '签约机构', el: 'select', enum: [
      { label: "全部", value: "" },
      { label: "五一路支行", value: 20552 },
      { label: "宝中支行", value: 20554 },
      { label: "檀江支行", value: 20524 },
      { label: "火车站支行", value: 20525 },
      { label: "状元洲支行", value: 20531 },
      { label: "七里坪分理处", value: 20518 },
      { label: "神滩支行", value: 20515 },
      { label: "敏洲东路支行", value: 20519 },
      { label: "双清支行", value: 20526 },
      { label: "工业园支行", value: 20538 },
      { label: "建设路支行", value: 20551 },
      { label: "板桥支行", value: 20540 },
      { label: "戴家支行", value: 20516 },
      { label: "广场支行", value: 20547 },
      { label: "火车北站支行", value: 20527 },
      { label: "金星分理处", value: 20509 },
      { label: "百春支行", value: 20542 },
      { label: "邵水东路支行", value: 20558 },
      { label: "中心路支行", value: 20555 },
      { label: "迎春路支行", value: 20561 },
      { label: "西外街支行", value: 20560 },
      { label: "蔡锷支行", value: 20541 },
      { label: "营业部", value: 20500 },
      { label: "城南支行", value: 20517 },
      { label: "宝东支行", value: 20507 },
      { label: "新滩镇支行", value: 20533 },
      { label: "罗市支行", value: 20523 },
      { label: "陈家桥支行", value: 20565 },
      { label: "双拥路支行", value: 20557 },
      { label: "城东支行", value: 20503 },
      { label: "建材城支行", value: 20544 },
      { label: "城西支行", value: 20513 },
      { label: "雨溪支行", value: 20521 },
      { label: "沿江桥支行", value: 20562 },
      { label: "南站支行", value: 20520 },
      { label: "工业街分理处", value: 20504 },
      { label: "洋溪桥支行", value: 20505 },
      { label: "魏源支行", value: 20563 },
      { label: "佘湖支行", value: 20548 },
      { label: "大祥支行", value: 20549 },
      { label: "石桥分理处", value: 20511 },
      { label: "茶元头支行", value: 20536 },
      { label: "爱莲支行", value: 20566 },
      { label: "田江分理处", value: 20567 },
      { label: "高崇山支行", value: 20529 },
      { label: "渡头桥支行", value: 20539 },
      { label: "云水支行", value: 20537 }

    ],
  },
  // { prop: 'customerType', label: '客户类型', el: 'select' },
  // { prop: 'customerName', label: '客户名称', el: 'input' },
  // { prop: 'idNumber', label: '证件号码', el: 'input' },
  { prop: 'customerNumber', label: '数据日期', el: 'date-picker' },
  // { prop: 'signedDateStart', label: '数据日期', el: 'date-picker' },
  // { prop: 'businessType', label: '业务品种', el: 'select' },
  { prop: 'contractId', label: '合同编号', el: 'input' },
  {
    prop: 'telRecordingPath', label: '是否有录音', el: 'select', enum: [
      { label: "是", value: "是" },
      { label: "否", value: "否" }]
  },
  // { prop: 'contractType', label: '合同类型', el: 'select' },
  // { prop: 'contractAmount', label: '合同金额', el: 'input' },
  // { prop: 'usedQuota', label: '已使用额度', el: 'input' },
  // { prop: 'availableQuota', label: '可用额度', el: 'input' },
  { prop: 'customerManager', label: '客户经理', el: 'input' },
  // { prop: 'contractStatus', label: '合同状态', el: 'select' },
  // { prop: 'loanVideoPath', label: '贷款视频路径' },
  // { prop: 'telRecordingPath', label: '电话录音路径' },
  // { prop: 'loanDataPath', label: '贷款资料路径' },

]



// const optionsData: {
//         signingInstitution: [
//           { label: '机构A', value: 'A' },
//           { label: '机构B', value: 'B' },
//           { label: '机构C', value: 'C' },
//         ],
//         customerType: [
//           { label: '个人', value: 'individual' },
//           { label: '企业', value: 'company' },
//         ],
//         businessType: [
//           { label: '贷款', value: 'loan' },
//           { label: '存款', value: 'deposit' },
//         ],
//         contractStatus: [
//           { label: '已签约', value: 'signed' },
//           { label: '未签约', value: 'unsigned' },
//         ],
//       },



// 根据状态返回按钮类型
const getButtonType = (tableValue:string) => {
  switch (tableValue) {
    case '':
      return 'primary';
    case null:
      return 'primary';
    default:
      return 'danger';
  }
};

// 获取table列表
const getTableList = (params: ILoanContact.Query) => {
  let newParams = formatParams(params);
  console.log(newParams);
  if (newParams.signedDateStart === null) {
    let date = newParams.signedDateStart;
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
    let day = String(date.getDate()).padStart(2, '0');
    newParams.signedDateStart = `${year}-${month}-${day}`;
  }
  console.log(newParams)
  return getLoanContactListApi(newParams);
};
const formatParams = (params: ILoanContact.Query) => {
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
const openAddEdit = async (title: string, row: any = {}, isAdd = true) => {
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

  // window.open('file:///C:/Users/', '_blank');

}
const pathEditRef = ref<InstanceType<typeof PathForm>>()
const openEditPath = async (title: string, row: any = {}) => {

  const record = await getLoanContactDetailApi({ id: row?.id })
  row = record?.data

  const params = {
    title,
    row: { ...row },
    api: updateLoanContactApi,
    getTableList: proTableRef.value?.getTableList
  }
  pathEditRef.value?.acceptParams(params)
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

const openMainFolder = (branchCode: string) => {
  if (branchCode != null) {
    if (branchMap.has(branchCode)) {
      console.log(branchCode,"  ",branchMap.get(branchCode));
      openFolder(branchMap.get(branchCode) || "C:/");
    }
  }

}

const openFolder = (filePath: string) => {
  const event = new CustomEvent('openExplorer', {
    detail: { path: filePath }
  });
  window.dispatchEvent(event);

};

// 单元格样式
const cellStyle = ({ row, column, rowIndex, columnIndex }: any) => {
  // 根据条件判断是否加粗
  // if (rowIndex === 0 && columnIndex === 0) {
  return { fontWeight: 'bold', fontSize: '17px' };
  // }
  // return {};
};

// 行样式
const rowStyle = ({ row, rowIndex }: any) => {
  // 根据行索引设置不同的背景颜色
  if (rowIndex % 2 === 0) {
    return { backgroundColor: '#b8cce4' };
  } else {
    return { backgroundColor: '#dce6f1' };
  }
};
//   // 跨平台路径格式化
// const normalizePath = (path: string | path.PlatformPath) => {
//   if (navigator.userAgent.includes('Win')) {
//     return path.replace(/\//g, '\\');
//   }
//   return path;
// };
</script>
<style>
/* 偶数行背景色 */
.el-table .odd-row {
  background-color: #b8cce4 !important;
}

/* 奇数行背景色 */
.el-table .even-row {
  background-color: #dce6f1 !important;
}

.el-table__body tr:hover > td {
  background-color: rgba(184, 204, 228, 0.7)!important;
}
</style>