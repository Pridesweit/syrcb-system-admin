<template>
    <el-dialog
      v-model="visible"
      :title="`${paramsProps.title}`"
      :destroy-on-close="true"
      width="580px"
      draggable
    >
      <el-form
        label-width="140px"
        label-suffix=" :"
        :model="paramsProps.row"
        @submit.enter.prevent="handleSubmit"
      >
        <el-form-item label="贷款视频路径" prop="loanVideoPath">

          <el-input
            v-model="paramsProps.row.loanVideoPath"
            placeholder="请填写贷款视频路径"
            clearable
          >


      </el-input>

        </el-form-item>
      
        <el-form-item label="电话录音路径" prop="telRecordingPath">

          <el-input
            v-model="paramsProps.row.telRecordingPath"
            placeholder="请填写电话录音路径"
            clearable
          >
      </el-input>

   
        </el-form-item>
        
        <el-form-item label="贷款资料路径" prop="loanDataPath">
        
          <el-input
            v-model="paramsProps.row.loanDataPath"
            placeholder="请填写贷款资料路径"
            clearable
          >
      </el-input>

     

        </el-form-item>
        <el-form-item label="备注信息" prop="remarks">
        <el-input
            v-model="paramsProps.row.remarks"
            placeholder="请填写备注信息"
            clearable
          >
      </el-input>
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
      name: 'PathForm',
  })
  
  const optionsStore = useOptionsStore()
  
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
    console.log(params)
  }
  
  // 提交数据（新增/编辑）
  const handleSubmit = () => {
    console.log("asa")

      try {
        paramsProps.value.api!(paramsProps.value.row)
        ElMessage.success({ message: `${paramsProps.value.title}成功！` })
        paramsProps.value.getTableList!()
        visible.value = false
      } catch (error) {
        console.log(error)
      }
    
  }
  
  
  
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