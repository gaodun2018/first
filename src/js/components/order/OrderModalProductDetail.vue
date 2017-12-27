<template>
    <div class="order-course-product-detail">
        <el-table ref="multipleTable" :data="productPackage" tooltip-effect="dark" :row-class-name="rowClass" @selection-change="handleSelectionChange" v-loading="loading" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <div>
                        <el-table :data="props.row.ChildrenList" :row-class-name="rowClass" align="left" style="width: 100%;font-size: 12px">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <div>
                                        <el-table :data="props.row.ChildrenList" :row-class-name="rowClass" align="left" style="width: 100%;font-size: 12px">
                                            <el-table-column>
                                            </el-table-column>
                                            <el-table-column prop="ProductNo" label="产品ID" width="150">
                                            </el-table-column>
                                            <el-table-column width="185" label="课程产品名称">
                                                <template scope="scope">
                                                    <div :class="scope.row.ChildrenList && 'product-package-icon'">
                                                        <span :style="scope.row.ChildrenList && {packStyle}">{{scope.row.ProductName}}</span>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column v-for="item in productPackageItem" :key="item.value" :label="item.name" :prop="item.value" :width="item.w">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ProductNo" label="产品ID" width="150">
                            </el-table-column>
                            <el-table-column width="185" label="课程产品名称">
                                <template scope="scope">
                                    <div :class="scope.row.ChildrenList && 'product-package-icon'">
                                        <span style="padding-left: 20px;display: inline-block">{{scope.row.ProductName}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="item in productPackageItem" :label="item.name" :key="item.value" :prop="item.value" :width="item.w">
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="ProductNo" label="产品ID" width="150">
            </el-table-column>
            <el-table-column label="课程产品名称" width="185">
                <template scope="scope">
                    <div :class="scope.row.ChildrenList && 'product-package-icon'">
                        <span style="padding-left: 20px; display: inline-block">{{scope.row.ProductName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-for="item in productPackageItem" :key="item.value" :prop="item.value" :label="item.name" :width="item.w">
            </el-table-column>
        </el-table>
    </div>
</template>
<style>
.order-course-product-detail .el-table__expanded-cell {
    padding: 0;
}

.order-course-product-detail .el-table__body-wrapper {
    max-height: 380px;
    overflow: auto;
}

.order-course-product-detail .el-table__body {
    width: 100%!important;
    table-layout: inherit;
}
.el-table__header {
    width: 100%!important;
}
.order-expand > .el-table__expand-column > .cell > .el-table__expand-icon {
    display: none;        
}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { productPackageItem } from '../common/orderConfig';
import { GetProductPackageByID } from '../../api/order';

export default {
    props: ['self', 'orderNo'],
    data() {
        return {
            packStyle: {
                paddingLeft: '20px',
                display: 'inline-block'
            },
            loading: true,
            productPackage: [],
            productPackageItem,
        };
    },
    methods: {
        rowClass(row) {
            if (row.ChildrenList == null){
                return 'order-expand';
            }
        }
    },
    mounted() {
           
    },
    created() {
        GetProductPackageByID({ ProductPackageID: this.orderNo }).then(ret => {
            if (ret.status === 0) {
                this.loading = false;
                this.productPackage = ret.result.ChildrenList;
            } else {
                this.loading = false;
            }
        }).catch(() => {
            this.loading = false;
        })
    },
};
</script>