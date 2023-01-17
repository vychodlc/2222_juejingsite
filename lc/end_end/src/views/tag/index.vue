<template>
  <div class="app-container"
      v-loading="listLoading">
    <el-button @click='showAddDialog' icon="el-icon-add" type="primary" size="mini" style="margin-bottom: 10px">新增标签</el-button>
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
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Show">
        <template slot-scope="scope">
          {{ scope.row.isShow }}
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
    <el-dialog title="修改标签" :visible.sync="showDialogEdit">
      <el-form :model="editForm" size="mini">
        <el-form-item label="标签ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input v-model="editForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="标签显示">
          <el-input v-model="editForm.isShow" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="goEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增标签" :visible.sync="showDialogAdd">
      <el-form :model="addForm">
        <el-form-item label="标签名称">
          <el-input v-model="addForm.name" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="goAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除标签" :visible.sync="showDialogDelete">
      <span>你确认要删除这个标签吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="goDelete">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import {getTagList, addTag, delTag, editTag} from '@/network/tag.js'
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
        name: '',
      },
      editForm: {
        id: '',
        name: '',
        isShow: '',
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
      getTagList(1).then(res=>{
        console.log(res);
        this.list = res.data.data;
        this.listLoading = false;
      })
    },
    showEditDialog(row) {
      this.editForm = {
        id: row.id,
        name: row.name,
        isShow: row.isShow,
      }
      this.showDialogEdit = true;
    },
    goEdit() {
      editTag(this.editForm).then(res=>{
        if(res.data.code==200) {
          this.showDialogEdit = false;
          this.listLoading = true;
          this.fetchData();
          this.$message({
            message: '编辑标签成功',
            type: 'success'
          });
        } else {
          this.$message.error('编辑标签失败');
        }
        console.log(res);
      })
    },
    showDeleteDialog(tagId) {
      this.deletedTagId = tagId;
      this.showDialogDelete = true;
    },
    goDelete() {
      delTag(this.deletedTagId).then(res=>{
        if(res.data.code==200) {
          this.showDialogDelete = false;
          this.listLoading = true;
          this.fetchData();
          this.$message({
            message: '删除标签成功',
            type: 'success'
          });
        } else {
          this.$message.error('删除标签失败');
        }
        console.log(res);
      })
    },
    showAddDialog() {
      this.addForm = {
        name: '',
      }
      this.showDialogAdd = true;
    },
    goAdd() {
      addTag(this.addForm).then(res=>{
        if(res.data.code==200) {
          this.showDialogAdd = false;
          this.listLoading = true;
          this.fetchData();
          this.$message({
            message: '新增标签成功',
            type: 'success'
          });
        } else {
          this.$message.error('新增标签失败');
        }
        console.log(res);
      })
    },
  }
}
</script>
