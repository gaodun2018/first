import {
    GET_PRODUCT_DATA,
    SHOW_MODAL,
    SHOW_PRODUCT,
    ADD_PRODUCT,
    GET_PRODUCTPACKAGE_DATA,
    UPDATE_PRODUCT_BY_MODULE,
    DELETE_PRODUCT,
    UPDATE_PRODUCT_STATU,
    GET_DICTIONARY_BY_TYPEID,
    GET_COURSE_SUBTYPE,
    ADD_BATCH_PRODUCT_PACKAGE_DETIAL,
    Update_PRODUCT_PACKGE_STATUS,
    DELETE_PRODUCT_PACKGE,
    GET_PRODUCT_DISCOUNT_List
} from '../mutation-types'; // 'ADD' , 'SUBTRACT'
import { post, get } from '../../util/crmAxios';
import { Message } from 'element-ui';
import {
    getData,
    addProduct,
    getProductPackageList,
    updateProductByMoudule,
    deleteProduct,
    UpdateProductStatus,
    GetDictionaryByTypeId,
    GetDictionaryByParentId,
    AddBatchProductPackageDetial,
    UpdateProductPackageStatus,
    DeleteProductPackage,
    GetProductDiscountList
} from '../../api/product';

const state = {
    //table数据
    tabledata: [],
    //select选择数组
    multipleSelection: [],
    //产品包select选择数组
    multiplePackSelection: [],
    //产品包单个选择
    SinginPackSelection: [],
    //下拉框项目
    getProductCourseType: [],
    //下拉框课程
    getProductCourseSubType: [],
    //下拉框产品类型
    getProductTypeList: [],
    //课程性质
    getTeachingPlace: [],
    //产品状态
    getProductStatu: [],
    //产品包数据
    productPackageList: [],
    //调入返回产品包集合
    takePackageList: [],
    //获取产品优惠列表
    GetAllProductDiscountList: [],
    //新增弹层数据
    form: {
        ProductName: "",
        ProductNo: "",
        ProductModule: "",
        PStartDate: "",
        PEndDate: "",
        TeachingType: "",
        TeachingPlace: "",
        TeachingPlaceCode: "",
        CourseType: "",
        CourseSubType: "",
        Period: "",
        SellPrise: "",
        OnlySell: "",
        ProductStatus: "",
        CreatBy: "",
    },
    //新增弹层显示
    dialogFormVisible: false,
    //产品包弹层显示
    productShow: false,
    footershow: true,
    submitshow: true,
    isAdd: false,
    isEdit: false,
    totalLength: 0

};
const getters = {

    }
    // 方法调用逻辑
const actions = {
    //获取产品列表数据
    initData({ commit, state }, data) {
        commit(GET_PRODUCT_DATA, data);
    },
    //新增产品
    addProduct({ commit, state }, data) {
        commit(ADD_PRODUCT, data);
    },
    showModal({ commit, state }, data) {
        commit(SHOW_MODAL, data);
    },
    showProduct({ commit, state }, data) {
        commit(SHOW_PRODUCT, data);
    },
    //获取产品包列表数据
    getProductPackageList({ commit, state }, data) {
        commit(GET_PRODUCTPACKAGE_DATA, data);
    },
    //获取产品优惠列表数据
    GetProductDiscountListData({ commit, state }, data) {
        commit(GET_PRODUCT_DISCOUNT_List, data);
    },
    //根据产品id修改更新产品列表数据
    updateProductByMoudule({ commit, state }, data) {
        commit(UPDATE_PRODUCT_BY_MODULE, data);
    },
    //根据产品id集合更新产品状态
    updateProductStatuByID({ commit, state }, data) {
        commit(UPDATE_PRODUCT_STATU, data);
    },
    //根据产品id删除产品
    deleteProduct({ commit, state }, data) {
        commit(DELETE_PRODUCT, data);
    },
    //根据参数值获取产品搜索条件
    GetProductDictionary({ commit, state }, data) {
        commit(GET_DICTIONARY_BY_TYPEID, data);
    },
    //获取课程
    GetCouserSubType({ commit, state }, data) {
        commit(GET_COURSE_SUBTYPE, data);
    },
    //调入产品包
    AddBatchProductPackageDetial({ commit, state }, data) {
        commit(ADD_BATCH_PRODUCT_PACKAGE_DETIAL, data);
    },
    //更新产品包状态
    UpdateProductPackageStatu({ commit, state }, data) {
        commit(Update_PRODUCT_PACKGE_STATUS, data);
    },
    //删除产品包
    DeleteProductPackage({ commit, state }, data) {
        commit(DELETE_PRODUCT_PACKGE, data);
    }
};
// 逻辑代码
const mutations = {
    //获取产品列表
    [GET_PRODUCT_DATA](state, param) {
        if (!param) {
            getData({ "Where": {}, "PageIndex": 1, "PageSize": 15, "OrderBy": "ProductID", "SortCol": "" }).then(function(res) {

                state.tabledata = res.result.Body
                state.totalLength = res.result.Count
            })
        } else {
            getData(param).then(function(res) {

                state.tabledata = res.result.Body
                state.totalLength = res.result.Count

            })
        }
    },
    //获取产品包列表数据
    [GET_PRODUCTPACKAGE_DATA](state, param) {
        getProductPackageList(param).then(function(res) {
            state.productPackageList = res.result.Body;
            state.totalLength = res.result.Count
        })


    },
    //获取产品优惠列表
    [GET_PRODUCT_DISCOUNT_List](state, param) {
        GetProductDiscountList(param).then(function(res) {
            state.GetAllProductDiscountList = res.result.Body;
            state.totalLength = res.result.Count
        })


    },
    //根据产品id 修改单个产品
    [UPDATE_PRODUCT_BY_MODULE](state, param) {
        updateProductByMoudule(param).then(function(res) {
            //alert(23233223)

        })

    },
    //根据产品id修改产品状态
    [UPDATE_PRODUCT_STATU](state, param) {
        UpdateProductStatus(param).then(function(res) {
            //alert(23233223)

        })

    },
    //新增产品
    [ADD_PRODUCT](state, param) {
        addProduct(param).then(function(res) {})
    },
    //删除产品
    [DELETE_PRODUCT](state, param) {
        deleteProduct(param).then(function(res) {})
    },
    //调入产品包
    [ADD_BATCH_PRODUCT_PACKAGE_DETIAL](state, param) {
        AddBatchProductPackageDetial(param).then(function(res) {

        })
    },
    //更新产品包状态
    [Update_PRODUCT_PACKGE_STATUS](state, param) {
        UpdateProductPackageStatus(param).then(function(res) {
            if (res.status == 0 && res.result == true) {

            }
        })
    },
    //删除产品包
    [DELETE_PRODUCT_PACKGE](state, param) {
        DeleteProductPackage(param).then(function(res) {
            if (res.status == 0 && res.result == true) {

            }
        })
    },
    //获取产品搜索条件字典集合
    [GET_DICTIONARY_BY_TYPEID](state, param) {
        GetDictionaryByTypeId(param).then(function(res) {
            if (param.dicType == '1602') //获取项目
            {
                state.getProductCourseType = res.result;
            }
            if (param.dicType == '10032') //获取产品类型
            {
                state.getProductTypeList = res.result;
            }
            if (param.dicType == '10034') //获取课程性质
            {
                state.getTeachingPlace = res.result;
            }
            if (param.dicType == '10031') //获取产品状态
            {
                state.getProductStatu = res.result;
            }
        })
    },
    //获取课程
    [GET_COURSE_SUBTYPE](state, param) {
        GetDictionaryByParentId(param).then(function(res) {
            state.getProductCourseSubType = res.result;
        })
    },
    [SHOW_MODAL](state, data) {
        state.dialogFormVisible = data.dialogFormVisible
        state.footershow = data.footershow
        state.submitshow = data.submitshow
    },
    [SHOW_PRODUCT](state, data) {
        state.productShow = data
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}