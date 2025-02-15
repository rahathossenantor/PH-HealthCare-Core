import { Request } from "express";
import uploadImage from "../../utils/uploadImage";
import prisma from "../../utils/prisma";

const createSpecialtyIntoDB = async (req: Request) => {
    const { body, file } = req;

    if (file) {
        const res = await uploadImage(file);
        body.icon = res?.secure_url;
    };

    const specialty = await prisma.specialty.create({
        data: body
    });

    return specialty;
};

const getAllSpecialtiesFromDB = async () => {
    const specialties = await prisma.specialty.findMany();
    return specialties;
};

const deleteSingleSpecialtyFromDB = async (id: string) => {
    const specialty = await prisma.specialty.delete({
        where: {
            id
        }
    });
    return specialty;
};

const specialtyServices = {
    createSpecialtyIntoDB,
    getAllSpecialtiesFromDB,
    deleteSingleSpecialtyFromDB
};

export default specialtyServices;
