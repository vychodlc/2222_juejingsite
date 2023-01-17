<template>
  <div class="app-container"
      v-loading="listLoading">
    <el-button @click='showAddDialog' icon="el-icon-add" type="primary" size="mini" style="margin-bottom: 10px">新增用户</el-button>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Information">
        <template slot-scope="scope">
          {{ scope.row.information }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click='showEditDialog(scope.row)' icon="el-icon-edit" type="primary" size="mini">编辑</el-button>
          <el-button @click='showDeleteDialog(scope.row.id)' icon="el-icon-delete" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
    </el-table>
    <el-dialog title="修改用户" :visible.sync="showDialogEdit">
      <el-form :model="editForm" size="mini">
        <el-form-item label="用户ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="editForm.username" ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="editForm.email" ></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="editForm.password" ></el-input>
        </el-form-item>
        <el-form-item label="用户介绍">
          <el-input v-model="editForm.information" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="goEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增用户" :visible.sync="showDialogAdd">
      <el-form :model="addForm">
        <el-form-item label="用户名称">
          <el-input v-model="addForm.username" ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="addForm.email" ></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="addForm.password" ></el-input>
        </el-form-item>
        <el-form-item label="用户介绍">
          <el-input v-model="addForm.information" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="goAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除用户" :visible.sync="showDialogDelete">
      <span>你确认要删除这个用户吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="goDelete">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import {getUserList, addUser, delUser, editUser} from '@/network/user.js'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      addForm: {
        username: '',
        email: '',
        password: '',
        information: '',
      },
      editForm: {
        id: '',
        username: '',
        email: '',
        password: '',
        information: '',
      },
      showDialogAdd: false,
      showDialogEdit: false,
      showDialogDelete: false,
    }
  },
  mounted() {
    this.listLoading = true;
    this.fetchData();
  },
  methods: {
    fetchData() {
      getUserList(1).then(res=>{
        console.log(res);
        this.list = res.data.data;
        this.listLoading = false;
      })
    },
    showEditDialog(row) {
      this.editForm = {
        id: row.id,
        username: row.username,
        email: row.email,
        password: row.password,
        information: row.information,
      }
      this.showDialogEdit = true;
    },
    goEdit() {
      editUser(this.editForm).then(res=>{
        if(res.data.code==200) {
          this.showDialogEdit = false;
          this.listLoading = true;
          this.fetchData();
          this.$message({
            message: '编辑用户成功',
            type: 'success'
          });
        } else {
          this.$message.error('编辑用户失败');
        }
        console.log(res);
      })
    },
    showDeleteDialog(userId) {
      this.deletedUserId = userId;
      this.showDialogDelete = true;
    },
    goDelete() {
      delUser(this.deletedUserId).then(res=>{
        if(res.data.code==200) {
          this.showDialogDelete = false;
          this.listLoading = true;
          this.fetchData();
          this.$message({
            message: '删除用户成功',
            type: 'success'
          });
        } else {
          this.$message.error('删除用户失败');
        }
        console.log(res);
      })
    },
    showAddDialog() {
      this.addForm = {
        username: '',
        email: '',
        password: '',
        information: '',
      }
      this.showDialogAdd = true;
    },
    goAdd() {
      addUser(this.addForm).then(res=>{
        if(res.data.code==200) {
          this.showDialogAdd = false;
          this.listLoading = true;
          this.fetchData();
          this.$message({
            message: '新增用户成功',
            type: 'success'
          });
        } else {
          this.$message.error('新增用户失败');
        }
        console.log(res);
      })
    },
  }
}
</script>
