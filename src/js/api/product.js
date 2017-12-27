import { post,get } from '../util/crmAxios';

//export const getData = function(objParam){
//	return post('/token',{
//          grant_type: 'password',
//          username: 'admin@163.com',
//          password: '96E79218965EB72C92A5'
//      })
//}
//获取产品列表数据
export const getData = (objParam = {}) => {
//	let param = {"Where": {},"PageIndex": 1,"PageSize": 2,"OrderBy":"ProductID","SortCol":""};
//	param = Object.assign(param,objParam);
	return post('/ProductCenter/GetProductList',objParam);
}
//新增产品数据
export const addProduct = (objParam = {}) => {
	return post('/ProductCenter/AddProduct',objParam);
}
//获取产品包列表数据
export const getProductPackageList = (objParam = {}) => {
	return post('/ProductCenter/GetProductPackageList',objParam);
}
//根据产品id修改更新产品列表数据
export const updateProductByMoudule = (objParam = {}) => {
	return post('/ProductCenter/UpdateProductByMoudule',objParam);
}
//根据产品id删除产品
export const deleteProduct = (objParam = {}) => {
	return get('/ProductCenter/DeleteProductByID',objParam);
}

//根据产品id获取详情
export const GetProductInfoByID = (objParam = {}) => {
	return get('/ProductCenter/GetProductInfoByID',objParam);
}
//根据产品id修改产品状态
export const UpdateProductStatus = (objParam = {}) => {
	return post('/ProductCenter/UpdateProductStatus',objParam);
}

//产品数据字典
export const GetDictionaryByTypeId = (objParam = {}) => {
	return get('/Dictionary/GetDictionaryByTypeId',objParam);
}

//所属课程
export const GetDictionaryByParentId = (objParam = {}) => {
	return get('/Dictionary/GetDictionaryByParentId',objParam);
}

//调入产品包
export const AddBatchProductPackageDetial = (objParam = {}) => {
	return post('/ProductCenter/AddBatchProductPackageDetial',objParam);
}

//添加产品包
export const AddProductPackage = (objParam = {}) => {
	return post('/ProductCenter/AddProductPackage',objParam);
}

//更新产品包信息
export const UpdateProductPackage = (objParam = {}) => {
	return post('/ProductCenter/UpdateProductPackage',objParam);
}

//根据产品包id修改产品包状态
export const UpdateProductPackageStatus = (objParam = {}) => {
	return post('/ProductCenter/UpdateProductPackageStatus',objParam);
}

//根据产品包id获取产品包详情
export const GetProductPackageByID = (objParam = {}) => {
	return get('/ProductCenter/GetProductPackageByID',objParam);
}
//删除产品包
export const DeleteProductPackage = (objParam = {}) => {
	return get('/ProductCenter/DeleteProductPackage',objParam);
}
//调入产品包右边列表
export const GetTuningProductPackageList = (objParam = {}) => {
	return post('/ProductCenter/GetTuningProductPackageList',objParam);
}
//根据课程包详情id删除产品和产品包
export const DeleteProductPackageDetial = (objParam = {}) => {
	return get('/ProductCenter/DeleteProductPackageDetial',objParam);
}

//获取产品优惠列表
export const GetProductDiscountList = (objParam = {}) => {
	return post('/ProductCenter/GetProductDiscountList',objParam);
}

//新增产品优惠
export const AddProductDiscount = (objParam = {}) => {
	return post('/ProductCenter/AddProductDiscount',objParam);
}


//更新产品优惠
export const UpdateProductDiscount = (objParam = {}) => {
	return post('/ProductCenter/UpdateProductDiscount',objParam);
}

//删除优惠内容
export const DeleteDiscount = (objParam = {}) => {
	return post('/ProductCenter/DeleteDiscount',objParam);
}

//优惠模糊查询
export const VagueSeachDiscountList = (objParam = {}) => {
	return post('/ProductCenter/VagueSeachDiscountList',objParam);
}
// 感兴趣的项目
export const interestedProject = (objParam) => get('/DataStru/GetCurrentUserCourseTypeList', objParam);


//更新状态优惠内容
export const UpdateDiscountStatus = (objParam = {}) => {
	return post('/ProductCenter/UpdateDiscountStatus',objParam);
}



