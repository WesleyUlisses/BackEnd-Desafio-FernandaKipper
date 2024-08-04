import { prisma } from '../../../prisma.databases';
import { IVolunteerCreate } from '../../../../interfaces/volunteer.interfaces';

class VolunteerDals {
  async createVolunteer(data: IVolunteerCreate) {
    return await prisma.volunteer.create({
      data,
    });
  }

  async getVolunteerById(id: number) {
    return await prisma.volunteer.findUnique({
      where: { id },
    });
  }

  async updateVolunteer(id: number, data: Partial<IVolunteerCreate>) {
    return await prisma.volunteer.update({
      where: { id },
      data,
    });
  }

  async deleteVolunteer(id: number) {
    return await prisma.volunteer.delete({
      where: { id },
    });
  }

  async getAllVolunteers() {
    return await prisma.volunteer.findMany();
  }
}

export { VolunteerDals };
