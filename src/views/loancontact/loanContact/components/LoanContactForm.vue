<template>
  <el-dialog
    v-model="visible"
    :title="`${paramsProps.title}`"
    :destroy-on-close="true"
    width="580px"
    draggable
  >
    <el-form
      ref="ruleFormRef"
      label-width="140px"
      label-suffix=" :"
      :rules="rules"
      :model="paramsProps.row"
      @submit.enter.prevent="handleSubmit"
    >
      <el-form-item label="签约机构" prop="signingInstitution">
        <el-input
          v-model="paramsProps.row.signingInstitution"
          placeholder="请填写签约机构"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="customerType">
        <el-select v-model="paramsProps.row.customerType" clearable placeholder="请选择客户类型">
          <el-option
            v-for="item in optionsStore.getDictOptions('')"
            :key="item.id"
            :label="item.codeName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="paramsProps.row.customerName"
          placeholder="请填写客户名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="idNumber">
        <el-input
          v-model="paramsProps.row.idNumber"
          placeholder="请填写证件号码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="客户号" prop="customerNumber">
        <el-input
          v-model="paramsProps.row.customerNumber"
          placeholder="请填写客户号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="业务品种" prop="businessType">
        <el-select v-model="paramsProps.row.businessType" clearable placeholder="请选择业务品种">
          <el-option
            v-for="item in optionsStore.getDictOptions('')"
            :key="item.id"
            :label="item.codeName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="合同编号" prop="contractId">
        <el-input
          v-model="paramsProps.row.contractId"
          placeholder="请填写合同编号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="合同类型" prop="contractType">
        <el-select v-model="paramsProps.row.contractType" clearable placeholder="请选择合同类型">
          <el-option
            v-for="item in optionsStore.getDictOptions('')"
            :key="item.id"
            :label="item.codeName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="合同金额" prop="contractAmount">
        <el-input-number
          v-model="paramsProps.row.contractAmount" :precision="0" :min="1" :max="999999" />
      </el-form-item>
      <el-form-item label="已使用额度" prop="usedQuota">
        <el-input-number
          v-model="paramsProps.row.usedQuota" :precision="0" :min="1" :max="999999" />
      </el-form-item>
      <el-form-item label="可用额度" prop="availableQuota">
        <el-input-number
          v-model="paramsProps.row.availableQuota" :precision="0" :min="1" :max="999999" />
      </el-form-item>
      <el-form-item label="合同起始日" prop="contractStartDate">
        <el-date-picker clearable
          v-model="paramsProps.row.contractStartDate"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择合同起始日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同到期日" prop="contractEndDate">
        <el-date-picker clearable
          v-model="paramsProps.row.contractEndDate"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择合同到期日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="签约日期" prop="signedDate">
        <el-date-picker clearable
          v-model="paramsProps.row.signedDate"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择签约日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="终止日期" prop="terminationDate">
        <el-date-picker clearable
          v-model="paramsProps.row.terminationDate"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择终止日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="还款周期" prop="repaymentCycle">
        <el-input
          v-model="paramsProps.row.repaymentCycle"
          placeholder="请填写还款周期"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="还款方式" prop="repaymentMethod">
        <el-input
          v-model="paramsProps.row.repaymentMethod"
          placeholder="请填写还款方式"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="签约利率" prop="signedRate">
        <el-input-number
          v-model="paramsProps.row.signedRate" :precision="0" :min="1" :max="999999" />
      </el-form-item>
      <el-form-item label="担保方式" prop="guaranteeMethod">
        <el-input
          v-model="paramsProps.row.guaranteeMethod"
          placeholder="请填写担保方式"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="抵押/质押/保证合同编号" prop="guaranteeContractId">
        <el-input
          v-model="paramsProps.row.guaranteeContractId"
          placeholder="请填写抵押/质押/保证合同编号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="他项权证号码" prop="encumbranceCertificateNumber">
        <el-input
          v-model="paramsProps.row.encumbranceCertificateNumber"
          placeholder="请填写他项权证号码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="借款原因" prop="loanPurpose">
        <el-input
          v-model="paramsProps.row.loanPurpose"
          placeholder="请填写借款原因"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="客户经理" prop="customerManager">
        <el-input
          v-model="paramsProps.row.customerManager"
          placeholder="请填写客户经理"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="信贷业务编号" prop="creditBusinessId">
        <el-input
          v-model="paramsProps.row.creditBusinessId"
          placeholder="请填写信贷业务编号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="合同状态" prop="contractStatus">
        <el-select v-model="paramsProps.row.contractStatus" clearable placeholder="请选择合同状态">
          <el-option
            v-for="item in optionsStore.getDictOptions('')"
            :key="item.id"
            :label="item.codeName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="贷款视频路径" prop="loanVideoPath">
        <template #default="{ row }">
        <el-input
          v-model="paramsProps.row.loanVideoPath"
          placeholder="请填写贷款视频路径"
          clearable
        >
        <template #append>
        <el-button icon="el-icon-folder-opened" @click="openFolderDialog(paramsProps.row,1)"></el-button>
      </template>
    </el-input>
  </template>
      </el-form-item>
    
      <el-form-item label="电话录音路径" prop="telRecordingPath">
        <template #default="{ row }">
        <el-input
          v-model="paramsProps.row.telRecordingPath"
          placeholder="请填写电话录音路径"
          clearable
        ><template #append>
        <el-button icon="el-icon-folder-opened"  @click="openFolderDialog(paramsProps.row,2)"></el-button>
      </template>
    </el-input>
    </template>
 
      </el-form-item>
      
      <el-form-item label="贷款资料路径" prop="loanDataPath">
        <template #default="{ row }">
        <el-input
          v-model="paramsProps.row.loanDataPath"
          placeholder="请填写贷款资料路径"
          clearable
        ><template #append>
        <el-button icon="el-icon-folder-opened"  @click="openFolderDialog(paramsProps.row,3)"></el-button>
      </template>
    </el-input>
  </template>
      </el-form-item>

    </el-form>
    <template #footer>
      <el-button @click="visible = false"> 取消</el-button>
      <el-button type="primary" @click="handleSubmit"> 确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { type ElForm, ElMessage ,ElUpload} from 'element-plus'
import { useOptionsStore } from '@/stores/modules/options'

defineOptions({
    name: 'LoanContactForm'
})

const optionsStore = useOptionsStore()
const rules = reactive({
  signingInstitution: [{ required: true, message: '请填写签约机构' }],
  customerType: [{ required: true, message: '请填写客户类型' }],
  customerName: [{ required: true, message: '请填写客户名称' }],
  contractId: [{ required: true, message: '请填写合同编号' }],
  // signedDate: [{ required: true, message: '请填写签约日期' }],
})

const visible = ref(false)
const paramsProps = ref<View.DefaultParams>({
  title: '',
  row: {},
  api: undefined,
  getTableList: undefined
})

// 接收父组件传过来的参数
const acceptParams = (params: View.DefaultParams) => {
  paramsProps.value = params
  visible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      await paramsProps.value.api!(paramsProps.value.row)
      ElMessage.success({ message: `${paramsProps.value.title}成功！` })
      paramsProps.value.getTableList!()
      visible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

// 定义三个输入框的值
    const path1 = ref('');
    const path2 = ref('');
    const path3 = ref('');

 // 打开文件夹选择对话框
 const openFolderDialog = (nowPath: any,index:number) => {
      // 创建一个 input 元素
      const input = document.createElement('input');
      input.type = 'file';
      input.webkitdirectory = true; // 允许选择文件夹
      input.multiple = false; // 只允许选择一个文件夹

      // 监听文件选择事件
      input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const folderPath = target.files[0].webkitRelativePath.split('/')[0]; // 获取文件夹路径
          // 根据 index 设置对应的输入框值
          console.log(folderPath);
          // nowPath = String(folderPath);
          if (index === 1) {
           nowPath.loanVideoPath = String(folderPath);
          } else if (index === 2) {
            nowPath.telRecordingPath= String(folderPath);
          } else if (index === 3) {
            nowPath.loanDataPath= String(folderPath);
          }
          input.value = ''; // 清空 input 的值，避免上传
        }
      };

      // 触发文件选择对话框
      input.click();
    };

    // return {
    //   path1,
    //   path2,
    //   path3,
    //   openFolderDialog,
    // };


defineExpose({
  acceptParams
})
</script>

<style scoped lang="scss"></style>