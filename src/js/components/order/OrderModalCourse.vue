<template>
    <div class="order-module-course" style="height: 500px">
        <div style="text-align: right; margin-bottom: 12px">
            <el-input size="small" style="width: 300px" placeholder="搜索产品、产品包" v-model="productValue">
                <el-button slot="append" icon="search" @click="handleIconClick"></el-button>
            </el-input>
        </div>
        <el-table ref="multipleTable" :data="productList" tooltip-effect="dark" @select="handleSelectionChange" @select-all="handleAllSelection" v-loading="loading" style="width: 100%">
            <el-table-column type='selection' align="center">
            </el-table-column>
            <el-table-column prop="productNo" label="产品ID" width="125">
            </el-table-column>
            <el-table-column label="课程产品名称" width="185">
                <template scope="scope">
                    <div :title="scope.row.productName" :class="scope.row.isPackage == 1 && 'product-package-icon'">
                        <span class="beyond-hidden-2" style="padding-left: 20px">{{scope.row.productName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-for="item in orderCourse" :key="item.value" :label="item.name" :width="item.w">
                <template scope="scope">
                    <div class="beyond-hidden-2" :title="scope.row[item.value]">
                        {{scope.row[item.value]}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding-top: 10px;text-align: right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="courseTotal" :page-count="10/pageSize">
            </el-pagination>
        </div>
    </div>
</template>
<style>
.order-module-course .el-table__body-wrapper {
    max-height: 380px;
    overflow: auto;
}

.order-module-course .el-table__header,
.order-module-course .el-table__body {
    width: 100%!important;
}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { orderCourse } from '../common/orderConfig';
import { GetProductList } from '../../api/order';

export default {
    props: ['self', 'CourseType', 'setProduct'],
    data() {
        return {
            chooseProduct: [...this.setProduct],
            courseTotal: 13,
            pageSize: 10,
            currentPage: 1,
            loading: true,
            productValue: '',
            productList: [],
            multipleSelection: [],
            orderCourse,
        };
    },
    methods: {
        handleIconClick() {
            this.onProductList();
        },
        onProductList(parms = {
            "Where": {
                "courseType": this.CourseType,
                "parms": this.productValue
            },
            "PageIndex": this.currentPage,
            "PageSize": this.pageSize,
            "OrderBy": "",
            "SortCol": 0
        }) {
            return new Promise((resolve, reject) => {
                this.loading = true;
                GetProductList(parms).then(ret => {  // 获取产品信息 根据项目类型
                    if (ret.status === 0) {
                        this.loading = false;
                        this.productList = ret.result.Body;
                        this.courseTotal = ret.result.Count;
                        resolve(this.productList);
                    } else {
                        this.loading = false;
                    }
                });
            });
        },
        handlePageChange() {
            const checkProduct = async () => {
                this.productList = await this.onProductList();
                this.productList.forEach((row, index) => {
                    this.chooseProduct.forEach((rows, i) => {
                        if (row.id === rows.id) {
                            this.$refs.multipleTable.toggleRowSelection(row);
                        }
                    });
                });
            }
            checkProduct();
        },
        handleAllSelection(all) {
            let { productList, chooseProduct } = this;
            if (all.length > 0) {
                for (let i = 0; i < productList.length; i++) {
                    let ret = false;
                    for (let j = 0; j < chooseProduct.length; j++) {
                        if (productList[i].id === chooseProduct[j].id) {
                            ret = true;
                            break;
                        }
                    }
                    if (!ret) {
                        chooseProduct.push(productList[i]);
                    }
                }
            } else {
                for (let i = 0; i < productList.length; i++) {
                    for (let j = 0; j < chooseProduct.length; j++) {
                        if (productList[i].id === chooseProduct[j].id) {
                            chooseProduct.splice(j, 1);
                            j--
                            break;
                        }
                    }
                }
            }
            this.self.$store.dispatch('selectedProduct', chooseProduct);
        },
        handleSelectionChange(selection, row) { // 列表勾选项
            for (var i = 0; this.chooseProduct.length > i; i++) {
                if (this.chooseProduct[i].id == row.id) {
                    this.chooseProduct.splice(i, 1);
                    this.self.$store.dispatch('selectedProduct', this.chooseProduct);
                    return;
                }
            }
            this.chooseProduct.push(row);
            this.self.$store.dispatch('selectedProduct', this.chooseProduct);
        },
        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            this.handlePageChange();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.handlePageChange();
        },
    },
    mounted() {
        this.handlePageChange();
    },
};
</script>