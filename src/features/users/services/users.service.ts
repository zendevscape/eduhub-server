import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { Admin, Guardian, Seller, Student } from '../entities';
import {
  AdminRes,
  CreateAdminBodyReq,
  CreateGuardianBodyReq,
  CreateSellerBodyReq,
  CreateStudentBodyReq,
  DeleteUserBodyReq,
  DeleteUserParamsReq,
  GuardianRes,
  ReadUserParamsReq,
  SellerRes,
  StudentRes,
  UpdateAdminBodyReq,
  UpdateGuardianBodyReq,
  UpdateSellerBodyReq,
  UpdateStudentBodyReq,
  UpdateUserParamsReq,
} from '../types';
import { hashPassword } from '../../../core/utils/password';

@Service()
export class UsersService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,

    @InjectRepository(Guardian)
    private readonly guardiansRepository: Repository<Guardian>,

    @InjectRepository(Seller)
    private readonly sellersRepository: Repository<Seller>,

    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  public async createAdmins(admins: CreateAdminBodyReq[]): Promise<AdminRes[]> {
    const results = await this.adminsRepository.save(
      await Promise.all(
        admins.map(async (admin) => {
          return this.adminsRepository.create({
            ...admin,
            password: await hashPassword(admin.password),
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async createGuardians(guardians: CreateGuardianBodyReq[]): Promise<GuardianRes[]> {
    const results = await this.guardiansRepository.save(
      await Promise.all(
        guardians.map(async (guardian) => {
          return this.guardiansRepository.create({
            ...guardian,
            password: await hashPassword(guardian.password),
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async createSellers(sellers: CreateSellerBodyReq[]): Promise<SellerRes[]> {
    const results = await this.sellersRepository.save(
      await Promise.all(
        sellers.map(async (seller) => {
          return this.sellersRepository.create({
            ...seller,
            password: await hashPassword(seller.password),
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async createStudents(students: CreateStudentBodyReq[]): Promise<StudentRes[]> {
    const results = await this.studentsRepository.save(
      await Promise.all(
        students.map(async (student) => {
          const guardian = await this.guardiansRepository.findOneOrFail({
            id: student.guardianId,
          });

          return this.studentsRepository.create({
            ...student,
            password: await hashPassword(student.password),
            guardian: guardian,
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        guardianId: result.guardian.id,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async readAdmin(admin: ReadUserParamsReq): Promise<AdminRes> {
    const result = await this.adminsRepository.findOneOrFail(admin.id);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async readGuardian(guardian: ReadUserParamsReq): Promise<GuardianRes> {
    const result = await this.guardiansRepository.findOneOrFail(guardian.id);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async readSeller(seller: ReadUserParamsReq): Promise<SellerRes> {
    const result = await this.sellersRepository.findOneOrFail(seller.id);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async readStudent(student: ReadUserParamsReq): Promise<StudentRes> {
    const result = await this.studentsRepository.findOneOrFail(student.id, {
      relations: ['guardian'],
    });

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      guardianId: result.guardian.id,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async readAdmins(): Promise<AdminRes[]> {
    const results = await this.adminsRepository.find();

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async readGuardians(): Promise<GuardianRes[]> {
    const results = await this.guardiansRepository.find();

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async readSellers(): Promise<SellerRes[]> {
    const results = await this.sellersRepository.find();

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async readStudents(): Promise<StudentRes[]> {
    const results = await this.studentsRepository.find({
      relations: ['guardian'],
    });

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        guardianId: result.guardian.id,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async updateAdmin(
    admin: UpdateUserParamsReq,
    newAdmin: UpdateAdminBodyReq,
  ): Promise<AdminRes> {
    const oldAdmin = await this.adminsRepository.findOneOrFail({
      id: admin.id,
    });

    const result = await this.adminsRepository.save(
      this.adminsRepository.create({
        ...oldAdmin,
        ...newAdmin,
      }),
    );

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async updateGuardian(
    guardian: UpdateUserParamsReq,
    newGuardian: UpdateGuardianBodyReq,
  ): Promise<GuardianRes> {
    const oldGuardian = await this.guardiansRepository.findOneOrFail({
      id: guardian.id,
    });

    const result = await this.guardiansRepository.save(
      this.guardiansRepository.create({
        ...oldGuardian,
        ...newGuardian,
      }),
    );

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async updateSeller(
    seller: UpdateUserParamsReq,
    newSeller: UpdateSellerBodyReq,
  ): Promise<SellerRes> {
    const oldSeller = await this.sellersRepository.findOneOrFail({
      id: seller.id,
    });

    const result = await this.sellersRepository.save(
      this.sellersRepository.create({
        ...oldSeller,
        ...newSeller,
      }),
    );

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async updateStudent(
    student: UpdateUserParamsReq,
    newStudent: UpdateStudentBodyReq,
  ): Promise<StudentRes> {
    const oldStudent = await this.studentsRepository.findOneOrFail(
      {
        id: student.id,
      },
      {
        relations: ['guardian'],
      },
    );

    const guardian = newStudent.guardianId
      ? await this.guardiansRepository.findOneOrFail({
          id: newStudent.guardianId,
        })
      : oldStudent.guardian;

    const result = await this.studentsRepository.save(
      this.studentsRepository.create({
        ...oldStudent,
        ...newStudent,
        guardian: guardian,
      }),
    );

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      guardianId: result.guardian.id,
      createdTime: result.createdTime,
      updatedTime: result.updatedTime,
    };
  }

  public async updateAdmins(admins: UpdateAdminBodyReq[]): Promise<AdminRes[]> {
    const results = await this.adminsRepository.save(
      await Promise.all(
        admins.map(async (admin) => {
          const oldAdmin = await this.adminsRepository.findOneOrFail({
            id: admin.id,
          });

          return this.adminsRepository.create({
            ...oldAdmin,
            ...admin,
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async updateGuardians(guardians: UpdateGuardianBodyReq[]): Promise<GuardianRes[]> {
    const results = await this.guardiansRepository.save(
      await Promise.all(
        guardians.map(async (guardian) => {
          const oldGuardian = await this.guardiansRepository.findOneOrFail({
            id: guardian.id,
          });

          return this.guardiansRepository.create({
            ...oldGuardian,
            ...guardian,
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async updateSellers(sellers: UpdateSellerBodyReq[]): Promise<SellerRes[]> {
    const results = await this.sellersRepository.save(
      await Promise.all(
        sellers.map(async (seller) => {
          const oldSeller = await this.sellersRepository.findOneOrFail({
            id: seller.id,
          });

          return this.sellersRepository.create({
            ...oldSeller,
            ...seller,
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async updateStudents(students: UpdateStudentBodyReq[]): Promise<StudentRes[]> {
    const results = await this.studentsRepository.save(
      await Promise.all(
        students.map(async (student) => {
          const oldStudent = await this.studentsRepository.findOneOrFail(
            {
              id: student.id,
            },
            {
              relations: ['guardian'],
            },
          );

          const guardian = student.guardianId
            ? await this.guardiansRepository.findOneOrFail({
                id: student.guardianId,
              })
            : oldStudent.guardian;

          return this.studentsRepository.create({
            ...oldStudent,
            ...student,
            guardian: guardian,
          });
        }),
      ),
    );

    return results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        guardianId: result.guardian.id,
        createdTime: result.createdTime,
        updatedTime: result.updatedTime,
      };
    });
  }

  public async deleteAdmin(admin: DeleteUserParamsReq): Promise<void> {
    await this.adminsRepository.remove(
      await this.adminsRepository.findOneOrFail({
        id: admin.id,
      }),
    );
  }

  public async deleteGuardian(guardian: DeleteUserParamsReq): Promise<void> {
    await this.guardiansRepository.remove(
      await this.guardiansRepository.findOneOrFail({
        id: guardian.id,
      }),
    );
  }

  public async deleteSeller(seller: DeleteUserParamsReq): Promise<void> {
    await this.sellersRepository.remove(
      await this.sellersRepository.findOneOrFail({
        id: seller.id,
      }),
    );
  }

  public async deleteStudent(student: DeleteUserParamsReq): Promise<void> {
    await this.studentsRepository.remove(
      await this.studentsRepository.findOneOrFail({
        id: student.id,
      }),
    );
  }

  public async deleteAdmins(admins: DeleteUserBodyReq[]): Promise<void> {
    await this.adminsRepository.remove(
      await Promise.all(
        admins.map(async (admin) => {
          return await this.adminsRepository.findOneOrFail({
            id: admin.id,
          });
        }),
      ),
    );
  }

  public async deleteGuardians(guardians: DeleteUserBodyReq[]): Promise<void> {
    await this.guardiansRepository.remove(
      await Promise.all(
        guardians.map(async (guardian) => {
          return await this.guardiansRepository.findOneOrFail({
            id: guardian.id,
          });
        }),
      ),
    );
  }

  public async deleteSellers(sellers: DeleteUserBodyReq[]): Promise<void> {
    await this.sellersRepository.remove(
      await Promise.all(
        sellers.map(async (seller) => {
          return await this.sellersRepository.findOneOrFail({
            id: seller.id,
          });
        }),
      ),
    );
  }

  public async deleteStudents(students: DeleteUserBodyReq[]): Promise<void> {
    await this.studentsRepository.remove(
      await Promise.all(
        students.map(async (student) => {
          return await this.studentsRepository.findOneOrFail({
            id: student.id,
          });
        }),
      ),
    );
  }
}
