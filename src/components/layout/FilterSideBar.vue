<template>
    <aside class="sidebar">
      <el-card shadow="never" class="sidebar-card">
        <el-input placeholder="Search" />
  
        <div class="section">
          <h3>CATEGORIES</h3>
          <el-checkbox-group>
            <div class="checkbox-list">
              <el-checkbox label="Electronics" />
              <el-checkbox label="Fashion" />
              <el-checkbox label="Home" />
              <el-checkbox label="Sports" />
              <el-checkbox label="Accessories" />
            </div>
          </el-checkbox-group>
        </div>
  
        <div class="section">
          <h3>PRICE RANGE</h3>
          <el-slider range />
          <div class="price-box">
            <span>$0</span>
            <span>-</span>
            <span>$2000</span>
          </div>
        </div>
      </el-card>
    </aside>
  </template>
  
  <style scoped>
  .sidebar-card {
    background: #1c2f57;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
  }
  
  .section {
    margin-top: 24px;
  }
  
  h3 {
    color: white;
    font-size: 14px;
    margin-bottom: 16px;
  }
  
  .checkbox-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .price-box {
    margin-top: 16px;
    background: #071a44;
    color: white;
    padding: 12px 16px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
  }
  </style>