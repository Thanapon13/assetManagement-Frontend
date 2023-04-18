import axios from "../config/axios";

// ประเภทครุภัณฑ์
export function getTypeData() {
  return axios.get("/type/all");
}
export function createTypeData(body) {
  return axios.post(`/type/create`, body);
}
export function updateTypeData(body) {
  return axios.patch(`/type/update/`, body);
}
export function deleteTypeData(id) {
  return axios.delete(`/type/${id}`);
}

// ชนิดครุภัณฑ์
export function getKindAll() {
  return axios.get("/kind/all");
}
export function createKindData(body) {
  return axios.post(`/kind/create`, body);
}
export function updateKindData(body) {
  return axios.patch(`/kind/update/`, body);
}
export function deleteKindData(id) {
  return axios.delete(`/kind/${id}`);
}

// หมวดหมู่ครุภัณฑ์
export function getCategory() {
  return axios.get("/category/all");
}
export function createCategory(body) {
  return axios.post(`/category/create`, body);
}
export function updateCategory(body) {
  return axios.patch(`/category/update/`, body);
}
export function deleteCategory(id) {
  return axios.delete(`/category/${id}`);
}

// ประเภทครุภัณฑ์ 4 หลัก
export function getType4() {
  return axios.get("/type4/all");
}
export function createType4(body) {
  return axios.post(`/type4/create`, body);
}
export function updateType4(body) {
  return axios.patch(`/type4/update/`, body);
}
export function deleteType4(id) {
  return axios.delete(`/type4/${id}`);
}
// ประเภทครุภัณฑ์ 8 หลัก
export function getType8() {
  return axios.get("/type8/all");
}
export function createType8(body) {
  return axios.post(`/type8/create`, body);
}
export function updateType8(body) {
  return axios.patch(`/type8/update/`, body);
}
export function deleteType8(id) {
  return axios.delete(`/type8/${id}`);
}

// ประเภทครุภัณฑ์ 13 หลัก
export function getType13() {
  return axios.get("/type13/all");
}
export function createType13(body) {
  return axios.post(`/type13/create`, body);
}
export function updateType13(body) {
  return axios.patch(`/type13/update/`, body);
}
export function deleteType13(id) {
  return axios.delete(`/type13/${id}`);
}

// กลุ่ม
export function getGroupData() {
  return axios.get("/group/all");
}
export function createGroup(body) {
  return axios.post(`/group/create`, body);
}
export function updateGroup(body) {
  return axios.patch(`/group/update/`, body);
}
export function deleteGroup(id) {
  return axios.delete(`/group/${id}`);
}

// 
// export function getDepartmentData() {
//   return axios.get("/department/all");
// }
// export function createDepartment(body) {
//   return axios.post(`/department/create`, body);
// }
// export function updateDepartment(body) {
//   return axios.patch(`/department/update/`, body);
// }
// export function deleteDepartment(id) {
//   return axios.delete(`/department/${id}`);
// }

// ยี่ห้อ
export function getBrandData() {
  return axios.get("/brand/all");
}
export function createBrand(body) {
  return axios.post(`/brand/create`, body);
}
export function updateBrand(body) {
  return axios.patch(`/brand/update/`, body);
}
export function deleteBrand(id) {
  return axios.delete(`/brand/${id}`);
}
// ประเภทที่ได้มา
export function getAcquiredType() {
  return axios.get("/acquiredType/all");
}
export function createAcquiredType(body) {
  return axios.post(`/acquiredType/create`, body);
}
export function updateAcquiredType(body) {
  return axios.patch(`/acquiredType/update/`, body);
}
export function deleteAcquiredType(id) {
  return axios.delete(`/acquiredType/${id}`);
}
// แหล่งที่ได้มา
export function getSourceData() {
  return axios.get("/source/all");
}
export function createSourceData(body) {
  return axios.post(`/source/create`, body);
}
export function updateSourceData(body) {
  return axios.patch(`/source/update/`, body);
}
export function deleteSourceData(id) {
  return axios.delete(`/source/${id}`);
}
// วัตถุประสงค์การใช้งาน
export function getPurposeOfUse() {
  return axios.get("/purposeOfUse/all");
}
export function createPurposeOfUse(body) {
  return axios.post(`/purposeOfUse/create`, body);
}
export function updatePurposeOfUse(body) {
  return axios.patch(`/purposeOfUse/update/`, body);
}
export function deletePurposeOfUse(id) {
  return axios.delete(`/purposeOfUse/${id}`);
}
// วิธีการได้มา
export function getAcquisitionMethod() {
  return axios.get("/acquisitionMethod/all");
}
export function createAcquisitionMethod(body) {
  return axios.post(`/acquisitionMethod/create`, body);
}
export function updateAcquisitionMethod(body) {
  return axios.patch(`/acquisitionMethod/update/`, body);
}
export function deleteAcquisitionMethod(id) {
  return axios.delete(`/acquisitionMethod/${id}`);
}
// ประเภทเงิน
export function getMoneyType() {
  return axios.get("/moneyType/all");
}
export function createMoneyType(body) {
  return axios.post(`/moneyType/create`, body);
}
export function updateMoneyType(body) {
  return axios.patch(`/moneyType/update/`, body);
}
export function deleteMoneyType(id) {
  return axios.delete(`/moneyType/${id}`);
}
//

//----- ทั่วไป ----//
// หน่วยงาน
export function getSector() {
  return axios.get("/sector/all");
}
export function createSector(body) {
  return axios.post(`/sector/create`, body);
}
export function updateSector(body) {
  return axios.patch(`/sector/update/`, body);
}
export function deleteSector(id) {
  return axios.delete(`/sector/${id}`);
}
// ภาควิชา
export function getSubsector() {
  return axios.get("/subsector/all");
}
export function createSubsector(body) {
  return axios.post(`/subsector/create`, body);
}
export function updateSubsector(body) {
  return axios.patch(`/subsector/update/`, body);
}
export function deleteSubsector(id) {
  return axios.delete(`/subsector/${id}`);
}

// วัตถุประสงค์การขอยืม
export function getBorrowPurpose() {
  return axios.get("/borrowPurpose/all");
}
export function createBorrowPurpose(body) {
  return axios.post(`/borrowPurpose/create`, body);
}
export function updateBorrowPurpose(body) {
  return axios.patch(`/borrowPurpose/update/`, body);
}
export function deleteBorrowPurpose(id) {
  return axios.delete(`/borrowPurpose/${id}`);
}
// คำนำหน้าบริษัท
export function getCompanyPrefix() {
  return axios.get("/companyPrefix/all");
}
export function createCompanyPrefix(body) {
  return axios.post(`/companyPrefix/create`, body);
}
export function updateCompanyPrefix(body) {
  return axios.patch(`/companyPrefix/update/`, body);
}
export function deleteCompanyPrefix(id) {
  return axios.delete(`/companyPrefix/${id}`);
}
// คำนำหน้าชื่อ (ไทย)
export function getThaiPrefix() {
  return axios.get("/thaiPrefix/all");
}
export function createThaiPrefix(body) {
  return axios.post(`/thaiPrefix/create`, body);
}
export function updateThaiPrefix(body) {
  return axios.patch(`/thaiPrefix/update/`, body);
}
export function deleteThaiPrefix(id) {
  return axios.delete(`/thaiPrefix/${id}`);
}
// คำนำหน้าชื่อ (อังกฤษ)
export function getEngPrefix() {
  return axios.get("/engPrefix/all");
}
export function createEngPrefix(body) {
  return axios.post(`/engPrefix/create`, body);
}
export function updateEngPrefix(body) {
  return axios.patch(`/engPrefix/update/`, body);
}
export function deleteEngPrefix(id) {
  return axios.delete(`/engPrefix/${id}`);
}

// รหัสประเภทบุคลากร
export function getPersonnelTypeCode() {
  return axios.get("/personnelTypeCode/all");
}
export function createPersonnelTypeCode(body) {
  return axios.post(`/personnelTypeCode/create`, body);
}
export function updatePersonnelTypeCode(body) {
  return axios.patch(`/personnelTypeCode/update/`, body);
}
export function deletePersonnelTypeCode(id) {
  return axios.delete(`/personnelTypeCode/${id}`);
}
// โรงพยาบาล
export function getHospital() {
  return axios.get("/hospital/all");
}
export function createHospital(body) {
  return axios.post(`/hospital/create`, body);
}
export function updateHospital(body) {
  return axios.patch(`/hospital/update/`, body);
}
export function deleteHospital(id) {
  return axios.delete(`/hospital/${id}`);
}

// โรงพยาบาล
export function getDoctorType() {
  return axios.get("/docterType/all");
}
export function createDoctorType(body) {
  return axios.post(`/docterType/create`, body);
}
export function updateDoctorType(body) {
  return axios.patch(`/docterType/update/`, body);
}
export function deleteDoctorType(id) {
  return axios.delete(`/docterType/${id}`);
}
// สาขาแพทย์
export function getMedicalField() {
  return axios.get("/medicalField/all");
}
export function createMedicalField(body) {
  return axios.post(`/medicalField/create`, body);
}
export function updateMedicalField(body) {
  return axios.patch(`/medicalField/update/`, body);
}
export function deleteMedicalField(id) {
  return axios.delete(`/medicalField/${id}`);
}