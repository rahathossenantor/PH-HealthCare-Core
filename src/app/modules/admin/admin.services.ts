import { Admin, Prisma, UserStatus } from "@prisma/client";
import { adminSearchableFields } from "./admin.constants";
import paginateAndSortCalc from "../../utils/paginateAndSortCalc";
import { TMeta, TOptions } from "../../types/global.types";
import prisma from "../../utils/prisma";
import { TAdminSearchParams } from "./admin.types";

const getAllAdminsFromDB = async (query: TAdminSearchParams, options: Partial<TOptions>): Promise<{
    meta: TMeta;
    data: Admin[];
}> => {
    const filterConditions: Prisma.AdminWhereInput[] = [{
        isDeleted: false
    }];
    const { searchTerm, ...restFilterConditions } = query;
    const { page, limit, skip, sortBy, sortOrder } = paginateAndSortCalc(options as TOptions);

    // search on multiple fields globally
    if (searchTerm) {
        filterConditions.push({
            OR: adminSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    };

    // search on separate fields specifically
    if (Object.keys(restFilterConditions).length) {
        filterConditions.push({
            AND: Object.keys(restFilterConditions).map(key => ({
                [key]: {
                    equals: (restFilterConditions as Record<string, any>)[key]
                }
            }))
        });
    };

    const whereConditions: Prisma.AdminWhereInput = filterConditions.length ? { AND: filterConditions } : {};
    const res = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = await prisma.admin.count({
        where: whereConditions
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: res
    };
};

const getSingleAdminFromDB = async (id: string): Promise<Admin | null> => {
    const admin = await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    return admin;
};

const updateAdminIntoDB = async (id: string, payload: Partial<Admin>): Promise<Admin> => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });

    const res = await prisma.admin.update({
        where: {
            id
        },
        data: payload
    });
    return res;
};

// HARD DELETE
// const deleteAdminFromDB = async (id: string) => {
//     await prisma.admin.findUniqueOrThrow({
//         where: {
//             id
//             isDeleted: false
//         }
//     });

//     const res = await prisma.$transaction(async (transactionClient) => {
//         const admin = await transactionClient.admin.delete({
//             where: {
//                 id
//             }
//         });
//         await transactionClient.user.delete({
//             where: {
//                 email: admin.email
//             }
//         });
//         return admin;
//     });
//     return res;
// };

// SOFT DELETE
const deleteAdminFromDB = async (id: string): Promise<Admin> => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });

    const res = await prisma.$transaction(async (transactionClient) => {
        const admin = await transactionClient.admin.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        });
        await transactionClient.user.update({
            where: {
                email: admin.email
            },
            data: {
                status: UserStatus.DELETED
            }
        });
        return admin;
    });
    return res;
};

const adminServices = {
    getAllAdminsFromDB,
    getSingleAdminFromDB,
    updateAdminIntoDB,
    deleteAdminFromDB
};

export default adminServices;
