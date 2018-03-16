<template>
    <div class="module-edu-content permission-outlinemodule">
        <div class="outlineeat">
            课程大纲：{{title}}<!--<span class="eaticon"></span>-->
        </div>
        <div class="outlinebox">
            <div class="chapterbox">
                <template v-if="coursesylllevel == 3">
                    <draggable v-model="tabledata" :options="{group:'firstItem'}" element="div"
                               @end="dragEnd(tabledata)" :move="checkMove">
                        <div v-for="(firstItem,index) in tabledata" :key="firstItem.id">
                            <div class="chaptit">
                                <span class="chlft">{{firstItem.name}}</span>
                                <span class="chrgt" @click="editproject(firstItem.id,firstItem.name)">修改</span>
                                <span class="chrgt" @click="openDelOutlineDialog(firstItem.id)">删除</span>
                                <span class="chrgt1" @click="openChildDialog(firstItem.id)">增加子目录</span>
                            </div>

                            <draggable v-model="firstItem.children" :options="{group:'secItem'}" element="div">
                                <div v-for="(secItem,index1) in firstItem.children" :key="secItem.id">
                                    <div class="chaptit chapsecd">
                                        <span class="chlft">{{secItem.name}}</span>
                                        <span class="chrgt" @click="editproject(secItem.id,secItem.name)">修改</span>
                                        <span class="chrgt" @click="openDelOutlineDialog(secItem.id)">删除</span>
                                        <span class="chrgt1 yellow" @click="openAddResDialog(secItem.id)">新增资源</span>
                                    </div>

                                    <draggable v-model="secItem.children" :options="{group:'thirdItem'}" element="div">
                                        <div class="resourcebox" v-for="(thirdItem,index3) in secItem.children"
                                             :key="thirdItem.id">
                                            <div class="knowledge">
                                                <span class="chlft">
                                                    {{thirdItem.name}}<span class="chline">|</span>资源ID：{{thirdItem.resource && thirdItem.resource.id}} 【{{thirdItem.resource && thirdItem.resource.discriminator | Resource2chn}}】，{{thirdItem.resource && thirdItem.resource.title}} </span>
                                                <span class="chrgt"
                                                      @click="openeEditResource(thirdItem)">修改</span>
                                                <span class="chrgt" @click="openDelResDialog(thirdItem.id)">删除</span>
                                            </div>
                                        </div>
                                    </draggable>


                                </div>

                            </draggable>
                        </div>
                    </draggable>
                </template>

                <template v-if="coursesylllevel == 4">
                    <draggable v-model="tabledata" :options="{group:'firstItem'}" element="div">
                        <div v-for="(firstItem,index) in tabledata" :key="firstItem.id">
                            <div class="chaptit">
                                <span class="chlft">{{firstItem.name}}</span>
                                <span class="chrgt" @click="editproject(firstItem.id,firstItem.name)">修改</span>
                                <span class="chrgt" @click="openDelOutlineDialog(firstItem.id)">删除</span>
                                <span class="chrgt1" @click="openChildDialog(firstItem.id)">增加子目录</span>
                            </div>

                            <draggable v-model="firstItem.children" :options="{group:'secItem'}" element="div">
                                <div v-for="(secItem,index) in firstItem.children" :key="secItem.id">
                                    <div class="chaptit chapsecd">
                                        <span class="chlft">{{secItem.name}}</span>
                                        <span class="chrgt" @click="editproject(secItem.id,secItem.name)">修改</span>
                                        <span class="chrgt" @click="openDelOutlineDialog(secItem.id)">删除</span>
                                        <span class="chrgt1" @click="openChildDialog(secItem.id)">增加子目录</span>
                                    </div>

                                    <draggable v-model="secItem.children" :options="{group:'thirdItem'}" element="div">
                                        <div v-for="(thirdItem,index2) in secItem.children" :key="thirdItem.id">
                                            <div class="knowledge">
                                                <span class="chlft"><i></i><span>{{thirdItem.name}}</span></span>
                                                <span class="chrgt"
                                                      @click="editproject(thirdItem.id,thirdItem.name)">修改</span>
                                                <span class="chrgt"
                                                      @click="openDelOutlineDialog(thirdItem.id)">删除</span>
                                                <span class="chrgt1 yellow"
                                                      @click="openAddResDialog(thirdItem.id)">新增资源</span>
                                            </div>
                                            <draggable v-model="thirdItem.children" :options="{group:'fourthItem'}"
                                                       element="div">
                                                <div class="resourcebox"
                                                     v-for="(fourthItem,index3) in thirdItem.children"
                                                     :key="fourthItem.id">
                                                    <div class="knowledge">
                                                        <span class="chlft">
                                                            {{fourthItem.name}}<span class="chline">|</span>资源ID：{{fourthItem.resource && fourthItem.resource.id}} 【{{fourthItem.resource && fourthItem.resource.discriminator | Resource2chn}}】 {{fourthItem.resource && fourthItem.resource.title}} </span>
                                                        <span class="chrgt"
                                                              @click="openeEditResource(fourthItem)">修改</span>
                                                        <span class="chrgt"
                                                              @click="openDelResDialog(fourthItem.id)">删除</span>
                                                    </div>
                                                </div>
                                            </draggable>
                                        </div>
                                    </draggable>
                                </div>

                            </draggable>
                        </div>
                    </draggable>
                </template>

                <template v-if="coursesylllevel == 2">
                    <draggable v-model="tabledata" :options="{group:'firstItem'}" element="div">
                        <div v-for="(firstItem,index) in tabledata" :key="firstItem.id">
                            <div class="chaptit">
                                <span class="chlft">{{firstItem.name}}</span>
                                <span class="chrgt" @click="editproject(firstItem.id,firstItem.name)">修改</span>
                                <span class="chrgt" @click="openDelOutlineDialog(firstItem.id)">删除</span>
                                <span class="chrgt1 yellow" @click="openAddResDialog(firstItem.id)">新增资源</span>
                            </div>
                            <draggable v-model="firstItem.children" :options="{group:'secItem'}" element="div">
                                <div class="resourcebox" v-for="(secItem,index3) in firstItem.children"
                                     :key="secItem.id">
                                    <div class="knowledge">
                                        <span class="chlft">
                                            {{secItem.name}}<span class="chline">|</span>资源ID：{{secItem.resource && secItem.resource.id}} 【{{secItem.resource && secItem.resource.discriminator | Resource2chn}}】，{{secItem.resource && secItem.resource.title}} </span>
                                        <span class="chrgt"
                                              @click="openeEditResource(secItem)">修改</span>
                                        <span class="chrgt"
                                              @click="openDelResDialog(secItem.id)">删除</span>
                                    </div>
                                </div>
                            </draggable>
                        </div>
                    </draggable>
                </template>
                <div class="chaptit additem"><span @click="openFirLvDialog">新增一级大纲目录</span></div>
            </div>
        </div>

        <!--弹层 -->

        <el-dialog title="选择学习资源" class="tabplane addResourceDialog" top="10%" :visible.sync="dialogFormVisible"
                   @close="closeDialog('addResFirFrom')">
            <el-col v-for="item in progressText" :key="item.text" :sm="8">
                <div class="order-progress-bar">
                    <i class="progress-bar-line" :class="item.isCustomerConfirm ? item.currentLine : ''"></i>
                    <i class="progress-bar-dot" :class="item.isCustomerConfirm ? item.currentDot : ''"></i>
                    <span :class="item.isCustomerConfirm ? item.currentText : ''">{{item.text}}</span>
                </div>
            </el-col>
            <!-- 第一步 -->
            <el-form :model="addResFirFrom" ref="addResFirFrom" v-show="module1" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="显示名称" prop="name"
                              :rules="filter_rules({required:true,type:'isAllSpace',max:20})">
                    <el-input class="coursetxt" v-model="addResFirFrom.name"></el-input>
                </el-form-item>
                <!--标签-->
                <!--<el-form-item label="性质标签" prop="region">
                  <el-radio-group v-model="radio1">
                    <el-radio :label="1">不显示标签</el-radio>
                    <el-radio :label="2">必修</el-radio>
                    <el-radio :label="3">选修</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="环节标签" prop="region">
                  <el-radio-group v-model="radio2">
                    <el-radio :label="4">不显示标签</el-radio>
                    <el-radio :label="5">课前</el-radio>
                    <el-radio :label="6">课中</el-radio>
                    <el-radio :label="7">课后</el-radio>
                  </el-radio-group>
                </el-form-item>-->
                <el-form-item class="coursebtn">
                    <el-button style="margin-top:12px;" @click="firstNextSubmit('addResFirFrom')">下一步</el-button>
                </el-form-item>
            </el-form>
            <!-- 第二步 -->
            <el-form label-width="100px" v-show="module2" class="demo-ruleForm">
                <div class="selectmodel">
            <span
                :class="[selcurrent == item.discriminator ? 'is-active' : '']"
                @click="selectclk(item.discriminator,item.label)"
                v-for="(item,index) in resourceTypeList"
                :key="index"
            >
                {{item.label}}
            </span>
                </div>
                <el-form-item class="coursebtn">
                    <el-button style="margin-top:12px;" v-show="prevclk" @click="prev">上一步</el-button>
                    <el-button style="margin-top:12px;" v-show="nextclk" @click="secondSubmit">下一步</el-button>
                </el-form-item>
            </el-form>
            <!-- 第三步 -->
            <div class="rulemodule" v-show="module3">
                <el-input :placeholder="inputPlaceholder" size="small" icon="search" v-model="resourceinput"
                          :on-icon-click="handleIconClick" @keydown.native.enter="handleIconClick"></el-input>
                <el-table ref="multipleTable" :data="resourceTable" tooltip-effect="dark" v-loading="resLoading"
                          style="width:100%;margin-top:20px;"
                          max-height="400"
                          @selection-change="handleSelectionChange">
                    <el-table-column label="资源ID" width="120">
                        <template scope="scope">
                            <el-radio class="radio" v-model="resourceRadio" :label="String(scope.row.id)"></el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column prop="discriminator" label="资源类型" width="120">
                        <template scope="scope">
                            <span>{{scope.row.discriminator}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="资源名称" show-overflow-tooltip>
                        <template scope="scope">
                            <span>{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <span>查看</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="pagination.current_page"
                    :page-size="50"
                    layout="total, prev, pager, next, jumper"
                    :total="pagination.total">
                </el-pagination>
                <div class="coursebtn" style="padding-top: 0;margin-top: 40px;">
                    <el-button style="margin-top:12px;" v-show="prevclk" @click="prev">上一步</el-button>
                    <!-- <el-button style="margin-top:12px;" v-show="nextclk" @click="next">下一步</el-button> -->
                    <el-button type="primary" v-if="resourceAction=='add'" :loading="btnLoading"
                               @click="addSyllabusResource">{{btnLoading?'新增中':'确 定'}}
                    </el-button>
                    <el-button type="primary" v-if="resourceAction=='update'" :loading="btnLoading"
                               @click="updateSyllabusResource">{{btnLoading?'新增中':'确 定'}}
                    </el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog :title="deleteModule ? '删除课程大纲目录' : '删除已选资源'" class="tabplane" :visible.sync="dialogVisible"
                   size="tiny"
                   :before-close="handleClose">
            <span>{{deleteModule ? '确定要删除该课程大纲目录吗？删除后，该目录下的子目录及资源关系均将被删除！' : '确定要删除已选择的资源吗？'}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDelete">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="Moduledialog ? bigdislog ? '新增一级大纲目录' : '新增课程大纲子目录' : '修改课程大纲名称'" class="tabplane"
                   :visible.sync="adddialogVisible" size="tiny" :before-close="handleClose">
            <el-form :model="ruleProject" ref="ruleProject" label-width="100px" class="demo-ruleForm">
                <el-form-item label="显示名称" prop="name"
                              :rules="filter_rules({required:true,type:'isAllSpace',max:20})">
                    <el-input class="coursetxt" v-model="ruleProject.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="adddialogVisible = false">取 消</el-button>
                    <el-button type="primary" v-if="Moduledialog == true" :loading="btnLoading"
                               @click="addruleProject('ruleProject')">{{btnLoading?'新增中':'确 定'}}
                    </el-button>
                    <el-button type="primary" v-else :loading="btnLoading" @click="updateruleProject('ruleProject')">
                        {{btnLoading?'保存中':'保 存'}}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<style>
    .addResourceDialog .el-pagination {
        text-align: right;
        margin-top: 14px;
    }
</style>
<script>
    import draggable from 'vuedraggable';
    import {
        getSyllabusItems,
        checkSyllabus,
        DeleteSyllabusItem,
        checkResIsInOutline,
        CourseSyllabusItem,
        ChangeSyllabusItem,
        addSyllabusResource
    } from '../../api/outline'
    import {getResource} from '../../api/resource'
    import {progressText, resourceTypeList} from '../../common/outlineConfig.js'

    export default {
        components: {
            draggable,
        },
        data() {
            return {
                project_id: '',     //项目id
                subject_id: '',   //科目id
                btnLoading: false,  //按钮loading
                active: 0,
                resourceRadio: '',    //选择的资源
                nativeResourceRadio: '',    //修改之前本来选择的资源
                ResIsInOutline: false,  //检查该资源是否已经挂载
                radio1: 1,
                radio2: 4,
                tabledata: [],
                progressText: progressText,
                addResFirFrom: {
                    name: ''
                },
                ruleProject: {
                    name: ''
                },
                dialogFormVisible: false,
                model1: '视频',
                module1: true,
                module2: false,
                module3: false,
                resourceTable: [],    //资源列表
                multipleSelection: [],
                prevclk: false,
                nextclk: true,
                dialogVisible: false,
                adddialogVisible: false,  //新增和修改大纲目录的弹层
                Moduledialog: true,    //增加子目录的弹层的标题
                bigdislog: false,
                deleteModule: true,
                selcurrent: 'video',
                inputPlaceholder: '请输入视频资源ID / 名称',
                ddd: '',
                indexs: '',
                refname: '',
                coursesylllevel: '',
                coursesyllid: '',
                currentId: '0',    //0是最外层父级大纲   pid也表示当前需要操作的id
                title: '',   //课程大纲标题
                resourceTypeList: resourceTypeList,
                tag_id: '',    //标签id
                resourceAction: 'add',   //资源弹层的操作
                pagination: {
                    current_page: 1, //资源列表当前页数
                    total: 1,       //资源列表总数量
                },
                resLoading: false,//loading
                resourceinput: '',//根据id或者名称搜索
                searchResourceTimer: '',//搜索资源演示器
            }
        },
        methods: {
            selectclk(discriminator, label) {
                this.selcurrent = discriminator;
                this.inputPlaceholder = `请输入${label}资源ID / 名称`
            },
            //关闭新增资源的弹层
            closeDialog(formName) {
                this.addResFirFrom = {
                    name: ''
                };
                this.$refs[formName].resetFields();
            },
            //打开新增资源的弹层
            openAddResDialog(id) {
                this.currentId = id;
                this.active = 0;
                this.progressText.forEach((item, index) => {
                    if (index == 0) {
                        item.isCustomerConfirm = true;
                    } else {
                        item.isCustomerConfirm = false;
                    }
                })
                this.showitem();
                this.addResFirFrom.name = '';
                this.resourceRadio = '';
                this.dialogFormVisible = true;
                this.resourceAction = 'add';
            },
            //第一步往下一步
            firstNextSubmit(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.active >= this.progressText.length - 1) return;
                        this.active++;
                        this.progressText[this.active].isCustomerConfirm = true;
                        this.showitem();
                    } else {
                        return false;
                    }
                });
            },
            //第二步往下一步
            async secondSubmit() {
                if (!this.selcurrent) {
                    this.$message.warning('请选择资源类型！');
                    return;
                }
                if (this.active >= this.progressText.length - 1) return;
                this.active++;
                this.progressText[this.active].isCustomerConfirm = true;
                this.showitem();
                this.resourceinput = '';  //输入框搜索初始化
                this.searchResource();
            },
            //分页搜索
            async handleCurrentChange(val) {
                val = Number(val)
                this.searchResource(val);
            },
            //点击搜索
            async handleIconClick() {
                if (this.pagination.current_page != 1) {
                    this.pagination.current_page = 1;
                } else {
                    this.searchResource();
                }
            },
            //搜索资源
            searchResource(val) {
                clearTimeout(this.searchResourceTimer)
                this.resLoading = true;
                this.searchResourceTimer = setTimeout(async () => {
                    clearTimeout(this.searchResourceTimer)
                    let discriminator = {
                        discriminator: this.selcurrent,
                        page_size: 50,
                        page: val ? val : 1,
                        'order_by[]': 'desc',   //顺序   倒序
                        'order_by_field[]': 'id',   //排序字段
                        keywords: this.resourceinput,
                        project_id: this.project_id,
                        subject_id: this.subject_id,
                    }
                    let ret = await getResource(discriminator);
                    if (ret.status == 0) {
                        this.resLoading = false;
                        this.resourceTable = ret.result.resources;
                        this.pagination.total = ret.result.pagination.total;
                    }
                }, 500)
            },
            prev() {
                if (this.active <= 0) return
                this.progressText[this.active].isCustomerConfirm = false;
                this.active--;
                this.showitem();
            },
            showitem() {
                if (this.active == 0) {
                    this.module1 = true;
                    this.module2 = false;
                    this.module3 = false;
                    this.prevclk = false;
                    this.nextclk = true;
                } else if (this.active == 1) {
                    this.module1 = false;
                    this.module2 = true;
                    this.module3 = false;
                    this.prevclk = true;
                    this.nextclk = true;
                } else if (this.active == 2) {
                    this.module1 = false;
                    this.module2 = false;
                    this.module3 = true;
                    this.prevclk = true;
                    this.nextclk = false;
                }
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //新增大纲资源
            async addSyllabusResource() {
                if (!this.resourceRadio) {
                    this.$message.error('请选择资源');
                    return;
                }
                //先查询时候挂载了该资源
                this.btnLoading = true;
                let res = await  checkResIsInOutline(this.coursesyllid, this.resourceRadio);
                if (res.status == 0) {
                    if (res.result.length > 0) {
                        this.resourceRadio = '';
                        this.$message({
                            type: 'error',
                            message: "该资源已经挂载在这个大纲上！",
                        })
                        this.btnLoading = false;
                        return;
                    }
                } else {
                    this.btnLoading = false;
                    return;
                }
                //先走新增资源名字
                let ret = await CourseSyllabusItem({
                    name: this.addResFirFrom.name,
                    pid: this.currentId,
                    course_syllabus_id: this.coursesyllid
                });
                if (ret.status == 0) {
                    //再走新增大纲资源
                    let id = ret.result.id;
                    let params = {
                        resource_id: this.resourceRadio,
                        tag_id: this.tag_id
                    }
                    let retv = await addSyllabusResource(id, params);
                    this.btnLoading = false;
                    if (retv.status == 0) {
                        this.$message({
                            type: 'success',
                            message: '新增资源成功！'
                        })
                        this.dialogFormVisible = false;
                        this.getSyllabusItems();
                    } else if (retv.status == 2) {
                        this.$message.error('添加失败！')
                    }
                } else if (ret.status == 2) {
                    this.$message.error('添加失败！')
                    this.btnLoading = false;
                }
            },
            //修改大纲的资源 包含名称&挂载资源
            async updateSyllabusResource() {
                if (!this.resourceRadio) {
                    this.$message.error('请选择资源');
                    return;
                }
                if (this.nativeResourceRadio != this.resourceRadio) {
                    //先查询时候挂载了该资源
                    let res = await  checkResIsInOutline(this.coursesyllid, this.resourceRadio);
                    if (res.status == 0) {
                        if (res.result.length > 0) {
                            this.resourceRadio = '';
                            this.$message({
                                type: 'error',
                                message: "该资源已经挂载在这个大纲上！",
                            })
                            return;
                        }
                    }
                }
                //先走修改大纲条目名字
                let id = this.currentId;
                let name = {
                    name: this.addResFirFrom.name
                };
                let ret = await ChangeSyllabusItem(id, name);
                if (ret.status == 0) {
                    //再走修改大纲资源
                    let id = ret.result.id ? ret.result.id : this.currentId;
                    let params = {
                        resource_id: this.resourceRadio,
                        tag_id: this.tag_id
                    }
                    let retv = await addSyllabusResource(id, params);
                    if (retv.status == 0) {
                        this.$message({
                            type: 'success',
                            message: '修改资源成功！'
                        })
                        this.dialogFormVisible = false;
                        this.getSyllabusItems();
                    } else if (retv.status == 2) {
                        this.$message.error('修改资源失败！')
                    }
                } else if (ret.status == 2) {
                    this.$message.error('修改资源失败！')
                }
            },
            //弹出修改资源的弹层
            openeEditResource(item) {
                this.active = 0;
                this.progressText.forEach((item, index) => {
                    if (index == 0) {
                        item.isCustomerConfirm = true;
                    } else {
                        item.isCustomerConfirm = false;
                    }
                })
                this.showitem();
                this.addResFirFrom.name = item.name;
                this.currentId = item.id;
                this.resourceRadio = item.resource && String(item.resource.id);
                this.nativeResourceRadio = item.resource && String(item.resource.id);   //原来的选项
                this.selcurrent = item.resource && item.resource.discriminator;
                this.dialogFormVisible = true;
                this.resourceAction = 'update';
            },
            // 弹出资源删除框
            openDelResDialog(id) {
                this.currentId = id;
                this.dialogVisible = true;
                this.deleteModule = false;
            },
            // 弹出大纲删除框
            openDelOutlineDialog(id) {
                this.currentId = id;
                this.dialogVisible = true;
                this.deleteModule = true;
            },
            // 删除确定
            async confirmDelete() {
                let id = this.currentId;
                let ret = await DeleteSyllabusItem(id);
                if (ret.status == 0) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getSyllabusItems();
                } else {

                }
                this.dialogVisible = false;
            },
            // 新增课程大纲子目录的弹层
            openChildDialog(currentId) {
                this.adddialogVisible = true;
                this.Moduledialog = true;
                this.bigdislog = false;
                this.ruleProject.name = "";
                this.currentId = currentId;     //父级大纲条目id
            },
            // 新增一级大纲的弹层
            openFirLvDialog() {
                this.adddialogVisible = true;
                this.Moduledialog = true;
                this.bigdislog = true;
                this.ruleProject.name = "";
                this.currentId = '0';
            },
            //确定增加一个子目录
            addruleProject(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.adddialogVisible = false;
                        if (this.Moduledialog != true) {
                            this.$refs[this.refname][0].innerText = this.ruleProject.name;
                        } else {
                            this.addbigCourse();
                        }
                        console.log('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 添加大纲目录
            async addbigCourse() {
                this.btnLoading = true;
                let ret = await CourseSyllabusItem({
                    name: this.ruleProject.name,
                    pid: this.currentId,
//          level:this.coursesylllevel,
                    course_syllabus_id: this.coursesyllid
                });
                this.btnLoading = false;
                if (ret.status == 0) {
                    ret.message = "添加成功！";
                    this.currentId = '0';
                    this.getSyllabusItems();
                } else {
                    ret.message = "添加失败！";
                }
                this.$message({
                    message: ret.message,
                    type: 'success'
                });
            },
            // 修改大纲目录
            updateruleProject(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let id = this.currentId;
                        let name = {
                            name: this.ruleProject.name
                        };
                        this.btnLoading = true;
                        let ret = await ChangeSyllabusItem(id, name);
                        this.btnLoading = false;
                        if (ret.status == 0) {
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
                            this.adddialogVisible = false;
                            this.getSyllabusItems();
                        } else {
                            this.$message.error('修改失败！')
                        }
                    } else {
                        return false;
                    }
                });


            },
            // 弹出修改课程大纲名称的弹层
            editproject(currentId, name) {
                console.log(currentId, name);
                this.currentId = currentId;
                this.ruleProject.name = name;
                this.adddialogVisible = true;
                this.Moduledialog = false;
            },
            //拉取这个大纲的条目
            async getSyllabusItems() {
                let course_syllabus_id = {
                    course_syllabus_id: this.coursesyllid
                };
                let ret = await getSyllabusItems(course_syllabus_id);
                if (ret.status == 0) {
                    this.tabledata = ret.result;
                }
            },
            //查看大纲的详情
            async checkSyllabus() {
                let ret = await checkSyllabus(this.coursesyllid);
                if (ret.status == 0) {
                    this.title = ret.result.title;
                    this.tag_id = ret.result.tag_id;
                    this.project_id = ret.result.project.id;
                    this.subject_id = ret.result.subject.id;
                    this.coursesylllevel = ret.result.template.level_max;    //大纲的层级
                }
            },
            //排序
            async dragEnd(data, evt) {
                console.log(evt)
                // let {pkgId, cids} = this.getSortData(pkg, data);
                // let ret = await sort(`/spaceapi/package/${pkgId}/change/sort`,{
                // course_id_list: cids
                // });
                // console.log(ret);
            },
            checkMove(evt, originalEvent) {
                console.log(evt, originalEvent)
                console.log(evt.draggedContext, evt.relatedContext)
            },
            getSortData(pkg, data) {
                let cids = [];
                for (let value of data) {
                    cids.push(value.id);
                }
                return {pkgId: pkg.id, cids}
            },
        },
        computed: {},
        mounted() {
        },
        created() {
            this.coursesyllid = this.$route.params.sid;
            this.getSyllabusItems();
            this.checkSyllabus();
        }
    }
</script>