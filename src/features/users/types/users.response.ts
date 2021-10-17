interface UserRes {
  id: string;
  name: string;
  email: string;
  createdTime: Date;
  updatedTime: Date;
}

export interface AdminRes extends UserRes {}

export interface GuardianRes extends UserRes {}

export interface SellerRes extends UserRes {}

export interface StudentRes extends UserRes {
  guardianId: string;
}

export interface CreateAdminsRes {
  admins: AdminRes[];
}

export interface CreateGuardiansRes {
  guardians: GuardianRes[];
}

export interface CreateSellersRes {
  sellers: SellerRes[];
}

export interface CreateStudentsRes {
  students: StudentRes[];
}

export interface ReadAdminRes {
  admin: AdminRes;
}

export interface ReadGuardianRes {
  guardian: GuardianRes;
}

export interface ReadSellerRes {
  seller: SellerRes;
}

export interface ReadStudentRes {
  student: StudentRes;
}

export interface ReadAdminsRes extends CreateAdminsRes {}

export interface ReadGuardiansRes extends CreateGuardiansRes {}

export interface ReadSellersRes extends CreateSellersRes {}

export interface ReadStudentsRes extends CreateStudentsRes {}

export interface UpdateAdminRes extends ReadAdminRes {}

export interface UpdateGuardianRes extends ReadGuardianRes {}

export interface UpdateSellerRes extends ReadSellerRes {}

export interface UpdateStudentRes extends ReadStudentRes {}

export interface UpdateAdminsRes extends CreateAdminsRes {}

export interface UpdateGuardiansRes extends CreateGuardiansRes {}

export interface UpdateSellersRes extends CreateSellersRes {}

export interface UpdateStudentsRes extends CreateStudentsRes {}
