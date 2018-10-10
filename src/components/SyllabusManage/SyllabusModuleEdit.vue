<template>
    <div class="module-edu-content permission-outlinemodule">
      <el-row class="outlineeat">
        <el-col :span="18">
          课程大纲：{{title}}
        </el-col>
        <el-col :span="6" v-if="coursesylllevel === 4 && subject_id != 0" style="text-align:right;">
          <el-switch v-model="is_knowledge_open" @change="handleChangeIsKnowledgeOpen" active-text="是否启用知识点关联">
          </el-switch>
        </el-col>
      </el-row>
      <div class="outlinebox">
        <div class="chapterbox">
          <template v-if="coursesylllevel === 3">
            <draggable v-model="tabledata" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.first-chapter-box'}">
            <div v-for="firstItem in tabledata" :key="firstItem.id" class="first-chapter-box">
              <div class="chaptit" @click="spread(firstItem)">
                <span class="chlft">
                  <span v-if="openArr.includes(firstItem.id)" style="font-weight: bold;" class="el-icon-arrow-down"></span>
                  <span v-else style="font-weight: bold;" class="el-icon-arrow-right"></span>
                  {{firstItem.name}} <span class="gray"> （条目ID：{{firstItem.id}}）</span>
                </span>
                <el-row class="chrgt" style="width:60px;">
                  <el-col :span="12">
                    <el-dropdown trigger="click" @click.native="handleSpread">
                      <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
                      <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
                        <el-dropdown-item @click.native="copyId(firstItem.id)">
                          <span class="dropdown-child" >复制条目ID</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="openDelOutlineDialog(firstItem)">
                          <span class="dropdown-child">删除</span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
                <span class="chrgt" @click.stop="editproject(firstItem.id,firstItem.name)">修改</span>
                <span class="chrgt" @click.stop="openChildDialog(firstItem.id)">增加子目录</span>
                <el-select v-model="firstItem.two_level_subject" placeholder="请选择二级科目" class="chrgt erji-course"
                v-if='project_id==4 && (subject_id==40||subject_id == 27||subject_id==26||subject_id==90)
                || project_id==16 && (subject_id==64||subject_id==65)' @change='selectSubjectTwo(firstItem.two_level_subject, firstItem.id, firstItem.name)'>
                  <el-option
                    v-for="item in erjiCourseOptions"
                    :key="item.two_level_subiect_id"
                    :label="'二级科目：'+item.name"
                    :value="item.two_level_subiect_id">
                    <span style='display:none'>二级科目：</span>
                    <span>{{item.name}}</span>
                  </el-option>
                </el-select>
              </div>

              <div>
                <el-collapse-transition>
                  <draggable v-if="openArr.includes(firstItem.id)" v-model="firstItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.second-chapter-box'}">
                    <div v-for="secItem in firstItem.children" :key="secItem.id" class="second-chapter-box">
                      <div class="chaptit chapsecd">
                        <span class="chlft">
                          {{secItem.name}}<span class="gray">（条目ID：{{secItem.id}}）</span>
                        </span>
                        <el-row class="chrgt" style="width:60px;">
                          <el-col :span="12">
                            <el-dropdown trigger="click">
                              <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
                              <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
                                <el-dropdown-item  @click.native="copyId(secItem.id)">
                                  <span class="dropdown-child">复制条目ID</span>
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="openDelOutlineDialog(secItem)">
                                  <span class="dropdown-child">删除</span>
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                          </el-col>
                        </el-row>
                        <span class="chrgt" @click="editproject(secItem.id,secItem.name)">修改</span>
                        <span class="chrgt" @click="openAddResDialog(secItem)" style="color:#FF9C1C;">新增资源</span>
                      </div>
                      <draggable v-model="secItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.third-chapter-box'}">
                        <div class="resourcebox third-chapter-box" v-for="thirdItem in secItem.children" :key="thirdItem.id">
                          <div class="knowledge">
                            <!-- <el-tag class="attribute-tag" size="small" type="danger" v-if="thirdItem.apply_to=='1' || thirdItem.apply_to=='2'">{{thirdItem.apply_to=='2'?'提分盒子':thirdItem.apply_to=='1'?'跳级测试':''}}</el-tag> -->
                            <span class="chlft">
                              <span class='dif-type' v-if="thirdItem.apply_to=='1' || thirdItem.apply_to=='2'">{{thirdItem.apply_to=='2'?'提分盒子':thirdItem.apply_to=='1'?'跳级测试':''}}</span>
                              <span v-if="thirdItem.resource && thirdItem.apply_to!='1' && thirdItem.apply_to!='2'" class="dif-type">{{thirdItem.resource && thirdItem.resource.discriminator | Resource2chn}}</span>&nbsp;
                              <span class="audition" v-if="thirdItem.audition&&thirdItem.audition=='1'">试听</span>
                              {{thirdItem.name}}
                              <span class="gray">（条目ID：{{ thirdItem.id }}<template v-if="thirdItem.resource ">
                                资源ID：{{thirdItem.resource && thirdItem.resource.id}}</template>）
                                <template v-if="thirdItem.study_time&&thirdItem.study_time!='0'"><span class="chline">|</span>建议学习：{{thirdItem.study_time}}分钟</template>
                              </span>
                            </span>
                            <el-row class="chrgt" style="width:60px;">
                              <el-col :span="12">
                                <el-dropdown trigger="click">
                                  <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
                                  <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
                                    <el-dropdown-item  @click.native="copyId(thirdItem.id,thirdItem)">
                                      <span class="dropdown-child">复制条目/资源ID</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item v-if="thirdItem.resource && thirdItem.resource.discriminator === 'video'">
                                      <span class="dropdown-child">设置试听
                                        <el-switch
                                          @change="changePreWatch(thirdItem)"
                                          v-bind="{value:thirdItem.audition == 1&&thirdItem.audition?true:false}"
                                          active-color="#2884E0"
                                          inactive-color="#BFBFBF">
                                        </el-switch>
                                      </span>
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="goPreview(thirdItem)">
                                      <span class="dropdown-child">预览</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="openDelResDialog(thirdItem)">
                                      <span class="dropdown-child">删除</span>
                                    </el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>
                              </el-col>
                            </el-row>
                            <span class="chrgt" @click="openeEditResource(thirdItem)">修改</span>
                          </div>
                        </div>
                      </draggable>
                    </div>
                  </draggable>
                </el-collapse-transition>
              </div>

            </div>
            </draggable>
          </template>
          <template v-if="coursesylllevel === 4">
            <draggable v-model="tabledata" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.first-chapter-box'}">
            <div v-for="firstItem in tabledata" :key="firstItem.id" class="first-chapter-box">
              <div class="chaptit" @click="spread(firstItem)">
                <span class="chlft">
                  <span v-if="openArr.includes(firstItem.id)" style="font-weight: bold;" class="el-icon-arrow-down"></span>
                  <span v-else style="font-weight: bold;" class="el-icon-arrow-right"></span>
                  {{firstItem.name}}<span class="gray">（条目ID：{{firstItem.id}}）</span>
                </span>
                <el-row class="chrgt" style="width:60px;">
                  <el-col :span="12">
                    <el-dropdown trigger="click" @click.native="handleSpread">
                      <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
                      <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
                        <el-dropdown-item  @click.native="copyId(firstItem.id)">
                          <span class="dropdown-child">复制条目ID</span>
                        </el-dropdown-item>
                         <el-dropdown-item  @click.native="openDelOutlineDialog(firstItem)">
                          <span class="dropdown-child">删除</span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
                <span class="chrgt" @click.stop="editproject(firstItem.id,firstItem.name)">修改</span>
                <span class="chrgt" @click.stop="openChildDialog(firstItem.id)">增加子目录</span>
                <el-select v-model="firstItem.two_level_subject" placeholder="请选择二级科目" class="chrgt erji-course"
                v-if='project_id==4 && (subject_id==40||subject_id == 27||subject_id==26||subject_id==90)
                || project_id==16 && (subject_id==64||subject_id==65)' @change='selectSubjectTwo(firstItem.two_level_subject, firstItem.id, firstItem.name)'>
                  <el-option
                    v-for="item in erjiCourseOptions"
                    :key="item.two_level_subiect_id"
                    :label="'二级科目：'+item.name"
                    :value="item.two_level_subiect_id">
                    <span style='display:none'>二级科目：</span>
                    <span>{{item.name}}</span>
                  </el-option>
                </el-select>
              </div>

              <div>
                <el-collapse-transition>
                  <draggable v-if="openArr.includes(firstItem.id)" v-model="firstItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.second-chapter-box'}">
                    <div v-for="secItem in firstItem.children" :key="secItem.id" class="second-chapter-box">
                      <div class="chaptit chapsecd">
                        <span class="chlft">{{secItem.name}}<span class="gray">（条目ID：{{secItem.id}}）</span></span>

                        <el-row class="chrgt" style="width:60px;">
                          <el-col :span="12">
                            <el-dropdown trigger="click">
                              <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
                              <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
                                <el-dropdown-item @click.native="copyId(secItem.id)">
                                  <span class="dropdown-child">复制条目ID</span>
                                </el-dropdown-item>
                                <el-dropdown-item  @click.native="openDelOutlineDialog(secItem)">
                                  <span class="dropdown-child">删除</span>
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                          </el-col>
                        </el-row>
                        <span class="chrgt" @click="editproject(secItem.id,secItem.name)">修改</span>
                        <span class="chrgt" @click="openChildDialog(secItem.id,true)">增加子目录</span>
                      </div>
                      <draggable v-model="secItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.third-chapter-box'}">
                        <div v-for="thirdItem in secItem.children" :key="thirdItem.id" class="third-chapter-box">
                          <div class="knowledge">
                            <span class="chlft">
                              <span> {{thirdItem.name}} <span class="gray">（条目ID：{{thirdItem.id}}）</span></span> &nbsp;&nbsp;<span v-if="thirdItem.knowledge_id" class="connect-knowledage">关联：{{thirdItem.knowledge_id}}  {{thirdItem.knowledge_name}}</span>
                            </span>
                            <el-row class="chrgt" style="width:60px;">
                              <el-col :span="12">
                                <el-dropdown trigger="click">
                                  <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
                                  <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
                                    <el-dropdown-item @click.native="copyId(thirdItem.id)">
                                      <span class="dropdown-child">复制条目ID</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="handleOpenKnowledgeDialog(thirdItem)">
                                      <span class="dropdown-child" v-if="subject_id != 0">关联知识点</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item  @click.native="openDelOutlineDialog(thirdItem)">
                                      <span class="dropdown-child">删除</span>
                                    </el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>
                              </el-col>
                            </el-row>
                            <span class="chrgt" @click="editproject(thirdItem.id,thirdItem.name)">修改</span>
                            <span class="chrgt" @click="openAddResDialog(thirdItem)" style="color:#FF9C1C;">新增资源</span>
                          </div>
                          <draggable v-model="thirdItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.fourth-chapter-box'}">
                            <div class="resourcebox fourth-chapter-box" v-for="fourthItem in thirdItem.children" :key="fourthItem.id">
                              <div class="knowledge">
                                <!-- <el-tag class="attribute-tag" size="small" type="danger" v-if="fourthItem.apply_to=='2' || fourthItem.apply_to== '1'">{{fourthItem.apply_to=='2'?'提分盒子':fourthItem.apply_to=='1'?'跳级测试':''}}</el-tag> -->
                                <span class="chlft">
                                  <span class="dif-type" v-if="fourthItem.apply_to=='2' || fourthItem.apply_to== '1'">{{fourthItem.apply_to=='2'?'提分盒子':fourthItem.apply_to=='1'?'跳级测试':''}}</span>
                                  <span v-if="fourthItem.resource && fourthItem.apply_to!='2'&&fourthItem.apply_to!= '1'" class="dif-type">{{fourthItem.resource && fourthItem.resource.discriminator | Resource2chn}}</span>&nbsp;
                                  <span class="audition" v-if="fourthItem.audition&&fourthItem.audition=='1'">试听</span>
                                  {{fourthItem.name}}
                                  <span class="gray">
                                    （条目ID：{{fourthItem.id}}<template v-if="fourthItem.resource">&nbsp;&nbsp;资源ID：{{fourthItem.resource && fourthItem.resource.id}}</template>）
                                    <template v-if="fourthItem.study_time&&fourthItem.study_time!='0'"><span class="chline">|</span>建议学习：{{fourthItem.study_time}}分钟</template>
                                  </span>
                                </span>
                                <el-row class="chrgt" style="width:60px;">
                                  <el-col :span="12">
                                    <el-dropdown trigger="click">
                                      <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
                                      <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
                                        <el-dropdown-item @click.native="copyId(fourthItem.id,fourthItem)">
                                          <span class="dropdown-child">复制条目/资源ID</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item v-if="fourthItem.resource && fourthItem.resource.discriminator === 'video'">
                                          <span class="dropdown-child">
                                            设置试听
                                            <el-switch
                                              @change="changePreWatch(fourthItem)"
                                              v-bind="{value:fourthItem.audition == 1&&fourthItem.audition?true:false}"
                                              active-color="#2884E0"
                                              inactive-color="#BFBFBF">
                                            </el-switch>
                                          </span>
                                        </el-dropdown-item>
                                        <el-dropdown-item @click.native="goPreview(fourthItem)">
                                          <span class="dropdown-child">预览</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item @click.native="openDelResDialog(fourthItem)">
                                          <span class="dropdown-child">删除</span>
                                        </el-dropdown-item>
                                      </el-dropdown-menu>
                                    </el-dropdown>
                                  </el-col>
                                </el-row>
                                <span class="chrgt" @click="openeEditResource(fourthItem)">修改</span>

                              </div>
                            </div>
                          </draggable>
                        </div>
                      </draggable>
                    </div>
                  </draggable>
               </el-collapse-transition>
              </div>

            </div>
            </draggable>
          </template>
          <template v-if="coursesylllevel === 2">
            <draggable v-model="tabledata" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.first-chapter-box'}">
            <div v-for="firstItem in tabledata" :key="firstItem.id" class="first-chapter-box">
              <div class="chaptit" @click="spread(firstItem)">
                <span class="chlft">
                  <span v-if="openArr.includes(firstItem.id)" style="font-weight: bold;" class="el-icon-arrow-down"></span>
                  <span v-else style="font-weight: bold;" class="el-icon-arrow-right"></span>
                  {{firstItem.name}} <span class="gray">（条目ID：{{firstItem.id}}） </span>
                </span>
                <el-row class="chrgt" style="width:60px;">
                  <el-col :span="12">
                    <el-dropdown trigger="click" @click.native="handleSpread">
                      <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
                      <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
                        <el-dropdown-item @click.native="copyId(firstItem.id)">
                          <span class="dropdown-child">复制条目ID</span>
                        </el-dropdown-item>
                        <el-dropdown-item  @click.native="openDelOutlineDialog(firstItem)">
                          <span class="dropdown-child">删除</span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>

                <span class="chrgt" @click.stop="editproject(firstItem.id,firstItem.name)">修改</span>
                <span class="chrgt" @click.stop="openAddResDialog(firstItem)" style="color:#FF9C1C;">新增资源</span>
                <el-select v-model="firstItem.two_level_subject" placeholder="请选择二级科目" class="chrgt erji-course"
                v-if='project_id==4 && (subject_id==40||subject_id == 27||subject_id==26||subject_id==90)
                || project_id==16 && (subject_id==64||subject_id==65)' @change='selectSubjectTwo(firstItem.two_level_subject, firstItem.id, firstItem.name)'>
                  <el-option
                    v-for="item in erjiCourseOptions"
                    :key="item.two_level_subiect_id"
                    :label="'二级科目：'+item.name"
                    :value="item.two_level_subiect_id">
                    <span style='display:none'>二级科目：</span>
                    <span>{{item.name}}</span>
                  </el-option>
                </el-select>
              </div>

              <div>
                <el-collapse-transition>
                  <draggable v-if="openArr.includes(firstItem.id)" v-model="firstItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.second-chapter-box'}">
                    <div class="resourcebox second-chapter-box" v-for="secItem in firstItem.children" :key="secItem.id">
                      <div class="knowledge">
                        <!-- <el-tag class="attribute-tag" size="small" type="danger" v-if="secItem.apply_to == '2' || secItem.apply_to=='1' ">{{secItem.apply_to=='2'?'提分盒子':secItem.apply_to=='1'?'跳级测试': ''}}</el-tag> -->
                        <span class="chlft">
                        <span class="dif-type" v-if="secItem.apply_to == '2' || secItem.apply_to=='1' ">{{secItem.apply_to=='2'?'提分盒子':secItem.apply_to=='1'?'跳级测试': ''}}</span>
                        <span v-if="secItem.resource && secItem.apply_to != '2' && secItem.apply_to !='1'" class="dif-type">{{secItem.resource && secItem.resource.discriminator | Resource2chn}}</span>&nbsp;
                        <span class="audition" v-if="secItem.audition&&secItem.audition=='1'">试听</span>
                          {{secItem.name}}
                          <span class="gray">
                          （条目ID：{{secItem.id}}<template v-if="secItem.resource"> 资源ID：{{secItem.resource && secItem.resource.id}}</template>）
                            <template v-if="secItem.study_time&&secItem.study_time!='0'"><span class="chline">|</span>建议学习：{{secItem.study_time}}分钟</template>
                          </span>
                        </span>

                        <el-row class="chrgt" style="width:60px;">
                          <el-col :span="12">
                            <el-dropdown trigger="click">
                              <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
                              <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
                                <el-dropdown-item @click.native="copyId(secItem.id , secItem)">
                                  <span class="dropdown-child" >复制条目/资源ID</span>
                                </el-dropdown-item>
                                <el-dropdown-item v-if="secItem.resource && secItem.resource.discriminator === 'video'">
                                  <span class="dropdown-child">
                                    设置试听
                                    <el-switch
                                      @change="changePreWatch(secItem)"
                                      v-bind="{value:secItem.audition == 1&&secItem.audition?true:false}"
                                      active-color="#2884E0"
                                      inactive-color="#BFBFBF">
                                    </el-switch>
                                  </span>
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="goPreview(secItem)">
                                  <span class="dropdown-child" >预览</span>
                                </el-dropdown-item>
                                <el-dropdown-item  @click.native="openDelResDialog(secItem)">
                                  <span class="dropdown-child">删除</span>
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                          </el-col>
                        </el-row>
                        <span class="chrgt" @click="openeEditResource(secItem)">修改</span>
                      </div>
                    </div>
                  </draggable>
                </el-collapse-transition>
              </div>
            </div>
            </draggable>
          </template>
          <div class="chaptit additem">
            <span @click="openFirLvDialog">新增一级大纲目录</span>
          </div>
        </div>
      </div>
      <!--弹层 -->
      <el-dialog title="选择学习资源" width="60%" class="tabplane addResourceDialog" top="2%" :visible.sync="dialogFormVisible">
        <el-steps :active="active" finish-status="finish" simple style="margin-top: -10px;margin-bottom:10px;">
          <el-step :title="item.text" :key="index" v-for="(item,index) in progressText" description=""></el-step>
        </el-steps>
        <!-- 第一步 -->
        <el-form :model="addResFirFrom" ref="addResFirFrom" v-show="active == 0" @submit.native.prevent label-width="100px" class="demo-ruleForm">
          <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:100})">
            <el-input class="coursetxt" v-model="addResFirFrom.name" @keydown.native.enter="firstNextSubmit('addResFirFrom')"></el-input>
          </el-form-item>
          <el-row class="ep-set-box">
            <p class="ep-line"></p>
            <span class="ep-tips">以下设置为EP专用：（选填）</span>
          </el-row>
          <el-form-item label="建议学习时长" prop="study_time">
            <el-select style="" v-model="addResFirFrom.study_time" popper-class='study-time-select' clearable placeholder="请选择">
              <el-option v-for="item in study_time_options" :key="item.value" :label="item.value" :value="item.value">
              </el-option>
            </el-select>
            分钟
          </el-form-item>
          <el-form-item class="coursebtn">
            <!-- <el-button @click="directSyllabus('addResFirFrom')" v-if="resourceAction === 'add'" style="margin-top:12px;">只创建条目</el-button> -->
            <!-- <el-button @click="directChangeSyllabus('addResFirFrom')" v-if="resourceAction === 'update'" style="margin-top:12px;">只修改条目</el-button> -->
            <el-button type="primary" style="margin-top:12px;" @click="firstNextSubmit('addResFirFrom')">继续加资源</el-button>
          </el-form-item>
        </el-form>
        <!-- 第二步 -->
        <el-form label-width="100px" v-show="active == 1" class="demo-ruleForm">
          <div class="selectmodel">
            <span style="position: relative;" :class="[resourceType == item.discriminator ? 'is-active' : '']" @click="selectclk(item.discriminator)" v-for="(item,index) in resourceTypeList" :key="index">
              {{item.label}}
              <div style="width:100%;font-size:10px;position: absolute;top:25px;" v-if="item.discriminator=='resource_group'">注：仅用于多老师</div>
            </span>
          </div>
          <el-row class="ep-set-box" v-if="resourceType === 'paper'">
            <p class="ep-line"></p>
            <span class="ep-tips">以下设置为EP专用：（选填）</span>
          </el-row>
          <el-form-item label="资源应用" v-if="resourceType === 'paper'">
            <el-checkbox-group v-model="addResFirFrom.apply_to" @change="handleCheckboxChange">
              <el-checkbox label="1">跳级测试</el-checkbox>
              <el-checkbox label="2">提分盒子</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="开启时间" prop="start_time" v-if="resourceType === 'paper'">
            <el-date-picker v-model="addResFirFrom.start_time" type="datetime" value-format="timestamp" placeholder="请设置开启时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="coursebtn">
            <el-button style="margin-top:12px;" @click="prev">上一步</el-button>
            <el-button style="margin-top:12px;" @click="secondSubmit">下一步</el-button>
          </el-form-item>
        </el-form>
        <!-- 第三步 -->
        <div class="rulemodule" v-show="active == 2">
          <el-form label-position='left' label-width="80px" v-show="resourceType === 'video' || resourceType === 'lecture_note'">
            <el-form-item label="来源">
              <el-radio-group v-model="sourceRadio">
                <el-radio :label="1">上传/创建资源</el-radio>
                <el-radio :label="2">从已有资源选择</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <!-- 讲义 -->
          <el-row v-show="sourceRadio === 1 && resourceType === 'lecture_note'">
            <HandoutUpload ref="handoutUpload" @getHandoutPath="getHandoutPath"></HandoutUpload>
          </el-row>
          <!-- 视频 -->
          <el-row v-show="sourceRadio === 1 && resourceType === 'video'">
            <el-form :model="videoForm" label-position='left' ref="videoForm" label-width="120px" class="resource-ruleForm">
              <el-form-item label="视频地址" prop="video_id" :rules="filter_rules({required:true,type:'isVideoId'})">
                <el-input v-model="videoForm.video_id" placeholder="请输入视频地址" auto-complete="off"></el-input>
                <el-tooltip placement="top">
                  <div slot="content">
                    只需要输入地址中不同部分即可,如示例:红色部分：<br/>{{urltip}}
                    <span style="color:red;">16oe3We00h1ye2hZ</span>{{urltip2}}</div>
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="视频时长（分）" prop="duration_minutes" class="displayinline" :rules="[{required: true, message: '请填写视频时长的分钟', trigger: 'blur'},...valiMinites]">
                <el-input v-model="videoForm.duration_minutes" @input="handleInputMinutesChange" placeholder="请填写视频时长的分钟" auto-complete="off"></el-input>
                分
              </el-form-item>
              <el-form-item label="视频时长（秒）" prop="duration_second" class="displayinline" :rules="valiSeconds">
                <el-input v-model="videoForm.duration_second" @input="handleInputSecondChange" @change="handleInputChange" placeholder="请填写视频时长的秒" auto-complete="off"></el-input>
                秒
              </el-form-item>
            </el-form>
          </el-row>
          <el-row v-show="sourceRadio === 2">
            <el-input :placeholder="inputPlaceholder" size="small" v-model="resourceinput" @keydown.native.enter="handleIconClick">
              <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
            </el-input>
            <el-table ref="singleTable" :data="resourceTable" border tooltip-effect="dark" v-loading="resLoading" style="width:100%;margin-top:20px;" max-height="400" @selection-change="handleSelectionChange" highlight-current-row @current-change="handleTableChange">
              <el-table-column :label="item.label" :width="item.wh" v-for="(item,index) in resourceTableConfig" :key="index" show-overflow-tooltip>
                <template slot-scope="scope">
                  <template v-if="item.key == 'id' || item.key == 'paper_id' || item.key == 'live_id' ">
                    <el-radio class="radio" v-model="resourceRadio" :label="String(scope.row.id)"></el-radio>
                    <span>{{scope.row[item.key]}}</span>
                  </template>
                  <span v-else-if="item.key == 'discriminator'">{{scope.row[item.key] | Resource2chn}}</span>
                  <span v-else>{{scope.row[item.key]}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="pagination.current_page" :page-size="50" layout="total, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
          </el-row>
          <div class="coursebtn" style="padding-top: 0;margin-top: 20px;">
            <el-button style="margin-top:12px;" @click="prev">上一步</el-button>
            <!-- <el-button style="margin-top:12px;" v-show="nextclk" @click="next">下一步</el-button> -->
            <el-button type="primary" v-if="resourceAction=='add'" :loading="btnLoading" @click="addSyllabusResourceItem">{{btnLoading?'新增中':'确 定'}}
            </el-button>
            <el-button type="primary" v-if="resourceAction=='update'" :loading="btnLoading" @click="updateSyllabusResource">{{btnLoading?'新增中':'确 定'}}
            </el-button>
          </div>
        </div>
      </el-dialog>

      <el-dialog :title="deleteModule ? '删除课程大纲目录' : '删除已选资源'" class="tabplane" :visible.sync="dialogVisible" size="tiny">
        <span>{{deleteModule ? '确定要删除该课程大纲目录吗？删除后，该目录下的子目录及资源关系均将被删除！' : '确定要删除已选择的资源吗？'}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :loading="delLoading" @click="confirmDelete">{{ delLoading? "删除中" : '确 定'}}</el-button>
        </span>
      </el-dialog>


      <SelectKnowledge
         ref="selectKnowledge"
        :dialog-knowledge-visible="dialogKnowledgeVisible"
        :knowledge-list="knowledgeList"
        :current-syllabus-item-knowledge="currentSyllabusItemKnowledge"
        @changeCurrentSyllabusItemKnowledge="changeCurrentSyllabusItemKnowledge"
        @handleCloseKnowledgeDialog="handleCloseKnowledgeDialog"
        @handleSaveKnowledgeDialog="handleSaveKnowledgeDialog"
      ></SelectKnowledge>

      <el-dialog :title="Moduledialog ? bigdislog ? '新增一级大纲目录' : '新增课程大纲子目录' : '修改课程大纲名称'" class="tabplane" center :visible.sync="adddialogVisible" size="tiny">
        <el-form :model="ruleProject" ref="ruleProject" label-width="120px" class="demo-ruleForm">
          <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:100})">
            <el-input class="coursetxt" v-model="ruleProject.name"></el-input>
          </el-form-item>
        </el-form>
        <div class="footer" slot="footer">
          <el-button @click="adddialogVisible = false">取 消</el-button>
          <el-button type="primary" v-if="Moduledialog == true" :loading="btnLoading" @click="addruleProject('ruleProject')">{{btnLoading?'新增中':'确 定'}}
          </el-button>
          <el-button type="primary" v-else :loading="btnLoading" @click="updateruleProject('ruleProject')">
            {{btnLoading?'保存中':'保 存'}}
          </el-button>
        </div>
      </el-dialog>

    </div>
  </template>
  <style lang="less">
.chapterbox .chaptit {
  cursor: pointer;
}
.knowledge .audition {
  border: 1px solid #7fadd0;
  background-color: #64c5ee;
  height: 14px;
  line-height: 14px;
  color: white;
  padding: 2px 6px;
  font-size: 8px;
  border-radius: 5px;
  position: absolute;
  top: 11px;
  left: 50px;
}
.dif-type {
  border: 1px solid #fcdada;
  background-color: #fef0f0;
  color: #fc5c12;
  padding: 2px 10px;
  font-size: 8px;
  border-radius: 5px;
}
.dropdown-child {
  color: #2ca4d9;
  font-size: 10px;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.gray {
  color: #bdb4b4;
}
.connect-knowledage {
  display: inline-block;
  border-radius: 15px;
  border: 1px solid rgba(255, 102, 0, 1);
  background-color: rgba(255, 227, 185, 1);
  color: #ff0000;
  font-size: 10px;
  padding: 0px 8px;
  max-width: 420px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: normal;
  line-height: 20px;
  position: relative;
  top: 4px;
}
.tabplane .el-dialog {
  min-width: 680px;
  margin-bottom: 0px;
}
.addResourceDialog .el-pagination {
  text-align: right;
  margin-top: 14px;
}
.ghostClass {
  opacity: 1;
}
.permission-outlinemodule {
  .addResourceDialog {
    .el-dialog__header {
      padding-top: 15px;
    }
    .el-dialog__body {
      padding-top: 10px;
    }
  }
  .el-dialog__body {
    .ep-set-box {
      height: 40px;
      position: relative;
      .ep-line {
        height: 1px;
        margin-top: 20px;
        background: #d3d3d3;
      }
      .ep-tips {
        color: #969696;
        text-align: center;
        width: 200px;
        height: 24px;
        background: #fff;
        display: inline-block;
        line-height: 24px;
        position: absolute;
        top: 9px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    padding: 20px 20px;
    .el-steps {
      line-height: normal;
    }
    .rulemodule {
      .el-table {
        .el-radio .el-radio__label {
          display: none;
        }
      }
    }
  }
  .resource-ruleForm {
    .el-input {
      width: 94%;
    }
  }
}
.el-select-dropdown.study-time-select {
  .el-scrollbar__view {
    width: 254px;
    .el-select-dropdown__item {
      display: inline-block;
      width: 61px;
    }
  }
}
.erji-course {
  width: 150px;
  .el-input__inner {
    height: 30px;
  }
}
@media screen and (min-height: 320px) and (max-height: 650px) {
  .permission-outlinemodule {
    .addResourceDialog {
      .el-dialog {
        margin-top: 1px !important;
        margin-bottom: 0px;
        .el-dialog__header {
          padding-top: 10px;
        }
        .el-dialog__body {
          padding-top: 0px;
          padding-bottom: 10px;
          .el-table {
            margin-top: 5px !important;
          }
          .coursebtn {
            margin-top: 0 !important;
          }
        }
      }
    }
  }
}
</style>

  <script>
import draggable from "vuedraggable";
import {
  progressText,
  resourceTypeList,
  resourceTableConfig
} from "../../common/outlineConfig.js";
import { isNumber, getSrcStr } from "../../util/util.js";
import HandoutUpload from "./SyllabusModuleHandoutUpload.vue";
import SelectKnowledge from "../public/SelectKnowledgeDialog.vue";
export default {
  name: "SyllabusModuleEdit",
  components: {
    draggable,
    HandoutUpload,
    SelectKnowledge
  },
  data() {
    var valiMinites = (rule, value, callback) => {
      value = Number(value);
      if (value > 999) {
        callback(new Error("时长不允许超过三位数"));
      } else {
        callback();
      }
    };
    var valiSeconds = (rule, value, callback) => {
      if (Number(value) > 60) {
        callback(new Error("秒数最大不允许超过60"));
      } else {
        callback();
      }
    };
    return {
      audition: 0, //是否为试听字段
      startType: "", //开始的资源类型
      endType: "", // 结束时的资源类型
      liveid: 0, //直播id
      resourceid: "", //修改直播时需要的id
      syllabusid: "", // 添加修改直播时需要的大纲id
      value2: "", // 设置试听的绑定值
      valiMinites: [{ validator: valiMinites, trigger: "blur" }], // 验证分钟
      valiSeconds: [{ validator: valiSeconds, trigger: "blur" }], // 验证秒
      getId: "",
      judgeid: "",
      knowledgeInfo: "", //添加关联知识点名字字段
      is_knowledge_open: false,
      project_id: "", //项目id
      subject_id: "", //科目id
      isAllowUse: 0, //大纲是否允许使用
      btnLoading: false, //按钮loading
      active: 0, //步骤条active
      resourceRadio: "", //选择的资源
      selectType: "", //输入框搜索
      nativeResourceRadio: "", //修改之前本来选择的资源
      ResIsInOutline: false, //检查该资源是否已经挂载
      resourceTableConfig: [], //表单配置
      radio1: 1,
      radio2: 4,
      tabledata: [],
      progressText: progressText,
      addResFirFrom: {
        name: "",
        start_time: "", //开启时间
        study_time: "", //建议学习时长， 单位分钟
        apply_to: [] //1表示跳级测试，2表示提分盒子
      },
      study_time_options: [], //选择学习时间列表
      ruleProject: {
        name: ""
      },
      dialogFormVisible: false,
      dialogKnowledgeVisible: false, //选择知识点弹层
      knowledgeList: [], //知识点列表
      resourceTable: [], //资源列表
      multipleSelection: [],
      dialogVisible: false,
      adddialogVisible: false, //新增和修改大纲目录的弹层
      Moduledialog: true, //增加子目录的弹层的标题
      bigdislog: false,
      deleteModule: true,
      resourceType: "video",
      inputPlaceholder: "请输入视频资源ID / 名称",
      refname: "",
      coursesylllevel: "",
      currentId: "0", //0是最外层父级大纲   pid也表示当前需要操作的id
      title: "", //课程大纲标题
      resourceTypeList: resourceTypeList,
      tag_id: "", //标签id
      resourceAction: "add", //资源弹层的操作
      pagination: {
        current_page: 1, //资源列表当前页数
        total: 1 //资源列表总数量
      },
      resLoading: false, //loading
      resourceinput: "", //根据id或者名称搜索
      searchResourceTimer: "", //搜索资源演示器
      sortOptions: "", //排序参数
      sourceRadio: 1, //资源选择的来源
      handoutForm: {
        path: "",
        size: ""
      },
      videoForm: {
        title: "",
        video_id: "",
        duration_minutes: "",
        duration_second: ""
      },
      urltip: '[<script src="https://s.gaodun.com/web/static-player/loader.js?',
      urltip2: `-3" type="text/javascript">${"</"}script>]`,
      currentSyllabusItemKnowledge: "", //当前大纲条目说关联的知识点
      openArr: [], //备份记录那些大纲是已打开的
      erjiCourseOptions: [],
      erjicourseId: null, // 默认二级科目的id‘其他’
      delLoading:false,
    };
  },
  methods: {
    // 直接创建条目
    directSyllabus(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let nameRet = await this.CourseSyllabusItem();
          if (nameRet.status == 0) {
            this.dialogFormVisible = false;
            this.getSyllabusItems();
            this.$message({
              message: "创建条目成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "直接创建条目失败请联系管理员",
              type: "success"
            });
          }
        } else {
          return false;
        }
      });
    },
    // 直接修改条目名称
    directChangeSyllabus(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let nameRet = await this.ChangeSyllabusItem();
          if (nameRet.status == 0) {
            this.dialogFormVisible = false;
            this.getSyllabusItems();
            this.$message({
              message: "修改条目成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "直接修改条目失败请联系管理员",
              type: "success"
            });
          }
        } else {
          return false;
        }
      });
    },
    handleSpread(e) {
      // 阻止事件冒泡
      e.cancelBubble = true;
    },
    // 点击控制折叠与展开
    spread(val) {
      console.log(this.openArr);
      if (this.openArr.includes(val.id)) {
        this.openArr.forEach((o, i) => {
          if (val.id == o) {
            this.openArr.splice(i, 1);
          }
        });
      } else {
        this.openArr.push(val.id);
      }
    },
    // 设置试听
    async changePreWatch(val) {
      let audition = val.audition == 1 ? 0 : 1;
      let params = {
        audition: audition,
        name: val.name,
        course_syllabus_id: this.syllabus_id
      };
      let ret = await this.$http.ChangeSyllabusItem(val.id, params);
      if (ret.status === 0) {
        let tipStr = audition == 0 ? "已关闭试听" : "已设置试听";
        this.$message({
          message: tipStr,
          type: "success"
        });
        setTimeout(() => {
          this.getSyllabusItems();
        }, 800);
      } else {
        this.$message({
          message: "设置试听失败，请联系管理员",
          type: "warning"
        });
      }
    },
    // 预览跳转
    goPreview(val) {
      // 添加预览提示正在维护
      // return this.$message("此功能正在维护中，敬请期待");
      if (val.resource) {
        if (val.resource.discriminator === "video") {
          let goVideo = this.$router.resolve({
            name: "previewVideo",
            params: { id: val.resource.id }
          });
          window.open(goVideo.href, "_blank");
        } else if (val.resource.discriminator === "resource_group") {
          let goGroup = this.$router.resolve({
            name: "editResourceGroup",
            params: { id: val.resource.id }
          });
          window.open(goGroup.href, "blank");
        } else {
          this.$message({
            message: "该类型资源暂时不支持预览",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "此条目未挂资源",
          type: "warning"
        });
      }
    },
    handleInputMinutesChange(v) {
      let self = this;
      this.$nextTick(() => {
        self.videoForm.duration_minutes = self.videoForm.duration_minutes.replace(
          /[^\d]/g,
          ""
        );
      });
    },
    handleInputSecondChange(v) {
      let self = this;
      this.$nextTick(() => {
        self.videoForm.duration_second = self.videoForm.duration_second.replace(
          /[^\d]/g,
          ""
        );
      });
    },
    // 赋值到剪贴板方法
    copyId(val, obj) {
      var oInput = document.createElement("input");
      if (obj) {
        if (obj.resource) {
          oInput.value = val + "," + obj.resource.id;
        } else {
          this.$message({
            message: "您还没有挂资源",
            type: "warning"
          });
          return;
        }
      } else {
        oInput.value = val;
      }
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message({
        message: "已将ID复制到剪贴板",
        type: "success"
      });
    },
    // 知识点的保存
    async handleSaveKnowledgeDialog(data) {
      this.currentSyllabusItemKnowledge = data;
      this.knowledgeInfo = data[0].title;
      let knowledageData = this.currentSyllabusItemKnowledge;
      let item_id = this.currentId;
      let params = {
        knowledge_name: this.knowledgeInfo,
        syllabus_id: this.$route.params.sid
      };
      if (this.judgeid) {
        params.kid = this.judgeid;
      }
      let knowledage_id = knowledageData[0].id;
      let ret = await this.$http.saveOutlineKnowledgeList(
        item_id,
        knowledage_id,
        params
      );
      if (ret.status === 0) {
        this.dialogKnowledgeVisible = false;
        this.getSyllabusItems();
      }
    },
    handleCloseKnowledgeDialog() {
      this.dialogKnowledgeVisible = false;
    },
    changeCurrentSyllabusItemKnowledge(v) {
      //切换关联的知识点
      this.currentSyllabusItemKnowledge = v;
      this.knowledgeInfo = v[0].title;
    },
    //启用知识点
    async handleChangeIsKnowledgeOpen(bool) {
      let ret = await this.$http.UpdateCourseSyllabus(this.syllabus_id, {
        is_knowledge_open: bool ? 1 : 0,
        project_id: this.project_id,
        subject_id: this.subject_id,
        status: this.isAllowUse,
        title: this.title
      });
      if (ret.status === 0) {
        let msg = bool ? "启用知识点关联成功" : "已关闭知识点关联";
        this.$message({
          message: msg,
          type: "success"
        });
      } else {
        this.$message({
          message: "修改大纲失败！",
          type: "error"
        });
      }
    },
    // 资源应用 选择
    handleCheckboxChange(d) {
      if (d.length > 1) {
        this.addResFirFrom.apply_to = d.splice(-1);
      }
    },
    handleTableChange(val) {
      if (val) {
        this.resourceid = val.id;
        this.endType = val.discriminator;
        this.resourceRadio = String(val.id);
      }
    },
    selectclk(discriminator) {
      this.addResFirFrom.apply_to = [];
      this.addResFirFrom.start_time = "";
      this.resourceType = discriminator;
    },
    //弹出新增资源的弹层
    openAddResDialog(val) {
      this.currentId = val.id;
      this.syllabusid = val.course_syllabus_id;
      this.active = 0;
      this.addResFirFrom.name = "";
      this.addResFirFrom.start_time = ""; //开启时间
      this.addResFirFrom.study_time = ""; //建议学习时长， 单位分钟
      this.addResFirFrom.apply_to = []; //1表示跳级测试，2表示提分盒子
      this.resourceRadio = "";
      this.resourceType = "video";
      this.nativeResourceRadio = "";
      this.dialogFormVisible = true;
      this.resourceAction = "add";
    },
    //第一步往下一步
    firstNextSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.active >= this.progressText.length - 1) return;
          this.active++;
        } else {
          return false;
        }
      });
    },
    //第二步往下一步
    async secondSubmit() {
      if (!this.resourceType) {
        this.$message.warning("请选择资源类型！");
        return;
      } else if (this.resourceType === "lecture_note") {
        this.handoutForm.path = ""; //清除讲义地址
        //清除上传的文件
        this.$refs.handoutUpload.clearAllFileList();
      } else if (this.resourceType === "video") {
        this.resetForm("videoForm"); //重置表单
      }
      if (this.active >= this.progressText.length - 1) return;
      resourceTableConfig.forEach(ele => {
        if (ele.discriminator == this.resourceType) {
          this.resourceTableConfig = ele.table;
          this.inputPlaceholder = ele.inputPlaceholder;
        }
      });
      this.active++;
      this.sourceRadio = 2;
      this.resourceinput = ""; //输入框搜索初始化
      this.resourceTable = []; //初始化资源列表
      if (this.pagination.current_page != 1) {
        this.pagination.current_page = 1;
      } else {
        this.searchResource();
      }
    },
    //分页搜索
    async handleCurrentChange(val) {
      val = Number(val);
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
      clearTimeout(this.searchResourceTimer);
      this.resLoading = true;
      this.searchResourceTimer = setTimeout(async () => {
        clearTimeout(this.searchResourceTimer);
        let params = {
          discriminator: this.resourceType,
          page_size: 50,
          page: val ? val : 1,
          "order_by[]": "desc", //顺序   倒序
          "order_by_field[]": "id", //排序字段
          project_id: this.project_id
          // subject_id: this.subject_id,
        };
        let resourceinput = this.resourceinput.trim();
        switch (this.resourceType) {
          case "legacy_live":
            if (isNumber(resourceinput)) {
              params.legacy_live_id = resourceinput;
            } else {
              params.keywords = resourceinput;
            }
            break;
          case "paper":
            if (isNumber(resourceinput)) {
              params.paper_id = resourceinput;
            } else {
              params.keywords = resourceinput;
            }
            break;
          default:
            params.keywords = resourceinput;
            break;
        }
        let ret = await this.$http.getResource(params);
        if (ret.status == 0) {
          this.resLoading = false;
          this.resourceTable = ret.result.resources;
          this.pagination.total = ret.result.pagination.total;
        }
      }, 500);
    },
    prev() {
      if (this.active <= 0) return;
      this.active--;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //新增大纲资源条目
    async addSyllabusResourceItem() {
      if (this.sourceRadio === 2) {
        // 资源库检索流程
        this.sourceRadio2Syllabus();
      } else if (this.sourceRadio === 1) {
        // 走上传创建流程
        this.sourceRadio1Syllabus();
      }
    },
    // 数据库检索流程 sourceRadio-2
    async sourceRadio2Syllabus() {
      if (!this.resourceRadio) {
        return this.$message({
          message: "请选择资源",
          type: "warning"
        });
      }
      this.btnLoading = true;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
      });
      //查询是否挂载了该资源
      let boolRet = await this.checkResIsInOutline();
      if (!boolRet) {
        this.btnLoading = false;
        loading.close();
        return;
      }
      //新增/修改大纲条目
      let nameRet;
      if (this.resourceAction === "add") {
        nameRet = await this.CourseSyllabusItem();
      } else if (this.resourceAction === "update") {
        nameRet = await this.ChangeSyllabusItem();
      }
      let sy_item_id;
      if (nameRet.status === 0) {
        sy_item_id = nameRet.result.id;
        // 大纲资源条目挂载资源
        await this.mountSyllabusResource(sy_item_id);
        if (this.resourceid && this.resourceAction === "add") {
          if (this.endType === "legacy_live") {
            let liveRet = await this.$http.changeLive(
              0,
              this.resourceid,
              this.syllabusid
            );
            if (liveRet.status != 0) {
              this.message({
                message: "预约直播失败,请联系管理员",
                type: "warning"
              });
            }
          }
        }
        if (this.resourceid && this.resourceAction === "update") {
          if (
            this.endType === "legacy_live" ||
            this.startType === "legacy_live"
          ) {
            let liveRet = await this.$http.changeLive(
              this.liveid,
              this.resourceid,
              this.syllabusid
            );
            if (liveRet.status != 0) {
              this.message({
                message: "预约直播失败，请联系管理员",
                type: "warning"
              });
            }
          }
        }
        this.btnLoading = false;
        loading.close();
      } else {
        this.btnLoading = false;
        loading.close();
        return;
      }
    },
    // 走上传创建流程 sourceRadio-1
    sourceRadio1Syllabus() {
      if (this.resourceType === "lecture_note") {
        this.lectureSourceCreateIntoSyllabus();
      } else if (this.resourceType === "video") {
        this.$refs["videoForm"].validate(valid => {
          if (valid) {
            this.videoSourceCreateIntoSyllabus();
          } else {
            // console.log("error submit!!");
          }
        });
      }
    },
    // 视频走上传创建流程 resourceType - video
    async videoSourceCreateIntoSyllabus() {
      this.btnLoading = true;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
      });
      let pathRet = await this.getVideoPath();
      let video_id = "";
      if (pathRet.status === 0) {
        if (!pathRet.result.video_id) {
          this.btnLoading = false;
          loading.close();
          return this.$message({
            type: "warning",
            message: "视频地址解析失败！"
          });
        }
        video_id = pathRet.result.video_id;
      } else if (pathRet.status == 1) {
        //为1时使用用户输入的地址
        video_id = this.videoForm.video_id;
      } else {
        this.btnLoading = false;
        loading.close();
        return this.$message({
          type: "warning",
          message: "视频地址解析失败！"
        });
      }
      let params = {
        title: this.addResFirFrom.name, //视频资源名称使用大纲条目名称
        tag_payload_id:
          this.subject_id == "0" ? this.project_id : this.subject_id,
        tag_payload_type: this.subject_id == "0" ? "project" : "subject",
        duration_minutes: this.videoForm.duration_minutes,
        duration_seconds: this.videoForm.duration_second
          ? this.videoForm.duration_second
          : 0,
        video_id: video_id
      };
      // let createResponse = await this.$http.storeResource(params);
      let createResponse = await this.$http.createSyllabusVideoResource(params);
      if (createResponse.status === 0) {
        // 资源id
        try {
          this.resourceRadio = createResponse.result.resource.id;
        } catch (error) {
          this.btnLoading = false;
          loading.close();
          return this.$message({
            message: "视频资源创建失败！",
            type: "error"
          });
        }
        //新增/修改资源名字
        let nameRet;
        if (this.resourceAction === "add") {
          nameRet = await this.CourseSyllabusItem();
        } else if (this.resourceAction === "update") {
          nameRet = await this.ChangeSyllabusItem();
        }
        let sy_item_id;
        if (nameRet.status === 0) {
          sy_item_id = nameRet.result.id;
          // 大纲资源条目挂载资源
          await this.mountSyllabusResource(sy_item_id);
          this.btnLoading = false;
          loading.close();
        } else {
          this.btnLoading = false;
          loading.close();
          return;
        }
      } else {
        this.btnLoading = false;
        loading.close();
        return this.$message({
          message: "视频资源创建失败！",
          type: "error"
        });
      }
    },
    // 讲义走上传创建流程 resourceType - lecture_note
    async lectureSourceCreateIntoSyllabus() {
      if (!this.handoutForm.path) {
        return this.$message({
          message: "请选择讲义上传！",
          type: "warning"
        });
      }
      this.btnLoading = true;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
      });
      let params = {
        tag_payload_id:
          this.subject_id == "0" ? this.project_id : this.subject_id,
        tag_payload_type: this.subject_id == "0" ? "project" : "subject",
        title: this.addResFirFrom.name, //讲义资源名称使用大纲条目名称
        path: this.handoutForm.path,
        size: this.handoutForm.size
      };
      let saveHandoutRet = await this.$http.saveLecturenote(params);
      if (saveHandoutRet.status === 0) {
        // console.log(saveHandoutRet);
        // 资源id
        try {
          this.resourceRadio = saveHandoutRet.result.id;
        } catch (error) {
          // console.log(error);
          this.btnLoading = false;
          loading.close();
          return this.$message({
            message: "讲义资源创建失败！",
            type: "error"
          });
        }
        //新增/修改资源名字
        let nameRet;
        if (this.resourceAction === "add") {
          nameRet = await this.CourseSyllabusItem();
        } else if (this.resourceAction === "update") {
          nameRet = await this.ChangeSyllabusItem();
        }
        let sy_item_id;
        if (nameRet.status === 0) {
          sy_item_id = nameRet.result.id;
          // 大纲资源条目挂载资源
          await this.mountSyllabusResource(sy_item_id);
          this.btnLoading = false;
          loading.close();
        } else {
          this.btnLoading = false;
          loading.close();
          return;
        }
      } else {
        this.btnLoading = false;
        loading.close();
        return this.$message({
          message: "讲义资源创建失败！",
          type: "error"
        });
      }
    },
    // 获取讲义上传的地址
    getHandoutPath(val) {
      this.handoutForm.path = val.path;
      this.handoutForm.size = val.size;
    },
    // 检查大纲是否挂载在大纲上
    async checkResIsInOutline() {
      if (
        this.resourceAction === "update" &&
        this.nativeResourceRadio == this.resourceRadio
      ) {
        //当操作为修改大纲时，原资源和现在资源一样时，无需检测直接返回true
        return true;
      }
      let res = await this.$http.checkResIsInOutline(
        this.syllabus_id,
        this.resourceRadio
      );
      if (res.status === 0) {
        if (res.result.length > 0) {
          this.resourceRadio = "";
          this.$message({
            type: "error",
            message: "该资源已经挂载在这个大纲上！"
          });
          // this.btnLoading = false;
          return false;
        } else {
          return true;
        }
      } else {
        // this.btnLoading = false;
        return false;
      }
    },
    // 新增大纲资源条目名称
    async CourseSyllabusItem() {
      let params = {
        name: this.addResFirFrom.name, //大纲条目名称
        pid: this.currentId,
        course_syllabus_id: this.syllabus_id
      };
      if (this.addResFirFrom.study_time) {
        //学习时长， 单位分钟
        params.study_time = this.addResFirFrom.study_time;
      }
      if (this.addResFirFrom.start_time) {
        //开启时间 时间戳
        params.start_time = this.addResFirFrom.start_time;
      }
      if (
        this.addResFirFrom.apply_to != undefined &&
        this.addResFirFrom.apply_to != null &&
        this.addResFirFrom.apply_to.length !== 0
      ) {
        params.apply_to = this.addResFirFrom.apply_to[0]; //1表示跳级测试，2表示提分盒子
      }
      let ret = await this.$http.CourseSyllabusItem(params);
      if (ret.status === 0) {
        return ret;
      } else {
        this.$message.error("添加失败！");
        return ret;
      }
    },
    // 修改大纲资源条目名称
    async ChangeSyllabusItem() {
      let id = this.currentId;
      if (this.resourceType && this.resourceType != "video") {
        this.audition = 0;
      }
      let params = {
        name: this.addResFirFrom.name,
        course_syllabus_id: this.syllabus_id,
        audition: this.audition
      };
      if (this.addResFirFrom.study_time) {
        //学习时长， 单位分钟
        params.study_time = this.addResFirFrom.study_time;
      }
      if (this.addResFirFrom.start_time) {
        //开启时间 时间戳
        params.start_time = this.addResFirFrom.start_time;
      }
      if (
        this.addResFirFrom.apply_to != undefined &&
        this.addResFirFrom.apply_to != null &&
        this.addResFirFrom.apply_to.length !== 0
      ) {
        params.apply_to = this.addResFirFrom.apply_to[0]; //1表示跳级测试，2表示提分盒子
      }
      let ret = await this.$http.ChangeSyllabusItem(id, params);
      if (ret.status === 0) {
        return ret;
      } else {
        this.$message.error("添加失败！");
        return ret;
      }
    },
    // 大纲资源条目挂载资源
    async mountSyllabusResource(id) {
      let params = {
        resource_id: this.resourceRadio, //资源id
        tag_id: this.tag_id,
        course_syllabus_id: this.syllabus_id
      };
      let retv = await this.$http.mountSyllabusResource(id, params);
      // this.btnLoading = false;
      if (retv.status === 0) {
        this.$message({
          type: "success",
          message:
            this.resourceAction === "add" ? "新增资源成功！" : "修改资源成功！"
        });
        this.dialogFormVisible = false;
        this.getSyllabusItems();
      } else if (retv.status === 2) {
        this.$message({
          message:
            this.resourceAction === "add" ? "新增资源失败！" : "修改资源失败！",
          type: "error"
        });
      }
    },
    //修改大纲资源条目 包含名称&挂载资源
    async updateSyllabusResource() {
      if (this.sourceRadio === 2) {
        // 资源库检索流程
        this.sourceRadio2Syllabus();
      } else if (this.sourceRadio === 1) {
        // 走上传创建流程
        this.sourceRadio1Syllabus();
      }
    },
    //弹出修改资源的弹层
    openeEditResource(item) {
      this.syllabusid = item.course_syllabus_id;
      this.startType = item.resource ? item.resource.discriminator : "";
      if (item.resource && item.resource.discriminator === "legacy_live") {
        this.liveid = item.resource.live_id; //如果是直播资源将老id 储存
      } else {
        this.liveid = 0;
      }
      this.audition = item.audition; //是否试听
      this.active = 0;
      this.addResFirFrom.name = item.name; //名称
      this.addResFirFrom.apply_to = item.apply_to ? [item.apply_to] : []; //1表示跳级测试，2表示提分盒子
      this.addResFirFrom.start_time = item.start_time; //开启时间
      this.addResFirFrom.study_time = item.study_time; //学习时长
      this.currentId = item.id;
      this.resourceRadio = item.resource && String(item.resource.id);
      this.nativeResourceRadio = item.resource && String(item.resource.id); //原来的选项
      this.resourceType = item.resource && item.resource.discriminator;
      this.dialogFormVisible = true;
      this.resourceAction = "update";
    },
    // 弹出资源删除框
    openDelResDialog(item) {
      this.syllabusid = item.course_syllabus_id;
      this.startType = item.resource ? item.resource.discriminator : "";
      if (item.resource && item.resource.discriminator === "legacy_live") {
        this.liveid = item.resource.live_id; //如果是直播资源将老id 储存
      } else {
        this.liveid = 0;
      }
      this.currentId = item.id;
      this.dialogVisible = true;
      this.deleteModule = false;
    },
    // 弹出大纲删除框
    openDelOutlineDialog(val) {
      this.currentId = val.id;
      this.dialogVisible = true;
      this.deleteModule = true;
    },
    // 删除确定
    async confirmDelete() {
      let id = this.currentId;
      this.delLoading = true;
      let params = {
        course_syllabus_id: this.syllabus_id
      };
      let ret = await this.$http.DeleteSyllabusItem(id, params);
      if (ret.status == 0) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.delLoading = false;
        this.getSyllabusItems();
        if (this.startType && this.startType === "legacy_live") {
          let clearRet = await this.$http.changeLive(
            this.liveid,
            0,
            this.syllabusid
          );
          if (clearRet.status != 0) {
            this.$message({
              message: "直播预约清除失败，请联系管理员",
              type: "warning"
            });
          }
        }
      } else {
      }
      this.dialogVisible = false;
    },
    // 新增课程大纲子目录的弹层
    openChildDialog(currentId, bool) {
      if (bool) {
        // debugger;
      }
      this.adddialogVisible = true;
      this.Moduledialog = true;
      this.bigdislog = false;
      this.ruleProject.name = "";
      this.currentId = currentId; //父级大纲条目id
    },
    // 新增一级大纲的弹层
    openFirLvDialog() {
      this.adddialogVisible = true;
      this.Moduledialog = true;
      this.bigdislog = true;
      this.ruleProject.name = "";
      this.currentId = "0";
    },
    //确定增加一个子目录
    addruleProject(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.Moduledialog != true) {
            this.$refs[this.refname][0].innerText = this.ruleProject.name;
            this.adddialogVisible = false;
          } else {
            this.addbigCourse();
          }
          // console.log("submit!");
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加大纲目录
    async addbigCourse() {
      this.btnLoading = true;
      let ret = await this.$http.CourseSyllabusItem({
        name: this.ruleProject.name,
        pid: this.currentId,
        //          level:this.coursesylllevel,
        course_syllabus_id: this.syllabus_id
      });
      this.btnLoading = false;
      if (ret.status == 0) {
        ret.message = "添加成功！";
        this.adddialogVisible = false;
        this.currentId = "0";
        this.getSyllabusItems();
      } else {
        ret.message = "添加失败！";
      }
      this.$message({
        message: ret.message,
        type: "success"
      });
    },
    // 修改大纲目录
    updateruleProject(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let id = this.currentId;
          let name = {
            name: this.ruleProject.name,
            course_syllabus_id: this.syllabus_id
          };
          this.btnLoading = true;
          let ret = await this.$http.ChangeSyllabusItem(id, name);
          this.btnLoading = false;
          if (ret.status == 0) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            this.adddialogVisible = false;
            this.getSyllabusItems();
          } else {
            this.$message.error("修改失败！");
          }
        } else {
          return false;
        }
      });
    },
    // 弹出修改课程大纲名称的弹层
    editproject(currentId, name) {
      this.currentId = currentId;
      this.ruleProject.name = name;
      this.adddialogVisible = true;
      this.Moduledialog = false;
    },
    //拉取这个大纲的条目
    async getSyllabusItems() {
      const loading = this.$loading({
        lock: true,
        text: "正在拼命获取课程大纲数据...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let course_syllabus_id = {
        course_syllabus_id: this.syllabus_id
      };
      let ret = await this.$http.getSyllabusItems(course_syllabus_id);
      loading.close();
      if (ret.status == 0) {
        // ret.result[0].children[0].children[0].knowledgeId =  '112';
        // ret.result[0].children[0].children[0].knowledgeName = 'shiian';
        ret.result.forEach(item => {
          if (!item.two_level_subject || item.two_level_subject == 0) {
            item.two_level_subject = '';
          }
        });
        this.tabledata = ret.result;
      } else {
        this.$message({
          message: "获取课程大纲条目失败！"
        });
      }
    },
    //查看大纲的详情
    async checkSyllabus() {
      let ret = await this.$http.checkSyllabus(this.syllabus_id);
      if (ret.status == 0) {
        this.title = ret.result.title;
        this.tag_id = ret.result.tag_id;
        this.is_knowledge_open =
          ret.result.is_knowledge_open === 0 ? false : true;
        this.project_id = ret.result.project.id;
        this.isAllowUse = ret.result.status;
        this.subject_id = ret.result.subject.id;
        this.coursesylllevel = ret.result.template.level_max; //大纲的层级
        let params = {
          project_id: this.project_id,
          subject_id: this.subject_id
        };
        this.$http.getSubjectTwoList(params).then(res => {
          if (res.status == 0) {
            this.erjiCourseOptions = res.result;
            res.result.forEach(it => {
              if (it.name == '其他') {
                this.erjicourseId = it.two_level_subiect_id
              }
            });
            this.getSyllabusItems();
          }
        });
      }
    },
    //排序
    async dragEnd(data) {
      if (!this.sortOptions || !this.sortOptions.parmas.near_by) return;
      let ret = await this.$http.sortSyllabus(
        this.sortOptions.id,
        this.sortOptions.parmas
      );
      this.sortOptions = "";
      if (ret.status == 0) {
        this.message({
          type: "success",
          message: "排序成功！"
        });
        this.getSyllabusItems();
      } else {
        this.message({
          type: "warning",
          message: "排序失败！"
        });
      }
    },
    // 排序拖动事件
    onMoveCallback(evt, originalEvent) {
      let direction = 0;
      if (evt.draggedContext.futureIndex > evt.draggedContext.index) {
        direction = 1;
      } else {
        direction = -1;
      }
      this.sortOptions = {
        id: evt.draggedContext.element.id,
        parmas: {
          near_by: evt.relatedContext.element && evt.relatedContext.element.id, //参照物，也是大纲条目id
          direction: direction, //1表示参照物的下方，-1表示参照物的上方
          course_syllabus_id: this.syllabus_id //大纲id
        }
      };
    },
    //秒数输入框change事件
    handleInputChange(val) {
      if (val == "") {
        this.videoForm.duration_second = 0;
      }
    },
    //解析视频地址获得视频id
    async getVideoPath() {
      let url = getSrcStr(this.videoForm.video_id);
      let params = {
        url: url
      };
      let ret = await this.$http.getVideoPath(params);
      return ret;
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //  打开关联知识点弹层
    async handleOpenKnowledgeDialog(item) {
      this.currentId = item.id;
      if (item.kid) {
        //判断知识点是否存在不存在不传值
        this.judgeid = item.kid;
      } else {
        this.judgeid = "";
      }
      let params = {
        project_id: this.project_id, //项目id
        subject_id: this.subject_id //课程id
      };
      let ret = await this.$http.getOutlineKnowledgeList(params);
      if (ret.status === 0) {
        this.knowledgeList = ret.result.result.contents
          ? ret.result.result.contents
          : [];
      }
      let id = -1;
      if (item.knowledge_id) {
        id = item.knowledge_id;
      }
      setTimeout(() => {
        this.$refs.selectKnowledge.showSelectSyllabusKnowledge(id);
      }, 0);
      this.dialogKnowledgeVisible = true;
    },
    //获取大纲所属项目科目最新考试大纲
    async getOutlineKnowledgeList() {
      let params = {
        project_id: this.project_id, //项目id
        subject_id: this.subject_id //课程id
        //  project_id:5,
        // subject_id:30,
      };
      let ret = await this.$http.getOutlineKnowledgeList(params);
      if (ret.status === 0) {
        this.knowledgeList = ret.result.result.contents;
      }
    },
    // 切换二级科目
    selectSubjectTwo(val, id, name) {
      let parm = {
        name: name,
        course_syllabus_id: this.syllabus_id,
        two_level_subject: val
      };
      this.$http.ChangeSyllabusItem(id, parm).then(res => {
        if (res.status == 0) {
          this.$message({
            message: "切换二级科目成功！",
            type: "success"
          });
          this.getSyllabusItems();
        }
      });
      // let ret = await this.$http.ChangeSyllabusItem(id, parm);
    }
  },
  computed: {
    syllabus_id() {
      return this.$route.params.sid;
    }
  },
  mounted() {
    for (let i = 1; i <= 120; i++) {
      this.study_time_options.push({ value: i });
    }
    //线上测试使用属性，可以建ep2课程
    // let ep2 = localStorage.getItem('isInEP2') ? true :false;
    // if (ep2){
    //   if(this.resourceTypeList && this.resourceTypeList.length < 5){
    //     this.resourceTypeList.push({
    //       "discriminator": "resource_group",
    //       "label": "资源组"
    //     });
    //     resourceTableConfig.push(
    //       {
    //           "discriminator": "resource_group",
    //           "table": [{
    //               key: 'id',
    //               wh: '120',
    //               sort: false,
    //               label: '资源组ID',
    //           }, {
    //               key: 'discriminator',
    //               wh: '100',
    //               sort: false,
    //               label: '资源类型',
    //           }, {
    //               key: 'title',
    //               wh: '',
    //               sort: false,
    //               label: '资源组名称',
    //           }],
    //           inputPlaceholder: '请输入资源组ID / 名称',
    //           input: {}
    //       }
    //     )
    //   }
    //   // this.course_type =  course_type;
    // }
  },
  created() {
    this.checkSyllabus();
    // this.getSyllabusItems();
  }
};
</script>
