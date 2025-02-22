<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="dark" />
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left3.jpg" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo1.png" alt="" />
          <h2 class="logo-text">邵阳农商银行</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>
4
<script setup lang="ts">
import SwitchDark from '@/components/SwitchDark/index.vue';
import LoginForm from '@/views/login/components/LoginForm.vue';
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
