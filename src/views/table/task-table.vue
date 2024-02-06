<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="任务名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="类型" clearable class="filter-item" style="width: 130px" @change="handleFilter">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        提交任务
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="编号" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <!--          <el-tag>{{ row.type | typeFilter }}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column label="提交用户" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据集" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dataset }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="120px">
        <template slot-scope="{row}">
          <el-tag v-if="row.type=='train'" type="success">{{ row.type | typeFilter }}</el-tag>
          <el-tag v-if="row.type=='inference'" type="danger">{{ row.type | typeFilter }}</el-tag>
          <el-tag v-if="row.type=='modality'" type="info">{{ row.type | typeFilter }}</el-tag>
          <el-tag v-if="row.type=='scale'">{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="提交日期" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            <span v-if="row.status=='published'">完成</span>
            <span v-if="row.status==''">进行中</span>
            <span v-if="row.status=='deleted'">失败</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status==''" size="mini" type="warning" @click="handleDelete(row,$index)">
            停止
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="任务名称" prop="title">
          <el-input v-model="temp.title" :disabled="dialogStatus=='update'" />
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'" label="任务类型" prop="type">
          <el-radio-group v-model="temp.type" size="mini" style="width: 150%">
            <el-radio-button v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" />
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="dialogStatus!='create'" label="任务类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" disabled placeholder="请选择任务类型">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="提交用户" prop="author">
          <el-input v-model="temp.author" :disabled="dialogStatus=='update'" />
        </el-form-item>
        <el-form-item label="数据集名称" prop="title">
          <el-input v-model="temp.dataset" :disabled="dialogStatus=='update'" />
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'||temp.num" label="节点个数" prop="author">
          <el-input-number v-model="temp.num" :disabled="dialogStatus!='create'" :min="1" :max="10" />
        </el-form-item>
        <el-form-item v-if="temp.type=='多尺度提取'||temp.type=='scale'" label="尺度个数" prop="author">
          <el-input-number v-model="temp.nums" :disabled="dialogStatus!='create'" :min="1" :max="30" />
        </el-form-item>
        <el-form-item v-if="temp.type=='train'||temp.type=='inference'" label="模型名称" prop="title">
          <el-input v-model="temp.model" :disabled="dialogStatus=='update'" />
        </el-form-item>
        <el-form-item v-if="temp.type=='模型训练'||temp.type=='模型推理'" label="模型名称" prop="title">
          <el-input v-model="temp.model" :disabled="dialogStatus=='update'" />
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'||temp.args" label=" 参数" prop="args">
          <el-input
            v-model="temp.args"
            type="textarea"
            :rows="2"
            :disabled="dialogStatus!='create'"
            placeholder="请输入参数,格式为json"
          />
        </el-form-item>
        <!--        <el-form-item label="Date" prop="timestamp">-->
        <!--          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="Title" prop="title">-->
        <!--          <el-input v-model="temp.title" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="Status">-->
        <!--          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">-->
        <!--            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="Imp">-->
        <!--          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="Remark">-->
        <!--          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          关闭
        </el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchTaskList, fetchTaskPv, createTask, updateTask } from '@/api/task'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
// secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'train', display_name: '模型训练' },
  { key: 'inference', display_name: '模型推理' },
  { key: 'scale', display_name: '多尺度提取' },
  { key: 'modality', display_name: '多模态提取' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'TaskTable',
  components: {},
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      num: 1,
      nums: 22,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: '编号升序', key: '+id' }, { label: '编号降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '任务信息',
        create: '提交任务'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }],
        author: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchTaskList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createTask(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateTask(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchTaskPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
